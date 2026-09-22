import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Icosahedron } from "@react-three/drei";

const RotatingRock = ({ color, Icon, dragRef }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = dragRef.current.rotY;
      meshRef.current.rotation.x = dragRef.current.rotX;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.6}>
      <Icosahedron ref={meshRef} args={[1.3, 1]}>
        <meshStandardMaterial
          color={color}
          flatShading
          roughness={0.5}
          metalness={0.15}
        />
      </Icosahedron>

      {/* Chota logo */}
      <Html
        center
        distanceFactor={7}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none" }}
      >
        <Icon size={18} color="#ffffff" />
      </Html>
    </Float>
  );
};

const TechBall = ({ color = "#915EFF", Icon }) => {
  const dragRef = useRef({ rotY: 0, rotX: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    dragRef.current.rotY += dx * 0.012;
    dragRef.current.rotX += dy * 0.012;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        width: "100%",
        height: "100%",
        touchAction: "none",
        cursor: "grab",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 3, 3]} intensity={1.3} />
          <pointLight position={[-3, -2, -3]} intensity={0.5} color={color} />
          <RotatingRock color={color} Icon={Icon} dragRef={dragRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechBall;