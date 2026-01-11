import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } from 'ogl';
import NormalizeWheel from 'normalize-wheel';

// --- Shaders ---

const vertex = `
  precision highp float;
  attribute vec3 position;
  attribute vec2 uv;
  attribute vec3 normal;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uPosition;
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 distortionAxis;
  uniform vec3 rotationAxis;
  uniform float uDistortion;
  varying vec2 vUv;
  varying vec3 vNormal;

  float PI = 3.141592653589793238;

  mat4 rotationMatrix(vec3 axis, float angle) {
      axis = normalize(axis);
      float s = sin(angle);
      float c = cos(angle);
      float oc = 1.0 - c;
      return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                  oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                  oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                  0.0,                                0.0,                                0.0,                                1.0);
  }

  vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
  }

  float qinticInOut(float t) {
    return t < 0.5
      ? +16.0 * pow(t, 5.0)
      : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
  }

  void main() {
    vUv = uv;
    float norm = 0.5;
    vec3 newpos = position;
    float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
    float localprogress = clamp((fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion), 0., 2.);
    localprogress = qinticInOut(localprogress) * PI;
    newpos = rotate(newpos, rotationAxis, localprogress);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform vec2 uImageSize;
  uniform vec2 uPlaneSize;
  uniform sampler2D tMap;
  varying vec2 vUv;

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
      min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec3 color = texture2D(tMap, uv).rgb;
    
    // Rounded Corners Calculation
    float aspect = uPlaneSize.x / uPlaneSize.y;
    vec2 center = vUv - 0.5;
    center.x *= aspect;
    
    vec2 size = vec2(0.5 * aspect, 0.5);
    float radius = 0.05; // Adjust radius here (0.05 = soft round)
    
    vec2 d = abs(center) - size + radius;
    float dist = length(max(d, 0.0)) - radius;
    
    float alpha = 1.0 - smoothstep(-0.01, 0.01, dist);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

// --- Media Class (Internal) ---

class Media {
  constructor({ gl, geometry, scene, renderer, screen, viewport, image, length, index }) {
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.renderer = renderer;
    this.screen = screen;
    this.viewport = viewport;
    this.image = image;
    this.length = length;
    this.index = index;
    this.extra = 0;

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      transparent: true, // Enable transparency for rounded corners
      fragment,
      vertex,
      uniforms: {
        tMap: { value: texture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uSpeed: { value: 0 },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] },
        uDistortion: { value: 3 },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 0 },
      },
      cullFace: false,
    });

    const image = new Image();
    image.src = this.image;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      texture.image = image;
      this.program.uniforms.uImageSize.value = [image.naturalWidth, image.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  setScale() {
    // Plane Size relative to viewport
    // Adjust these values to change the size of the 3D planes
    // const x = 320; 
    // const y = 240; 
    
    // Responsive sizing - Increased sizes for better visibility
    const isMobile = this.screen.width < 768;
    const x = isMobile ? this.screen.width * 0.85 : 500; // Increased width
    const y = isMobile ? this.screen.width * 0.65 : 380; // Increased height

    this.plane.scale.x = (this.viewport.width * x) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * y) / this.screen.height;
    this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height];
    }
    this.setScale();
    
    // Spacing
    this.padding = 0.5; 
    this.height = this.plane.scale.y + this.padding;
    this.heightTotal = this.height * this.length;
    this.y = this.height * this.index;
  }

  update(scroll, direction) {
    this.plane.position.y = this.y - scroll.current - this.extra;
    
    // Infinite Scroll Logic
    const planeOffset = this.plane.scale.y / 2;
    const viewportOffset = this.viewport.height; // Visible area

    this.isBefore = this.plane.position.y + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.y - planeOffset > viewportOffset;

    if (direction === 'up' && this.isBefore) {
      this.extra -= this.heightTotal;
      this.isBefore = false;
      this.isAfter = false;
    }
    if (direction === 'down' && this.isAfter) {
      this.extra += this.heightTotal;
      this.isBefore = false;
      this.isAfter = false;
    }

    // Map position for rotation effect
    // 5 to 15 seems to be the range used in the shader logic for fract()
    // We map viewport Y (-H to H) to shader progress (5 to 15)
    const position = this.map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);
    this.program.uniforms.uPosition.value = position;
    
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current;
  }

  map(value, min1, max1, min2, max2) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
  }
}

// --- Helper Functions ---
function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

// --- Main Component ---

export function AcademicGallery() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const reqRef = useRef(null);
  
  // State refs for animation loop
  const state = useRef({
    renderer: null,
    gl: null,
    camera: null,
    scene: null,
    planeGeometry: null,
    medias: [],
    scroll: { ease: 0.05, current: 0, target: 0, last: 0 },
    screen: { width: 0, height: 0 },
    viewport: { width: 0, height: 0 },
    direction: 'down',
    images: [
      "https://images.unsplash.com/photo-1601839777132-b3f4e455c369?q=80&w=1000&auto=format&fit=crop", // Consultation
      "https://images.unsplash.com/photo-1738854336436-4f65bac3bba0?q=80&w=1000&auto=format&fit=crop", // Laser Treatment
      "https://images.unsplash.com/photo-1677568554453-ae5baf28da6c?q=80&w=1000&auto=format&fit=crop", // Clinic Interior
      "https://images.unsplash.com/photo-1630129116059-7b0ff953202e?q=80&w=1000&auto=format&fit=crop", // Device
      "https://images.unsplash.com/photo-1610300011228-aa944f03af23?q=80&w=1000&auto=format&fit=crop", // Ampoule
      "https://images.unsplash.com/photo-1727386244869-82858f2a7f91?q=80&w=1000&auto=format&fit=crop", // Surgeon Hands
    ]
  });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const s = state.current;

    // 1. Setup Renderer
    s.renderer = new Renderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    s.gl = s.renderer.gl;

    // 2. Setup Camera
    s.camera = new Camera(s.gl);
    s.camera.fov = 45;
    s.camera.position.z = 20;

    // 3. Setup Scene
    s.scene = new Transform();

    // 4. Setup Geometry
    s.planeGeometry = new Plane(s.gl, {
      heightSegments: 20, // Increased for smoother distortion
      widthSegments: 20,
    });

    // 5. Initial Resize
    const onResize = () => {
      // Use container size instead of window size
      const rect = containerRef.current.getBoundingClientRect();
      s.screen = { width: rect.width, height: rect.height };
      
      s.renderer.setSize(s.screen.width, s.screen.height);
      
      s.camera.perspective({ aspect: s.gl.canvas.width / s.gl.canvas.height });

      const fov = s.camera.fov * (Math.PI / 180);
      const height = 2 * Math.tan(fov / 2) * s.camera.position.z;
      const width = height * s.camera.aspect;

      s.viewport = { height, width };

      if (s.medias) {
        s.medias.forEach(media => media.onResize({ screen: s.screen, viewport: s.viewport }));
      }
    };
    
    // 6. Create Medias
    onResize(); // Calc viewport first
    s.medias = s.images.map((image, index) => {
      return new Media({
        gl: s.gl,
        geometry: s.planeGeometry,
        scene: s.scene,
        renderer: s.renderer,
        screen: s.screen,
        viewport: s.viewport,
        image,
        length: s.images.length,
        index,
      });
    });

    // 7. Update Loop
    const update = () => {
      // Sync 3D scroll with Window Scroll
      // Drastically reduced factor to 0.015 for an extremely slow, luxurious float
      const scrollFactor = 0.015; 
      s.scroll.target = window.scrollY * scrollFactor;

      s.scroll.current = lerp(s.scroll.current, s.scroll.target, s.scroll.ease);
      
      if (s.scroll.current > s.scroll.last) {
        s.direction = 'up';
      } else {
        s.direction = 'down';
      }

      if (s.medias) {
        s.medias.forEach(media => media.update(s.scroll, s.direction));
      }

      s.renderer.render({ scene: s.scene, camera: s.camera });
      s.scroll.last = s.scroll.current;

      reqRef.current = requestAnimationFrame(update);
    };
    reqRef.current = requestAnimationFrame(update);

    // 8. Event Listeners
    // Removed wheel/touch listeners to sync purely with page scroll
    
    const onResizeWrapper = () => onResize();
    window.addEventListener('resize', onResizeWrapper);

    return () => {
      window.removeEventListener('resize', onResizeWrapper);
      cancelAnimationFrame(reqRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#F5F5F3] overflow-hidden" ref={containerRef}>
      <canvas ref={canvasRef} className="block w-full h-full outline-none" />
      
      {/* Overlay Text */}
      <div className="absolute top-10 right-10 pointer-events-none mix-blend-difference text-white opacity-50 hidden md:block">
        <p className="text-xs uppercase tracking-widest border-b border-white pb-2 mb-2">Academic Archive</p>
        <p className="text-[10px] font-mono">SCROLL TO EXPLORE</p>
      </div>
    </div>
  );
}
