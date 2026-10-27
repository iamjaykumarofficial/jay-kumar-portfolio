import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Icosahedron } from "@react-three/drei";
import { technologies } from "../../constants/tech";

const COLS = 4;
const GAP_X = 3.1;
const GAP_Y = 3.0;

function getPosition(index) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const x = (col - (COLS - 1) / 2) * GAP_X;
  const y = (0.55 - row) * GAP_Y;
  return [x, y, 0];
}

const TechMesh = ({ color, Icon, name, position }) => {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* 3D rock */}
        <Icosahedron ref={meshRef} args={[1.05, 1]}>
          <meshStandardMaterial
            color={color}
            flatShading
            roughness={0.4}
            metalness={0.25}
          />
        </Icosahedron>

        {/* Logo center */}
        <Html center distanceFactor={7} style={{ pointerEvents: "none" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon size={22} color="#ffffff" />
          </div>
        </Html>

        {/* Name under ball */}
        <Html
          position={[0, -1.45, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: "none" }}
        >
          <p
            style={{
              color: "#c4b5fd",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              margin: 0,
              textAlign: "center",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {name}
          </p>
        </Html>
      </group>
    </Float>
  );
};

const TechScene = () => {
  const items = useMemo(
    () =>
      technologies.map((tech, i) => ({
        ...tech,
        position: getPosition(i),
      })),
    []
  );

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -2, -4]} intensity={0.45} color="#915EFF" />
      <pointLight position={[5, 2, 2]} intensity={0.3} color="#60a5fa" />

      {items.map((tech) => (
        <TechMesh
          key={tech.name}
          color={tech.color}
          Icon={tech.icon}
          name={tech.name}
          position={tech.position}
        />
      ))}
    </>
  );
};

const TechCanvas = () => {
  return (
    <div className="w-full h-[520px] sm:h-[580px] md:h-[620px]">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
        }}
        performance={{ min: 0.5 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <TechScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechCanvas;