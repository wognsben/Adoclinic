import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import * as THREE from 'three';
import gsap from 'gsap';

// ============================================
// OPTIMIZED CRYSTAL FRAGMENTATION
// Using InstancedMesh for performance
// ============================================
function OptimizedCrystalProjection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    instancedMesh?: THREE.InstancedMesh;
    cubeCount?: number;
    animatedTexture?: THREE.CanvasTexture;
    time?: number;
    frameCount?: number;
    animationCanvas?: HTMLCanvasElement;
    animationCtx?: CanvasRenderingContext2D;
    initialPositions?: THREE.Vector3[];
    initialRotations?: THREE.Euler[];
    initialScales?: number[];
    fragmentPositions?: THREE.Vector3[][];
    dummy?: THREE.Object3D;
    currentPositions?: THREE.Vector3[]; // For GSAP animation
    isFragmented?: boolean;
  }>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    sceneRef.current = { 
      scene, 
      camera, 
      renderer, 
      time: 0,
      frameCount: 0,
      dummy: new THREE.Object3D(),
    };

    // Optimized lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xB5C9C0, 2.5, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9DB5AC, 1.8, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xDCE8E4, 1.5, 100);
    pointLight3.position.set(0, 0, 15);
    scene.add(pointLight3);

    // Create animated texture
    createAnimatedTexture();

    // Create instanced crystal formation
    createInstancedCrystal();

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      sceneRef.current.time = (sceneRef.current.time || 0) + 0.005;
      sceneRef.current.frameCount = (sceneRef.current.frameCount || 0) + 1;

      // Update texture every 3 frames (optimization)
      if (sceneRef.current.frameCount % 3 === 0) {
        updateAnimatedTexture();
      }

      // Animate instanced cubes
      animateInstances();

      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    function handleResize() {
      if (!canvasRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Handle hover state change
  useEffect(() => {
    if (!sceneRef.current.instancedMesh) return;

    if (isHovered) {
      fragmentCrystal();
    } else {
      reunifyCrystal();
    }
  }, [isHovered]);

  // Create animated canvas texture
  function createAnimatedTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; // Reduced from 1024 for performance
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    sceneRef.current.animationCanvas = canvas;
    sceneRef.current.animationCtx = ctx;

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;

    sceneRef.current.animatedTexture = texture;
  }

  // Update animated texture (called every 3 frames)
  function updateAnimatedTexture() {
    const { animationCanvas, animationCtx, animatedTexture, time } = sceneRef.current;
    if (!animationCanvas || !animationCtx || !animatedTexture || time === undefined) return;

    const w = animationCanvas.width;
    const h = animationCanvas.height;

    // Clear
    animationCtx.clearRect(0, 0, w, h);

    // Flowing gradient base
    const gradientAngle = time * 0.25;
    const x1 = w / 2 + Math.cos(gradientAngle) * w * 0.7;
    const y1 = h / 2 + Math.sin(gradientAngle) * h * 0.7;
    const x2 = w / 2 - Math.cos(gradientAngle) * w * 0.7;
    const y2 = h / 2 - Math.sin(gradientAngle) * h * 0.7;

    const gradient1 = animationCtx.createLinearGradient(x1, y1, x2, y2);
    gradient1.addColorStop(0, '#E8F1ED');
    gradient1.addColorStop(0.2, '#DCE8E4');
    gradient1.addColorStop(0.4, '#B5C9C0');
    gradient1.addColorStop(0.6, '#9DB5AC');
    gradient1.addColorStop(0.8, '#8FA89F');
    gradient1.addColorStop(1, '#7A9B8E');

    animationCtx.fillStyle = gradient1;
    animationCtx.fillRect(0, 0, w, h);

    // Flowing circular gradients (reduced from 6 to 4)
    for (let i = 0; i < 4; i++) {
      const phase = time * 0.35 + i * Math.PI * 0.5;
      const cx = w / 2 + Math.cos(phase) * w * 0.35;
      const cy = h / 2 + Math.sin(phase * 0.8) * h * 0.35;
      const radius = w * 0.4 + Math.sin(time * 0.4 + i) * w * 0.1;

      const radialGrad = animationCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      radialGrad.addColorStop(0, `rgba(232, 241, 237, ${0.7 + Math.sin(time * 0.6 + i) * 0.2})`);
      radialGrad.addColorStop(0.5, `rgba(181, 201, 192, ${0.4 + Math.sin(time * 0.7 + i) * 0.15})`);
      radialGrad.addColorStop(1, 'rgba(122, 155, 142, 0)');

      animationCtx.fillStyle = radialGrad;
      animationCtx.fillRect(0, 0, w, h);
    }

    // Shimmer overlay
    const shimmerAngle = time * 0.3;
    const shimmerGrad = animationCtx.createLinearGradient(
      w / 2 + Math.cos(shimmerAngle) * w,
      h / 2 + Math.sin(shimmerAngle) * h,
      w / 2 - Math.cos(shimmerAngle) * w,
      h / 2 - Math.sin(shimmerAngle) * h
    );
    shimmerGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    shimmerGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.4 + Math.sin(time * 0.8) * 0.2})`);
    shimmerGrad.addColorStop(1, 'rgba(220, 232, 228, 0.1)');

    animationCtx.fillStyle = shimmerGrad;
    animationCtx.fillRect(0, 0, w, h);

    // Mark texture for update
    animatedTexture.needsUpdate = true;
  }

  // Create instanced crystal formation
  function createInstancedCrystal() {
    const { scene } = sceneRef.current;
    if (!scene) return;

    const gridSize = 12;
    const spacing = 0.24;
    const scale = 1.2;

    // Create organic droplet mask (natural crystal shape)
    const maskData = createOrganicDropletMask(gridSize);
    const cubeCount = maskData.filter(v => v).length;

    // PREMIUM Diamond crystal geometry - HIGHER SUBDIVISION for smooth facets
    const geometry = new THREE.IcosahedronGeometry(0.18, 1); // 20-sided, subdivision 1 = smooth diamond

    // ULTRA-PREMIUM MeshPhysicalMaterial for glass/diamond effect
    const material = new THREE.MeshPhysicalMaterial({
      map: sceneRef.current.animatedTexture,
      
      // Glass/Diamond physical properties
      metalness: 0.1, // Low metalness for glass
      roughness: 0.05, // Very smooth surface
      
      // Transparency & Refraction
      transparent: true,
      opacity: 0.85, // More transparent
      transmission: 0.95, // HIGH transmission = light passes through like glass
      thickness: 0.8, // Glass thickness for realistic refraction
      ior: 2.42, // Index of Refraction (2.42 = Diamond!)
      
      // Surface coating
      clearcoat: 1.0, // Maximum clearcoat for glossy finish
      clearcoatRoughness: 0.05, // Very smooth clearcoat
      
      // Sheen for velvet-like edge highlight
      sheen: 0.6,
      sheenColor: new THREE.Color(0xE8F1ED),
      
      // Subtle emissive glow
      emissive: new THREE.Color(0x9DB5AC),
      emissiveIntensity: 0.15,
      
      // Environment reflection
      envMapIntensity: 2.5, // Strong environment reflections
      
      // Color tint
      color: new THREE.Color(0xDCE8E4), // Subtle warm stone tint
    });

    // Create instanced mesh
    const instancedMesh = new THREE.InstancedMesh(geometry, material, cubeCount);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const initialPositions: THREE.Vector3[] = [];
    const initialRotations: THREE.Euler[] = [];
    const initialScales: number[] = [];
    const dummy = new THREE.Object3D();

    let instanceIndex = 0;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const flippedY = gridSize - 1 - y;
        const pixelIndex = flippedY * gridSize + x;

        if (maskData[pixelIndex]) {
          const posX = (x - (gridSize - 1) / 2) * spacing * scale;
          const posY = (y - (gridSize - 1) / 2) * spacing * scale;
          const posZ = (Math.random() - 0.5) * 0.5;

          dummy.position.set(posX, posY, posZ);
          dummy.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          );
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();

          instancedMesh.setMatrixAt(instanceIndex, dummy.matrix);

          initialPositions.push(new THREE.Vector3(posX, posY, posZ));
          initialRotations.push(new THREE.Euler(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          ));
          initialScales.push(1);

          instanceIndex++;
        }
      }
    }

    instancedMesh.instanceMatrix.needsUpdate = true;

    scene.add(instancedMesh);

    console.log(`✨ Created ${cubeCount} diamond crystal particles`);

    sceneRef.current.instancedMesh = instancedMesh;
    sceneRef.current.cubeCount = cubeCount;
    sceneRef.current.initialPositions = initialPositions;
    sceneRef.current.currentPositions = initialPositions.map(pos => pos.clone()); // Clone for GSAP
    sceneRef.current.initialRotations = initialRotations;
    sceneRef.current.initialScales = initialScales;

    // Pre-calculate fragment positions
    calculateFragmentPositions();
  }

  // Create organic droplet mask
  function createOrganicDropletMask(size: number): boolean[] {
    const maskData: boolean[] = new Array(size * size).fill(false);
    const centerX = size / 2;
    const centerY = size / 2;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = (x - centerX) / centerX;
        const dy = (y - centerY) / centerY;
        const angle = Math.atan2(dy, dx);

        // Hexagonal diamond shape (6-fold symmetry)
        const hexAngle = Math.abs((angle + Math.PI) % (Math.PI / 3) - Math.PI / 6);
        const hexRadius = 0.85 / Math.cos(hexAngle);
        
        // Distance from center
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Organic edge with crystal facets
        const facetNoise = Math.sin(angle * 6) * 0.08; // 6 facets
        const organicNoise = Math.sin(angle * 18 + dist * 8) * 0.04;
        
        const effectiveRadius = hexRadius + facetNoise + organicNoise;
        
        // Create diamond shape with pointed top and bottom
        const verticalStretch = 1.2;
        const normalizedDist = Math.sqrt(dx * dx + (dy * verticalStretch) * (dy * verticalStretch));
        
        let isVisible = normalizedDist < effectiveRadius;

        // Add some random gaps for organic look
        if (isVisible && Math.random() < 0.05) {
          isVisible = false;
        }

        // Sharper edges at extremes (diamond points)
        if (isVisible && Math.abs(dy) > 0.75 && Math.abs(dx) > 0.4) {
          isVisible = false;
        }

        if (isVisible) {
          maskData[y * size + x] = true;
        }
      }
    }

    return maskData;
  }

  // Animate instances
  function animateInstances() {
    const { instancedMesh, cubeCount, dummy, time, currentPositions } = sceneRef.current;
    if (!instancedMesh || !cubeCount || !dummy || !time || !currentPositions) return;

    for (let i = 0; i < cubeCount; i++) {
      const phase = i * 0.04;
      
      // Use currentPositions (which GSAP animates) as base
      const basePos = currentPositions[i];
      
      // Apply depth oscillation on top of GSAP position
      const oscillationZ = Math.sin(time * 0.7 + phase) * 0.6 + Math.cos(time * 0.4 + phase * 1.3) * 0.3;
      
      dummy.position.set(basePos.x, basePos.y, basePos.z + oscillationZ);

      // Gentle rotation
      dummy.rotation.x = time * 0.04 + phase * 0.015;
      dummy.rotation.y = time * 0.06 + phase * 0.02;
      dummy.rotation.z = Math.sin(time * 0.25 + phase) * 0.08;

      // Subtle scale pulsation
      const scaleValue = 1 + Math.sin(time * 0.5 + phase) * 0.06;
      dummy.scale.setScalar(scaleValue);

      // Update matrix
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  // Calculate fragment positions
  function calculateFragmentPositions() {
    const cubeCount = sceneRef.current.cubeCount;
    if (!cubeCount) return;

    const fragmentCount = 6;
    const fragmentPositions: THREE.Vector3[][] = [];

    const clusterCenters = [
      new THREE.Vector3(-3, 2.5, -1),
      new THREE.Vector3(3.5, 1.5, -0.5),
      new THREE.Vector3(-2, -2, -1.5),
      new THREE.Vector3(2.5, -1.5, -0.8),
      new THREE.Vector3(0, 3, -1.2),
      new THREE.Vector3(0.5, -3.5, -1),
    ];

    const cubesPerFragment = Math.ceil(cubeCount / fragmentCount);

    for (let f = 0; f < fragmentCount; f++) {
      const fragmentCubes: THREE.Vector3[] = [];
      const center = clusterCenters[f];
      const startIdx = f * cubesPerFragment;
      const endIdx = Math.min(startIdx + cubesPerFragment, cubeCount);
      
      // Generate enough positions for all cubes in this fragment
      for (let i = startIdx; i < endIdx; i++) {
        const localIdx = i - startIdx;
        const clusterSize = 8; // Increased from 6
        const clusterSpacing = 0.28;
        
        const cx = localIdx % clusterSize;
        const cy = Math.floor(localIdx / clusterSize);
        
        const clusterDx = (cx - clusterSize / 2) * clusterSpacing;
        const clusterDy = (cy - clusterSize / 2) * clusterSpacing;
        
        const newPos = new THREE.Vector3(
          center.x + clusterDx,
          center.y + clusterDy,
          center.z + (Math.random() - 0.5) * 0.8
        );
        fragmentCubes.push(newPos);
      }

      fragmentPositions.push(fragmentCubes);
    }

    console.log(`✨ Fragment positions calculated:`, fragmentPositions.map(f => f.length));
    sceneRef.current.fragmentPositions = fragmentPositions;
  }

  // Fragment crystal
  function fragmentCrystal() {
    const { cubeCount, fragmentPositions, currentPositions } = sceneRef.current;
    if (!cubeCount || !fragmentPositions || !currentPositions) {
      console.error('❌ Missing data for fragmentation');
      return;
    }

    console.log('🔮 Fragmenting crystal...', { cubeCount, fragmentCount: fragmentPositions.length });

    const cubesPerFragment = Math.ceil(cubeCount / fragmentPositions.length);

    for (let i = 0; i < cubeCount; i++) {
      const fragmentIdx = Math.min(Math.floor(i / cubesPerFragment), fragmentPositions.length - 1);
      const positionIdx = i - (fragmentIdx * cubesPerFragment);
      
      const fragment = fragmentPositions[fragmentIdx];
      const targetPos = fragment[positionIdx];

      if (!targetPos) {
        console.warn(`⚠️ Missing target position for cube ${i} (fragment ${fragmentIdx}, position ${positionIdx})`);
        continue;
      }

      if (!currentPositions[i]) {
        console.warn(`⚠️ Missing current position for cube ${i}`);
        continue;
      }

      // Animate currentPositions directly
      gsap.to(currentPositions[i], {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.8,
        delay: i * 0.003,
        ease: 'power2.out',
      });
    }

    sceneRef.current.isFragmented = true;
  }

  // Reunify crystal
  function reunifyCrystal() {
    const { cubeCount, currentPositions, initialPositions } = sceneRef.current;
    if (!cubeCount || !currentPositions || !initialPositions) {
      console.error('❌ Missing data for reunification');
      return;
    }

    console.log('🔮 Reunifying crystal...', { cubeCount });

    // Use the exact initial positions we stored
    for (let i = 0; i < cubeCount; i++) {
      if (!currentPositions[i] || !initialPositions[i]) {
        console.warn(`⚠️ Missing position for cube ${i}`);
        continue;
      }

      // Animate back to initial position
      gsap.to(currentPositions[i], {
        x: initialPositions[i].x,
        y: initialPositions[i].y,
        z: initialPositions[i].z,
        duration: 2,
        delay: i * 0.002,
        ease: 'power2.inOut',
      });
    }

    sceneRef.current.isFragmented = false;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
      />
    </div>
  );
}

// ============================================
// Main Component Export
// ============================================
export function TreatmentMirrorHero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      className="relative w-full h-screen bg-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pure white base */}
      <div 
        className="absolute inset-0" 
        style={{
          background: '#FFFFFF',
        }}
      />

      {/* Subtle ambient glow layers */}
      <div 
        className="absolute inset-0 opacity-12"
        style={{
          background: `
            radial-gradient(ellipse at 25% 20%, rgba(220, 232, 228, 0.6) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 80%, rgba(181, 201, 192, 0.5) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, rgba(157, 181, 172, 0.4) 0%, transparent 65%)
          `,
        }}
      />

      {/* Optimized Crystal Projection */}
      <OptimizedCrystalProjection />

      {/* Center Title with 3D Flip Effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
        style={{ 
          zIndex: 10, // Changed from 100 to prevent blocking Header
          perspective: '2000px', // 3D perspective
          width: '100vw', // Full width to prevent wrapping
        }}
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 3D Flip Container */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            width: '100%', // Ensure full width
          }}
          animate={{
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.45, 0, 0.15, 1],
          }}
        >
          {/* Front Side - 시술 안내 */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap', // Prevent wrapping
            }}
          >
            <h1 
              className="font-light mb-10 relative"
              style={{
                fontSize: '10rem',
                fontFamily: "'Gowun Batang', serif",
                color: '#7A9B8E',
                letterSpacing: '0.06em',
                lineHeight: 1.1,
                textShadow: `
                  0 30px 70px rgba(143, 168, 159, 0.55),
                  0 12px 30px rgba(122, 155, 142, 0.4),
                  0 0 140px rgba(181, 201, 192, 0.35),
                  0 5px 10px rgba(255, 255, 255, 0.98),
                  0 2px 4px rgba(122, 155, 142, 0.45)
                `,
                fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
                whiteSpace: 'nowrap', // Prevent wrapping
              }}
            >
              <span className="relative inline-block">
                시술 안내
                {/* Ultra-premium multi-layer glow */}
                <span 
                  className="absolute inset-0 blur-3xl opacity-85"
                  style={{ color: '#9DB5AC' }}
                >
                  시술 안내
                </span>
                <span 
                  className="absolute inset-0 blur-2xl opacity-65"
                  style={{ color: '#B5C9C0' }}
                >
                  시술 안내
                </span>
                <span 
                  className="absolute inset-0 blur-xl opacity-45"
                  style={{ color: '#DCE8E4' }}
                >
                  시술 안내
                </span>
                {/* Crisp outline */}
                <span 
                  className="absolute inset-0"
                  style={{ 
                    color: 'transparent',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.98)',
                  }}
                >
                  시술 안내
                </span>
              </span>
            </h1>
            <motion.p 
              className="text-xl tracking-[0.45em] font-light"
              style={{ 
                color: '#8FA89F',
                textShadow: '0 6px 24px rgba(143, 168, 159, 0.45), 0 3px 6px rgba(255, 255, 255, 0.85)',
                letterSpacing: '0.45em',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              TREATMENT PROGRAMS
            </motion.p>
          </div>

          {/* Back Side - ADO CLINIC */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%) rotateY(180deg)',
              whiteSpace: 'nowrap', // Prevent wrapping
            }}
          >
            <h1 
              className="font-light mb-10 relative"
              style={{
                fontSize: '10rem',
                fontFamily: "'Gowun Batang', serif",
                color: '#7A9B8E',
                letterSpacing: '0.12em',
                lineHeight: 1.1,
                textShadow: `
                  0 30px 70px rgba(143, 168, 159, 0.55),
                  0 12px 30px rgba(122, 155, 142, 0.4),
                  0 0 140px rgba(181, 201, 192, 0.35),
                  0 5px 10px rgba(255, 255, 255, 0.98),
                  0 2px 4px rgba(122, 155, 142, 0.45)
                `,
                fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
                whiteSpace: 'nowrap', // Prevent wrapping
              }}
            >
              <span className="relative inline-block">
                ADO CLINIC
                {/* Ultra-premium multi-layer glow */}
                <span 
                  className="absolute inset-0 blur-3xl opacity-85"
                  style={{ color: '#9DB5AC' }}
                >
                  ADO CLINIC
                </span>
                <span 
                  className="absolute inset-0 blur-2xl opacity-65"
                  style={{ color: '#B5C9C0' }}
                >
                  ADO CLINIC
                </span>
                <span 
                  className="absolute inset-0 blur-xl opacity-45"
                  style={{ color: '#DCE8E4' }}
                >
                  ADO CLINIC
                </span>
                {/* Crisp outline */}
                <span 
                  className="absolute inset-0"
                  style={{ 
                    color: 'transparent',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.98)',
                  }}
                >
                  ADO CLINIC
                </span>
              </span>
            </h1>
            <p 
              className="text-xl tracking-[0.45em] font-light"
              style={{ 
                color: '#8FA89F',
                textShadow: '0 6px 24px rgba(143, 168, 159, 0.45), 0 3px 6px rgba(255, 255, 255, 0.85)',
                letterSpacing: '0.45em',
              }}
            >
              PREMIUM AESTHETICS
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Hover instruction */}
      <motion.div 
        className="absolute top-32 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p 
          className="text-xs text-[#9DB5AC] tracking-[0.4em] font-light"
          style={{ textShadow: '0 3px 14px rgba(157, 181, 172, 0.35)' }}
        >
          HOVER TO EXPLORE
        </p>
      </motion.div>

      {/* Bottom info */}
      <motion.div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p 
          className="text-xs text-[#8FA89F] tracking-[0.45em] font-light"
          style={{ textShadow: '0 3px 14px rgba(143, 168, 159, 0.35)' }}
        >
          Object 04 · Medical Aesthetics
        </p>
      </motion.div>
    </section>
  );
}