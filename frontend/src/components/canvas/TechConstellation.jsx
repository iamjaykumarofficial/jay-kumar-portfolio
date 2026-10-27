// src/components/canvas/TechConstellation.jsx
//
// WHY THIS FILE EXISTS:
// The old TechBall.jsx rendered ONE <Canvas> (= one WebGL context) per
// technology icon. With 12 technologies all visible at once on desktop,
// that's up to 12 concurrent WebGL contexts fighting for the same GPU —
// on top of the Hero and AnimatedSphere canvases. Browsers cap the number
// of live WebGL contexts per page (Chrome ~16, many mobile browsers much
// lower). Once you're near that limit, the browser starts silently
// killing old contexts to make room for new ones — that's exactly the
// "THREE.WebGLRenderer: Context Lost" you were seeing, and it's a major
// source of the stutter.
//
// THE FIX: one single <Canvas> (one WebGL context) renders all 12
// icosahedrons together. Each one still spins and floats independently,
// and each still gets its tech icon + label via drei's <Html>, which
// projects 3D position to screen position automatically — so visually
// nothing changes, but the GPU only has one context to manage.

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Icosahedron } from "@react-three/drei";

const COLS = 4;

const TechNode = ({ tech, index, total }) => {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.45;
    meshRef.current.rotation.x += delta * 0.18;
  });

  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const rows = Math.ceil(total / COLS);

  // Spread items evenly across a grid in 3D space so it matches the
  // look of the old CSS grid, without needing any DOM measuring.
  const x = (col - (COLS - 1) / 2) * 2.6;
  const y = ((rows - 1) / 2 - row) * 2.6;

  const Icon = tech.icon;

  return (
    <group position={[x, y, 0]}>
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.55}>
        <Icosahedron ref={meshRef} args={[0.85, 1]}>
          <meshStandardMaterial
            color={tech.color}
            flatShading
            roughness={0.45}
            metalness={0.2}
          />
        </Icosahedron>
        <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
          <Icon size={18} color="#ffffff" />
        </Html>
        <Html
          center
          distanceFactor={9}
          position={[0, -1.05, 0]}
          style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
        >
          <p className="text-[#aaa6c3] text-xs sm:text-sm font-medium">
            {tech.name}
          </p>
        </Html>
      </Float>
    </group>
  );
};

const TechConstellation = ({ technologies }) => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);

  // Only mount the canvas (and its render loop) while the section is
  // actually on screen — same pattern the Earth canvas already used.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "100px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rows = Math.ceil(technologies.length / COLS);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ height: `${rows * 130}px`, minHeight: 260 }}
    >
      {active && (
        <Canvas
          camera={{ position: [0, 0, 9], fov: 35 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
          }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />
            <pointLight position={[-2, -2, -2]} intensity={0.4} color="#915EFF" />
            {technologies.map((tech, i) => (
              <TechNode
                key={tech.name}
                tech={tech}
                index={i}
                total={technologies.length}
              />
            ))}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default TechConstellation;