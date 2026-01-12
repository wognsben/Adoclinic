import React, { useEffect, useRef } from 'react';

const HeroGL: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex Shader: Renders a simple full-screen quad
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: High-end Domain Warping + Mouse Interaction
    const fsSource = `
      precision mediump float;

      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_hover;

      // Random / Noise functions
      float random (in vec2 _st) {
        return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise (in vec2 _st) {
        vec2 i = floor(_st);
        vec2 f = fract(_st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
      }

      #define NUM_OCTAVES 5

      float fbm ( in vec2 _st) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5),
                        -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(_st);
          _st = rot * _st * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        st.x *= u_resolution.x/u_resolution.y;

        vec2 mouse = u_mouse / u_resolution.xy;
        mouse.x *= u_resolution.x/u_resolution.y;

        // Mouse interaction ripple
        float dist = distance(st, mouse);
        float interaction = smoothstep(0.5, 0.0, dist) * u_hover;
        
        vec3 color = vec3(0.0);

        // Domain Warping Logic for Liquid Stone/Glass effect
        vec2 q = vec2(0.);
        q.x = fbm( st + 0.00 * u_time);
        q.y = fbm( st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm( st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time );
        r.y = fbm( st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

        // Add mouse distortion to the warped coordinates
        r += interaction * 0.2 * vec2(sin(u_time * 2.0), cos(u_time * 2.0));

        float f = fbm(st + r);

        // Color Mixing
        // Deep Green Base (Forest/Dark Teal)
        vec3 color1 = vec3(0.02, 0.15, 0.12); 
        // Lighter Turquoise/Jade for ripples
        vec3 color2 = vec3(0.05, 0.35, 0.3);
        // Stone/Warm highlight
        vec3 color3 = vec3(0.1, 0.5, 0.45); // Cyan-ish highlight
        
        // Dynamic blending
        color = mix(color1, color2, clamp((f*f)*4.0, 0.0, 1.0));
        color = mix(color, color3, clamp(length(q), 0.0, 1.0));
        
        // Specular highlight for "Glass" feel
        color += vec3(0.8, 0.9, 0.8) * pow(f, 3.5) * 0.4;

        // Interaction highlight (Cyan ripple)
        color += vec3(0.0, 0.6, 0.5) * interaction * f * 1.5;

        // Vignette
        float vignette = 1.0 - smoothstep(0.5, 1.5, length(gl_FragCoord.xy/u_resolution.xy - 0.5));
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Helper to compile shader
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
      return;
    }

    // Set up geometry (Full screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Uniform Locations
    const positionLocation = gl.getAttribLocation(program, 'position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const hoverLocation = gl.getUniformLocation(program, 'u_hover');

    // State
    let mouseX = 0;
    let mouseY = 0;
    let targetHover = 0;
    let currentHover = 0;
    let startTime = performance.now();

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = rect.height - (e.clientY - rect.top); // Flip Y for WebGL
      targetHover = 1.0;
    };

    const handleMouseLeave = () => {
      targetHover = 0.0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    // Resize Handler
    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const displayWidth = containerRef.current.clientWidth;
      const displayHeight = containerRef.current.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', resize);
    resize(); // Initial resize

    // Animation Loop
    const render = () => {
      if (!gl) return;
      
      const currentTime = performance.now();
      const time = (currentTime - startTime) * 0.0005; // Slow down time

      // Smooth hover transition
      currentHover += (targetHover - currentHover) * 0.05;

      gl.useProgram(program);

      // Bind Position
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // Set Uniforms
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mouseX, mouseY);
      gl.uniform1f(hoverLocation, currentHover);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(render);
    };
    render();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full -z-10 bg-[#02120b]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default HeroGL;
