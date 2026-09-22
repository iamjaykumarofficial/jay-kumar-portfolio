import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Stars, Float } from "@react-three/drei";

// Default resting spot: behind the "a" in "Choudhary".
const DEFAULT_TARGET = { x: -0.9, y: 0.6 };
// How far (in 3D units) the bubble can travel across the full page.
const RANGE_X = 4.5;
const RANGE_Y = 3;

const DistortedSphere = ({ targetRef }) => {
  const groupRef = useRef();
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.18;
    }
    if (groupRef.current) {
      // Smoothly glide toward wherever the mouse has dragged it.
      groupRef.current.position.x +=
        (targetRef.current.x - groupRef.current.position.x) * 0.08;
      groupRef.current.position.y +=
        (targetRef.current.y - groupRef.current.position.y) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[DEFAULT_TARGET.x, DEFAULT_TARGET.y, 0]}>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={1.8}>
        <Sphere args={[1, 100, 200]} scale={2.1} ref={meshRef}>
          <MeshDistortMaterial
            color="#915EFF"
            attach="material"
            distort={0.38}
            speed={1.6}
            roughness={0.15}
            metalness={0.85}
          />
        </Sphere>
      </Float>
    </group>
  );
};

const AnimatedSphere = () => {
  // Shared mutable target position - updated by plain window listeners
  // (not React state) so dragging stays perfectly smooth at 60fps.
  const targetRef = useRef({ ...DEFAULT_TARGET });
  const draggingRef = useRef(false);

  useEffect(() => {
    const toWorld = (clientX, clientY) => {
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = -(clientY / window.innerHeight) * 2 + 1;
      return { x: nx * RANGE_X, y: ny * RANGE_Y };
    };

    const handleDown = (e) => {
      draggingRef.current = true;
      const point = e.touches ? e.touches[0] : e;
      targetRef.current = toWorld(point.clientX, point.clientY);
    };

    const handleMove = (e) => {
      if (!draggingRef.current) return;
      const point = e.touches ? e.touches[0] : e;
      targetRef.current = toWorld(point.clientX, point.clientY);
    };

    const handleUp = () => {
      draggingRef.current = false;
    };

    // Listening on window (not the canvas div) means every click/drag on the
    // page still works normally for buttons/links - this never blocks them.
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchstart", handleDown, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchstart", handleDown);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-6, -3, -4]} intensity={0.6} color="#915EFF" />
        <Stars
          radius={100}
          depth={50}
          count={3500}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <DistortedSphere targetRef={targetRef} />
      </Canvas>
    </div>
  );
};

export default AnimatedSphere;