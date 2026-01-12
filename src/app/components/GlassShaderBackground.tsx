import React, { useRef, useEffect } from 'react';

export function GlassShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasSize);

    // Simple noise function
    const noise = (x: number, y: number, time: number) => {
      return Math.sin(x * 3 + time * 0.3) * Math.cos(y * 2 + time * 0.2) * 0.5 + 0.5;
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016; // ~60fps
      const time = timeRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Smooth mouse follow
      mousePos.current.x += (targetMouse.current.x - mousePos.current.x) * 0.05;
      mousePos.current.y += (targetMouse.current.y - mousePos.current.y) * 0.05;

      // Clear with base white color
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, width, height);

      // Draw vertical glass stripes
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.015)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 5) {
        const offset = Math.sin(x * 0.01 + time * 0.5) * 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Add micro texture noise
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 40) {
        const n = Math.random() * 10;
        data[i] += n;
        data[i + 1] += n;
        data[i + 2] += n;
      }
      ctx.putImageData(imageData, 0, 0);

      // Calculate mouse distance and create teal ripple
      const mouseX = mousePos.current.x * width;
      const mouseY = mousePos.current.y * height;

      // Draw multiple teal ripple rings
      const maxRipples = 5;
      for (let i = 0; i < maxRipples; i++) {
        const ripplePhase = (time * 3 + i * 0.3) % (Math.PI * 2);
        const rippleRadius = 100 + Math.sin(ripplePhase) * 50;
        
        // Teal color with varying opacity
        const opacity = (Math.sin(ripplePhase) * 0.5 + 0.5) * 0.15;
        
        // Create radial gradient for teal glow
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, rippleRadius * 3
        );
        gradient.addColorStop(0, `rgba(93, 213, 213, ${opacity * 2})`);
        gradient.addColorStop(0.3, `rgba(93, 213, 213, ${opacity})`);
        gradient.addColorStop(1, 'rgba(93, 213, 213, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Wide teal glow around mouse
      const glowGradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 300
      );
      glowGradient.addColorStop(0, 'rgba(93, 213, 213, 0.25)');
      glowGradient.addColorStop(0.5, 'rgba(93, 213, 213, 0.08)');
      glowGradient.addColorStop(1, 'rgba(93, 213, 213, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw animated wave displacement (simulating 3D effect)
      ctx.strokeStyle = 'rgba(93, 213, 213, 0.1)';
      ctx.lineWidth = 2;
      
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 10) {
          const distToMouse = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
          );
          
          const waveOffset = Math.sin(distToMouse * 0.02 - time * 2) * 
                            Math.max(0, 1 - distToMouse / 200) * 20;
          
          if (x === 0) {
            ctx.moveTo(x, y + waveOffset);
          } else {
            ctx.lineTo(x, y + waveOffset);
          }
        }
        ctx.stroke();
      }

      // Shimmer effect
      const shimmerGradient = ctx.createLinearGradient(0, 0, width, height);
      const shimmerPhase = (time * 0.5) % 1;
      shimmerGradient.addColorStop(Math.max(0, shimmerPhase - 0.1), 'rgba(255, 255, 255, 0)');
      shimmerGradient.addColorStop(shimmerPhase, 'rgba(255, 255, 255, 0.05)');
      shimmerGradient.addColorStop(Math.min(1, shimmerPhase + 0.1), 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = shimmerGradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        imageRendering: 'auto',
        willChange: 'contents'
      }}
    />
  );
}
