import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * ADO Brand Philosophy - Premium Text Displacement Effect
 * 레퍼런스: Three.js ShaderMaterial + Raycaster Interaction
 * 컨셉: 미니멀, 프리미엄, 타이포그래피 중심
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
  const pointerRef = useRef(new THREE.Vector2());
  const hitPlaneRef = useRef<THREE.Mesh | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);

  // Canvas에 텍스트 텍스처 생성 (런타임)
  const createTextTexture = (text: string, isBlurred: boolean = false): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    const size = 1024;
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // 배경: 투명
    ctx.clearRect(0, 0, size, size);

    // 텍스트 설정
    ctx.fillStyle = '#1B4D3E'; // 딥 그린
    ctx.font = `bold ${size * 0.25}px "Gowun Batang", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 블러 효과 (shadow용)
    if (isBlurred) {
      ctx.filter = 'blur(20px)';
      ctx.globalAlpha = 0.6;
    }

    // 텍스트 렌더링
    ctx.fillText(text, size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // Three.js 초기화
  useEffect(() => {
    if (!canvasRef.current || rendererRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    // Orthographic Camera (레퍼런스 스타일)
    const aspect = window.innerWidth / window.innerHeight;
    const cameraDistance = 8;
    const camera = new THREE.OrthographicCamera(
      -cameraDistance * aspect,
      cameraDistance * aspect,
      cameraDistance,
      -cameraDistance,
      0.01,
      1000
    );
    camera.position.set(0, -10, 5);
    camera.lookAt(0, 0, 0);

    // === Invisible Hit Plane (Raycaster용) ===
    const hitGeometry = new THREE.PlaneGeometry(500, 500, 10, 10);
    const hitMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const hitPlane = new THREE.Mesh(hitGeometry, hitMaterial);
    hitPlane.name = 'hit';
    scene.add(hitPlane);
    hitPlaneRef.current = hitPlane;

    // === Debug Sphere (intersection point marker) ===
    const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0, // invisible
      depthWrite: false,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphereRef.current = sphere;

    // === Main Text Plane (Displacement) ===
    const geometry = new THREE.PlaneGeometry(15, 15, 100, 100);
    const mainTexture = createTextTexture('ADO', false);

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: mainTexture },
        uDisplacement: { value: new THREE.Vector3(0, 0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform vec3 uDisplacement;
        
        float easeInOutCubic(float x) {
          return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
        }

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }  

        void main() {
          vUv = uv;
          vec3 new_position = position; 
        
          vec4 localPosition = vec4(position, 1.);
          vec4 worldPosition = modelMatrix * localPosition;

          float dist = length(uDisplacement - worldPosition.rgb);
          float min_distance = 3.;

          if (dist < min_distance) {
            float distance_mapped = map(dist, 0., min_distance, 1., 0.);
            float val = easeInOutCubic(distance_mapped) * 1.2; 
            new_position.z += val;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        
        void main() {
          vec4 color = texture2D(uTexture, vUv); 
          gl_FragColor = vec4(color);    
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, shaderMaterial);
    plane.rotation.z = Math.PI / 4; // 45도 회전
    scene.add(plane);
    planeRef.current = plane;

    // === Shadow Plane ===
    const shadowTexture = createTextTexture('ADO', true);
    const shadowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: shadowTexture },
        uDisplacement: { value: new THREE.Vector3(0, 0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float dist;
        uniform vec3 uDisplacement;

        void main() {
          vUv = uv;
          
          vec4 localPosition = vec4(position, 1.);
          vec4 worldPosition = modelMatrix * localPosition;
          dist = length(uDisplacement - worldPosition.rgb);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float dist;
        uniform sampler2D uTexture;
        
        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }  

        void main() {
          vec4 color = texture2D(uTexture, vUv); 
          float min_distance = 3.;

          if (dist < min_distance) {
            float alpha = map(dist, min_distance, 0., color.a, 0.);
            color.a = alpha;
          }
          
          gl_FragColor = vec4(color);    
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const shadowPlane = new THREE.Mesh(geometry, shadowMaterial);
    shadowPlane.rotation.z = Math.PI / 4;
    scene.add(shadowPlane);
    shadowPlaneRef.current = shadowPlane;

    // 참조 저장
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    // Resize handler
    const handleResize = () => {
      if (!canvas || !renderer || !camera) return;
      
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      
      const newAspect = rect.width / rect.height;
      camera.left = -cameraDistance * newAspect;
      camera.right = cameraDistance * newAspect;
      camera.top = cameraDistance;
      camera.bottom = -cameraDistance;
      camera.updateProjectionMatrix();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
      shadowMaterial.dispose();
      hitGeometry.dispose();
      hitMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      rendererRef.current = null;
    };
  }, []);

  // Pointer Move Handler (Raycaster)
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      const raycaster = raycasterRef.current;
      const camera = cameraRef.current;
      const hitPlane = hitPlaneRef.current;
      const sphere = sphereRef.current;
      const plane = planeRef.current;
      const shadowPlane = shadowPlaneRef.current;

      if (!camera || !hitPlane || !sphere || !plane || !shadowPlane) return;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate pointer position relative to canvas
      // (기존 window 기준에서 canvas 기준으로 변경하여 정확도 향상)
      // 하지만 Raycaster가 전체 화면 기준이라면 기존 유지.
      // 여기서는 전체 화면 Overlay 방식이 아니므로, 
      // 캔버스 내에서의 좌표를 구하는 것이 맞지만, 
      // Three.js 좌표계 변환을 위해 단순화:
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(hitPlane);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        sphere.position.set(point.x, point.y, point.z);

        // Update shader uniforms
        (plane.material as THREE.ShaderMaterial).uniforms.uDisplacement.value = sphere.position;
        (shadowPlane.material as THREE.ShaderMaterial).uniforms.uDisplacement.value = sphere.position;
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  // Animation Loop
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };
    animate();

    return () => cancelAnimationFrame(animationId);
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
            본질을 깨우는 결정적 한 점, 아도
          </h2>
          <p className="text-[#888] text-base md:text-lg font-light tracking-wide">
            The Philosophy of ADO Clinic
          </p>
        </div>

        {/* 3D Canvas - Interactive Text Displacement */}
        <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center mb-16">
          <canvas 
            ref={canvasRef}
            className="w-full h-full"
          />
        </div>

        {/* Description */}
        <div className="max-w-[1200px] mx-auto text-center space-y-4">
          <p className="text-[#333] text-base md:text-lg leading-relaxed font-light">
            '아도'는 중국 동진 시대 화가 고개지의 회화 이론인 '전신사조'에서 비롯된 개념입니다.<br />
            <br />
            전신사조는 외형을 그대로 닮게 그리는 것보다, 인물의 정신과 본질을 전달하는 것이 더 중요하다는 철학을 담고 있습니다.<br />
            <br />
            고개지는 그 핵심을 '아도(阿堪)', 즉 눈동자에 두었습니다.<br />
            <br />
            아무리 외형이 정교해도 눈동자가 살아 있지 않으면 그 인물의 정신은 결코 드러나지 않는다고 보았기 때문입니다.<br />
            <br />
            이 사유는 '화룡점정'이라는 말로 이어집니다.<br />
            <br />
            모든 형태가 완성되었다 하더라도, 마지막 한 점이 더해질 때 비로소 생명이 깃든다는 의미입니다.<br />
            <br />
            <span className="text-[#1B4D3E] text-lg md:text-xl font-normal">ADO Clinic은 이 개념처럼, 결과를 결정짓는 지점을 정확히 짚는 시술을 지향합니다.</span><br />
            <br />
            <span className="text-[#5E7A70]">우리는 더 많이 바꾸기보다, 본질을 완성하기 위해 개입합니다.</span>
          </p>
        </div>

        {/* Bottom Signature */}
        <div className="mt-24 text-center border-t border-[#E5E5E5] pt-12">
          <p className="text-xs tracking-[0.4em] uppercase text-[#5E7A70] mb-2 font-semibold opacity-60">
            Interactive Philosophy
          </p>
          <p className="text-[10px] text-[#888] font-light italic" style={{ fontFamily: "'Gowun Batang', serif" }}>
            "본질을 깨우는 결정적 한 점, 아도"
          </p>
        </div>
      </div>
    </section>
  );
}