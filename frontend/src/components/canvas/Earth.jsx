// src/components/canvas/Earth.jsx

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useTexture,
  Sphere,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

const Earth = () => {
  const earthRef = useRef(null);
  const atmosphereRef = useRef(null);

  const colorMap = useTexture("/textures/earth_atmos_2048.jpg");

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.02;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <group>
      {/* Main Earth */}
      <Sphere
        ref={earthRef}
        args={[1, 96, 96]}
        scale={2.1}
      >
        <meshStandardMaterial
          map={colorMap}
          metalness={0.02}
          roughness={0.48}
          envMapIntensity={0.8}
        />
      </Sphere>

      {/* Inner atmosphere */}
      <Sphere
        ref={atmosphereRef}
        args={[1, 96, 96]}
        scale={2.17}
      >
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.075}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere
        args={[1, 64, 64]}
        scale={2.22}
      >
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
};

const EarthScene = ({ active }) => {
  return (
    <>
      <OrbitControls
        enabled={active}
        enableRotate={active}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.65}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI - 0.15}
        makeDefault
      />

      <ambientLight intensity={0.45} />

      <directionalLight
        position={[5, 3, 6]}
        intensity={3.2}
      />

      <directionalLight
        position={[-4, 1, -3]}
        intensity={0.35}
      />

      <pointLight
        position={[-4, 2, 5]}
        intensity={1.4}
        distance={18}
        color="#60a5fa"
      />

      <pointLight
        position={[3, -2, 4]}
        intensity={0.55}
        distance={12}
        color="#dbeafe"
      />

      <Stars
        radius={80}
        depth={45}
        count={1200}
        factor={2.5}
        saturation={0}
        fade
        speed={0.2}
      />

      <Earth />
    </>
  );
};

const EarthCanvas = ({ active = true }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${
        active
          ? "cursor-grab active:cursor-grabbing"
          : "pointer-events-none"
      }`}
      style={{
        touchAction: active ? "none" : "auto",
      }}
    >
      {isVisible && (
        <Canvas
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{
            position: [0, 0, 7.4],
            fov: 42,
            near: 0.1,
            far: 200,
          }}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            pointerEvents: active ? "auto" : "none",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <EarthScene active={active} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default EarthCanvas;