import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, MeshDistortMaterial, Sphere } from "@react-three/drei";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiThreedotjs,
} from "react-icons/si";

const bubbleConfigs = [
  { color: "#61DAFB", Icon: SiReact, from: [-5.5, 3.2, 0], to: [-2.2, 1.4, 0], scale: 0.42, delay: 0 },
  { color: "#5FA04E", Icon: SiNodedotjs, from: [5.5, 3.2, 0], to: [2.2, 1.4, 0], scale: 0.38, delay: 0.15 },
  { color: "#47A248", Icon: SiMongodb, from: [-5.8, -3.4, 0], to: [-2.4, -1.4, 0], scale: 0.4, delay: 0.3 },
  { color: "#38BDF8", Icon: SiTailwindcss, from: [5.8, -3.4, 0], to: [2.4, -1.4, 0], scale: 0.4, delay: 0.45 },
  { color: "#F7DF1E", Icon: SiJavascript, from: [0, 4.5, 0], to: [0, 2.0, 0], scale: 0.34, delay: 0.6 },
  { color: "#A78BFA", Icon: SiThreedotjs, from: [0, -4.5, 0], to: [0, -2.0, 0], scale: 0.34, delay: 0.75 },
];

const FlyingBubble = ({ color, Icon, from, to, scale, delay }) => {
  const groupRef = useRef();
  const startTimeRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (startTimeRef.current === null) startTimeRef.current = t;
    const elapsed = t - startTimeRef.current - delay;

    if (!groupRef.current) return;

    if (elapsed < 0) {
      groupRef.current.position.set(from[0], from[1], from[2]);
      return;
    }

    const duration = 1.1;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const bob = progress >= 1 ? Math.sin(t * 1.4) * 0.12 : 0;

    groupRef.current.position.x = from[0] + (to[0] - from[0]) * eased;
    groupRef.current.position.y = from[1] + (to[1] - from[1]) * eased + bob;
    groupRef.current.rotation.y = t * 0.4;
    groupRef.current.rotation.x = t * 0.2;
  });

  return (
    <group ref={groupRef} position={from}>
      <Sphere args={[1, 80, 80]} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={0}
          speed={1}
          roughness={0.15}
          metalness={0.75}
        />
      </Sphere>
      <Html center distanceFactor={8} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <Icon size={scale * 55} color="#ffffff" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }} />
      </Html>
    </group>
  );
};

const LoaderBubbles = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 42 }} gl={{ alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} />
        <pointLight position={[-5, -3, -3]} intensity={0.5} color="#915EFF" />
        {bubbleConfigs.map((cfg, i) => (
          <Float key={i} speed={1.3} rotationIntensity={0} floatIntensity={0.4}>
            <FlyingBubble {...cfg} />
          </Float>
        ))}
      </Canvas>
    </div>
  );
};

export default LoaderBubbles;