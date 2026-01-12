import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } from 'ogl';

// --- Shaders ---

const vertex = `
  precision highp float;
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uSpeed;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    
    // Horizontal distortion based on speed
    // Bends the plane slightly along Z axis when moving fast
    p.z = (sin(p.x * 4.0 + 1.57) * abs(uSpeed) * 0.002); // Subtle curve
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform vec2 uImageSize;
  uniform vec2 uPlaneSize;
  uniform sampler2D tMap;
  varying vec2 vUv;

  void main() {
    // Cover-fit logic
    vec2 ratio = vec2(
      min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
      min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    
    vec4 color = texture2D(tMap, uv);
    gl_FragColor = color;
  }
`;

// --- Media Class ---

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
      vertex,
      fragment,
      uniforms: {
        tMap: { value: texture },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uSpeed: { value: 0 },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
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
    // Responsive sizing logic
    // We want larger images for horizontal gallery
    const isMobile = this.screen.width < 768;
    
    // Width relative to viewport width (e.g., 40% of screen width on desktop)
    // Height relative to viewport height
    
    // OGL/Three.js units are based on camera distance (z=20, fov=45 -> viewport height approx 16.5)
    // We calculate scale based on viewport size
    
    const widthPercentage = isMobile ? 0.7 : 0.35; // 70% mobile, 35% desktop
    const aspectRatio = 1.4; // 4:3ish landscape
    
    this.plane.scale.x = this.viewport.width * widthPercentage;
    this.plane.scale.y = this.plane.scale.x / aspectRatio;

    this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
    
    // Gap between images
    this.padding = this.viewport.width * 0.05; // 5% gap
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    
    // Initial X position
    this.x = this.width * this.index;
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height];
    }
    this.setScale();
  }

  update(scroll, direction) {
    // Horizontal position calculation
    // scroll.current increases as we drag left (positive scroll) or right (negative)
    // We subtract scroll to move items left when scrolling "forward"
    this.plane.position.x = this.x - scroll.current - this.extra;
    
    // Infinite Scroll Logic (Horizontal)
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width * 0.6; // Boundary check buffer

    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    // Reposition loop
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }

    this.plane.program.uniforms.uSpeed.value = scroll.current;
  }
}

// --- Main Component ---

export function AcademicGallery() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const reqRef = useRef(null);
  
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
    direction: 'right', // 'right' means content moves left (scroll value increases)
    isDragging: false,
    startX: 0,
    scrollStart: 0,
    images: [
      "https://images.unsplash.com/photo-1544531696-60195e297837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjgxNDU1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080", // Conference
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2VtaW5hcnxlbnwxfHx8fDE3NjgxNDU1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080", // Seminar
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwc3BlYWtlcnxlbnwxfHx8fDE3NjgxNDU1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080", // Speaker
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop", // Research
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop", // Lab
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop", // Medical Tech
    ]
  });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const s = state.current;

    // 1. Renderer
    s.renderer = new Renderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    s.gl = s.renderer.gl;
    s.gl.clearColor(0, 0, 0, 0);

    // 2. Camera
    s.camera = new Camera(s.gl);
    s.camera.fov = 45;
    s.camera.position.z = 20;

    // 3. Scene
    s.scene = new Transform();

    // 4. Geometry
    s.planeGeometry = new Plane(s.gl, {
      heightSegments: 10, 
      widthSegments: 20, // More segments for X-axis distortion
    });

    // 5. Resize Handler
    const onResize = () => {
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
    onResize();
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

    // 7. Loop
    const update = () => {
      // Auto scroll
      if (!s.isDragging) {
         s.scroll.target += 0.05; // Slow auto scroll speed
      }

      s.scroll.current = lerp(s.scroll.current, s.scroll.target, s.scroll.ease);

      // Determine direction
      if (s.scroll.current > s.scroll.last) {
        s.direction = 'right'; // Content moves left
      } else {
        s.direction = 'left'; // Content moves right
      }

      if (s.medias) {
        s.medias.forEach(media => media.update(s.scroll, s.direction));
      }

      s.renderer.render({ scene: s.scene, camera: s.camera });
      s.scroll.last = s.scroll.current;

      reqRef.current = requestAnimationFrame(update);
    };
    reqRef.current = requestAnimationFrame(update);

    // 8. Resize Listener
    window.addEventListener('resize', onResize);

    // 9. Touch/Drag Events for Interaction
    const canvas = canvasRef.current;
    
    const onTouchDown = (e) => {
      s.isDragging = true;
      s.startX = e.touches ? e.touches[0].clientX : e.clientX;
      s.scrollStart = s.scroll.current;
    };

    const onTouchMove = (e) => {
      if (!s.isDragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const dist = (s.startX - x) * 0.05; // Sensitivity
      s.scroll.target = s.scrollStart + dist;
    };

    const onTouchUp = () => {
      s.isDragging = false;
    };

    canvas.addEventListener('mousedown', onTouchDown);
    canvas.addEventListener('mousemove', onTouchMove);
    canvas.addEventListener('mouseup', onTouchUp);
    canvas.addEventListener('mouseleave', onTouchUp);

    canvas.addEventListener('touchstart', onTouchDown);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onTouchUp);

    return () => {
      window.removeEventListener('resize', onResize);
      
      canvas.removeEventListener('mousedown', onTouchDown);
      canvas.removeEventListener('mousemove', onTouchMove);
      canvas.removeEventListener('mouseup', onTouchUp);
      canvas.removeEventListener('mouseleave', onTouchUp);

      canvas.removeEventListener('touchstart', onTouchDown);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchUp);
      
      cancelAnimationFrame(reqRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}
