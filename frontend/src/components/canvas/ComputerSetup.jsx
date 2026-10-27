import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, RoundedBox, ContactShadows, Html } from "@react-three/drei";

const ScreenContent = () => (
  <Html
    transform
    occlude={false}
    position={[0, 0.15, 0.052]}
    scale={0.1}
    style={{ pointerEvents: "none" }}
  >
    <div
      style={{
        width: 720,
        height: 420,
        background: "#050816",
        overflow: "hidden",
        borderRadius: 6,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          height: 22,
          background: "#0d0b1f",
          display: "flex",
          alignItems: "center",
          gap: 6,
          paddingLeft: 12,
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f56" }} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#27c93f" }} />
      </div>

      <div style={{ padding: "20px 22px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          <span>
            Jay Kumar <span style={{ color: "#915EFF" }}>| Portfolio</span>
          </span>
          <div style={{ display: "flex", gap: 12, fontSize: 10, color: "#aaa6c3" }}>
            <span>About</span>
            <span>Work</span>
            <span>Contact</span>
          </div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.25 }}>
          Hi, I'm
          <br />
          <span
            style={{
              background: "linear-gradient(90deg,#915EFF,#c084fc,#60a5fa)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Jay Kumar Choudhary
          </span>
        </div>
        <div style={{ color: "#c4b5fd", fontSize: 12, marginTop: 8 }}>
          Full Stack Developer
        </div>
      </div>
    </div>
  </Html>
);

const ComputerModel = () => (
  <Float speed={1} rotationIntensity={0} floatIntensity={0.25}>
    <group scale={0.92}>
      <RoundedBox args={[1.75, 1.1, 0.09]} radius={0.06} smoothness={4} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#0d0b1f" roughness={0.25} metalness={0.6} />
      </RoundedBox>

      <mesh position={[0, 0.15, 0.045]}>
        <planeGeometry args={[1.55, 0.9]} />
        <meshStandardMaterial color="#050816" roughness={0.15} metalness={0.2} />
      </mesh>

      <ScreenContent />

      <RoundedBox args={[0.1, 0.45, 0.1]} radius={0.03} position={[0, -0.62, 0]}>
        <meshStandardMaterial color="#2a2a45" roughness={0.4} metalness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.06, 0.36]} radius={0.03} position={[0, -0.87, 0]}>
        <meshStandardMaterial color="#2a2a45" roughness={0.4} metalness={0.5} />
      </RoundedBox>

      <RoundedBox args={[1.05, 0.07, 0.36]} radius={0.04} position={[0, -0.9, 0.78]}>
        <meshStandardMaterial color="#161228" roughness={0.55} metalness={0.2} />
      </RoundedBox>
      <mesh position={[0, -0.855, 0.78]}>
        <planeGeometry args={[0.95, 0.28]} />
        <meshStandardMaterial
          color="#915EFF"
          emissive="#915EFF"
          emissiveIntensity={0.3}
          toneMapped={false}
        />
      </mesh>

      <RoundedBox args={[0.17, 0.07, 0.27]} radius={0.07} position={[0.78, -0.89, 0.82]}>
        <meshStandardMaterial color="#161228" roughness={0.5} metalness={0.2} />
      </RoundedBox>

      <RoundedBox args={[0.36, 0.98, 0.52]} radius={0.04} position={[-1.35, -0.5, 0.3]}>
        <meshStandardMaterial color="#0d0b1f" roughness={0.35} metalness={0.55} />
      </RoundedBox>
      <mesh position={[-1.35, -0.5, 0.57]}>
        <boxGeometry args={[0.03, 0.72, 0.02]} />
        <meshStandardMaterial
          color="#915EFF"
          emissive="#915EFF"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>

      <RoundedBox args={[0.23, 0.52, 0.23]} radius={0.05} position={[-0.95, -0.63, 0.72]}>
        <meshStandardMaterial color="#161228" roughness={0.5} metalness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.23, 0.52, 0.23]} radius={0.05} position={[0.95, -0.63, 0.55]}>
        <meshStandardMaterial color="#161228" roughness={0.5} metalness={0.3} />
      </RoundedBox>
    </group>
  </Float>
);

const ComputerSetup = () => {
  const groupRef = useRef();
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: -0.1, y: 0.28 });

  const handlePointerDown = (e) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    rotation.current.y += dx * 0.009;
    rotation.current.x = Math.max(-0.55, Math.min(0.35, rotation.current.x + dy * 0.009));
    lastPos.current = { x: e.clientX, y: e.clientY };
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation.current.y;
      groupRef.current.rotation.x = rotation.current.x;
    }
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
        background: "transparent",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.05, 5.8], fov: 38 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.65} />
          <directionalLight position={[3, 3, 4]} intensity={1.05} />
          <pointLight position={[-3, -1, -2]} intensity={0.5} color="#915EFF" />

          <group
            ref={groupRef}
            rotation={[rotation.current.x, rotation.current.y, 0]}
            position={[0, 0.05, 0]}
          >
            <ComputerModel />
          </group>

          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.3}
            scale={5}
            blur={1.5}
            far={2.5}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ComputerSetup;