import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ADO Brand Philosophy - Ultimate Premium 3D Text
 * Based on user-provided shader reference + High Fidelity upgrades
 */

export function BrandPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const shadowPlaneRef = useRef<THREE.Mesh | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const hitPlaneRef = useRef<THREE.Mesh | null>(null);

  // 1. High-Res Canvas Texture Generation
  const createTextTexture = (text: string, isShadow: boolean = false): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    // Ultra-high resolution for crisp edges on 4K screens
    const size = 2048; 
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, size, size);

    // Typography
    const fontSize = size * 0.22; // Slightly smaller for elegance
    ctx.font = `700 ${fontSize}px "Gowun Batang", serif`; // Gowun Batang is essential for the ADO look
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (isShadow) {
      // Soft, diffused shadow texture
      ctx.fillStyle = '#000000';
      ctx.filter = 'blur(24px)'; // Stronger blur for depth
      ctx.globalAlpha = 0.25;
    } else {
      // Crisp Main Text
      ctx.fillStyle = '#1B4D3E'; // ADO Signature Green
    }

    ctx.fillText(text, size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    // Anisotropy helps with oblique viewing angles
    texture.anisotropy = 16; 
    return texture;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- SETUP ---
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Retain retina quality
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();

    // --- CAMERA (Frontal View with Tilt) ---
    // Changed: Switched to Frontal Orthographic to ensure text is perfectly horizontal
    // We will tilt the mesh itself to reveal the 3D depth (Z-displacement)
    const frustumSize = 13;
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect, frustumSize * aspect,
      frustumSize, -frustumSize,
      0.1, 1000
    );
    
    // Frontal view looking straight at the object
    camera.position.set(0, 0, 20); 
    camera.lookAt(0, 0, 0);

    // --- GEOMETRY ---
    // High segment count is crucial for smooth cubic easing
    const geometry = new THREE.PlaneGeometry(16, 16, 128, 128); 

    // --- SHADER LOGIC (User Reference + Enhancements) ---
    const baseUniforms = {
        uDisplacement: { value: new THREE.Vector3(999, 999, 999) },
        uTime: { value: 0 },
        uHover: { value: 0 } // For transition intensity
    };

    // Vertex Shader: Implements the user's easeInOutCubic & map logic
    // Added: Clearly visible 'breathing' motion via uTime
    const vertexShader = `
      varying vec2 vUv;
      varying float vDist; // Pass distance to fragment for coloring
      uniform vec3 uDisplacement;
      uniform float uTime;

      float easeInOutCubic(float x) {
        return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
      }

      float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
      }  

      void main() {
        vUv = uv;
        vec3 new_position = position; 
        
        // Ambient Wave: Increased amplitude and optimized frequency for visibility
        // Creates a slow, gentle ripple like breathing fabric
        float waveX = sin(uv.x * 2.5 + uTime * 0.8);
        float waveY = cos(uv.y * 2.0 + uTime * 0.6);
        float ambientWave = waveX * waveY * 0.4; // Increased from 0.15 to 0.4
        
        new_position.z += ambientWave;

        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        
        // Interaction Displacement
        // Use .xyz instead of .rgb for semantic correctness with positions
        float dist = distance(uDisplacement, worldPosition.xyz);
        vDist = dist; // Pass to fragment

        float min_distance = 3.5; // Slightly wider radius

        if (dist < min_distance){
          float distance_mapped = map(dist, 0., min_distance, 1., 0.);
          float val = easeInOutCubic(distance_mapped) * 1.8; // Increased height for drama
          new_position.z += val;
        }
         
        gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
      }
    `;

    // Fragment Shader: Adds High-End Gloss/Sheen based on displacement
    const fragmentShader = `
      varying vec2 vUv;
      varying float vDist;
      uniform sampler2D uTexture;
      uniform float uTime;

      void main() {
         vec4 color = texture2D(uTexture, vUv); 
         
         // Quality Upgrade: Add a subtle sheen/highlight at the peak of displacement
         // If closest to mouse (vDist is small), add a bit of brightness
         float highlight = 0.0;
         if (vDist < 3.5) {
            highlight = (1.0 - vDist / 3.5) * 0.15; // 15% brighter at peak
         }
         
         // Apply highlight preserving alpha
         color.rgb += highlight;
         
         if (color.a < 0.01) discard;
         gl_FragColor = color;    
      }
    `;

    // --- MATERIALS ---
    const mainTexture = createTextTexture('ADO');
    const mainMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...baseUniforms,
        uTexture: { value: mainTexture },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(geometry, mainMaterial);
    // Align plane horizontally (1 line) but tilt back to show 3D depth
    plane.rotation.x = -Math.PI / 6; // 30 degree tilt backwards
    plane.rotation.z = 0; // Strictly horizontal
    plane.rotation.y = 0;
    scene.add(plane);
    planeRef.current = plane;

    // --- SHADOW PLANE (The "Echo") ---
    const shadowTexture = createTextTexture('ADO', true);
    const shadowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...baseUniforms,
        uTexture: { value: shadowTexture },
      },
      vertexShader, // Use same vertex shader so shadow moves WITH the object!
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        void main() {
           vec4 color = texture2D(uTexture, vUv); 
           gl_FragColor = color; // Already black/transparent from texture
        }
      `,
      transparent: true,
      depthWrite: false, // No occlusion
      side: THREE.DoubleSide
    });

    const shadowPlane = new THREE.Mesh(geometry, shadowMaterial);
    shadowPlane.rotation.copy(plane.rotation);
    shadowPlane.position.z = -2; // Offset behind (visual depth)
    shadowPlane.position.y = -1; // Slight Y offset for better shadow placement
    scene.add(shadowPlane);
    shadowPlaneRef.current = shadowPlane;

    // --- INTERACTION ---
    const hitPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({ visible: false })
    );
    // Align hit plane with visible plane for accurate raycasting
    hitPlane.rotation.copy(plane.rotation);
    scene.add(hitPlane);
    hitPlaneRef.current = hitPlane;

    // --- REFS ---
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    // --- RESIZE ---
    const handleResize = () => {
        if (!canvasRef.current || !renderer || !camera) return;
        const w = canvasRef.current.clientWidth;
        const h = canvasRef.current.clientHeight;
        renderer.setSize(w, h, false);
        const newAspect = w / h;
        camera.left = -frustumSize * newAspect;
        camera.right = frustumSize * newAspect;
        camera.top = frustumSize;
        camera.bottom = -frustumSize;
        camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      mainMaterial.dispose();
      shadowMaterial.dispose();
    };
  }, []);

  // --- LOOP & EVENTS ---
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
        if (!canvasRef.current || !cameraRef.current || !hitPlaneRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        
        // Mouse to NDC
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
        const intersects = raycasterRef.current.intersectObject(hitPlaneRef.current);

        if (intersects.length > 0) {
            const point = intersects[0].point;
            // Update both planes
            if (planeRef.current) {
                (planeRef.current.material as THREE.ShaderMaterial).uniforms.uDisplacement.value.copy(point);
            }
            if (shadowPlaneRef.current) {
                (shadowPlaneRef.current.material as THREE.ShaderMaterial).uniforms.uDisplacement.value.copy(point);
            }
        }
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animate
    let rAF: number;
    const animate = (time: number) => {
        rAF = requestAnimationFrame(animate);
        const t = time * 0.001;
        
        if (planeRef.current) {
             (planeRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
        }
        if (shadowPlaneRef.current) {
             (shadowPlaneRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    };
    animate(0);

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(rAF);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-white py-32 md:py-48 px-6 overflow-hidden relative"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Title Section */}
        <div className="mb-16 md:mb-24 text-center">
          <span className="text-[#5E7A70] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Brand Philosophy
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-[1.2] mb-6">
            The Decisive Touch That Awakens the Essence, ADO
          </h2>
          <p className="text-[#888] text-base md:text-lg font-light tracking-wide">
            The Philosophy of ADO
          </p>
        </div>

        {/* 3D Canvas - Ultimate Premium Quality */}
        <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center mb-16 cursor-default select-none">
          <canvas 
            ref={canvasRef}
            className="w-full h-full block"
          />
          {/* Subtle Instruction */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[9px] text-teal-900/40 uppercase tracking-[0.3em] pointer-events-none mix-blend-multiply">
             Interact
          </div>
        </div>

        {/* Description */}
        <div className="max-w-[1200px] mx-auto text-center space-y-4">
          <p className="text-[#333] text-base md:text-lg leading-relaxed font-light">
            'ADO' is a concept derived from 'Jeonshin-sajo', an art theory by Gu Kaizhi of the Eastern Jin dynasty.<br />
            <br />
            Jeonshin-sajo embodies the philosophy that conveying the spirit and essence of a person is more important than merely copying their appearance.<br />
            <br />
            Gu Kaizhi placed the core of this in 'ADO' (the pupils).<br />
            <br />
            He believed that no matter how exquisite the appearance, if the eyes are not alive, the spirit of the person is never revealed.<br />
            <br />
            This thought leads to the saying 'Hwaryongjeomjeong' (painting the dragon's eyes).<br />
            <br />
            It means that even if all forms are complete, life is only imbued when the final dot is added.<br />
            <br />
            <span className="text-[#1B4D3E] text-lg md:text-xl font-normal">ADO, like this concept, aims for procedures that pinpoint the decisive moment that determines the result.</span><br />
            <br />
            <span className="text-[#5E7A70]">We intervene not to change more, but to complete the essence.</span>
          </p>
        </div>

        {/* Bottom Signature */}
        <div className="mt-24 text-center border-t border-[#E5E5E5] pt-12">
          <p className="text-xs tracking-[0.4em] uppercase text-[#5E7A70] mb-2 font-semibold opacity-60">
            Interactive Philosophy
          </p>
          <p className="text-[10px] text-[#888] font-light italic" style={{ fontFamily: "'Gowun Batang', serif" }}>
            "The Decisive Touch That Awakens the Essence, ADO"
          </p>
        </div>
      </div>
    </section>
  );
}
