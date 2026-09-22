import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  RoundedBox,
  ContactShadows,
  Html,
} from "@react-three/drei";

const ScreenContent = () => (
  <Html
    transform
    occlude={false}
    position={[0, 0.15, 0.052]}
    scale={0.1}
    style={{ pointerEvents: "none" }}
  >
    <style>{`
      @keyframes screenAutoScroll {
        0%   { transform: translateY(0); }
        45%  { transform: translateY(-50%); }
        50%  { transform: translateY(-50%); }
        95%  { transform: translateY(0); }
        100% { transform: translateY(0); }
      }
    `}</style>
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

      <div style={{ animation: "screenAutoScroll 16s ease-in-out infinite" }}>
        {[0, 1].map((rep) => (
          <div key={rep}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 20px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <span>
                Jay Kumar <span style={{ color: "#915EFF" }}>| Portfolio</span>
              </span>
              <div style={{ display: "flex", gap: 12, fontSize: 10, color: "#aaa6c3" }}>
                <span>About</span>
                <span>Experience</span>
                <span>Work</span>
                <span>Contact</span>
              </div>
            </div>

            <div style={{ padding: "24px 20px" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
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
              <div style={{ color: "#c4b5fd", fontSize: 12, marginTop: 6 }}>
                Full Stack Developer
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, padding: "6px 20px 24px" }}>
              {["💻", "⚛️", "🔧", "🎨"].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    background: "#151030",
                    border: "1px solid #ffffff22",
                    borderRadius: 10,
                    padding: 12,
                    flex: 1,
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Html>
);

const ComputerModel = () => (
  <Float speed={1.2} rotationIntensity={0} floatIntensity={0.45}>
    <group scale={0.92}>
      <RoundedBox
        args={[1.75, 1.1, 0.09]}
        radius={0.06}
        smoothness={4}
        position={[0, 0.15, 0]}
      >
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
          emissiveIntensity={0.35}
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
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-1.35, -0.75, 0.57]}>
        <torusGeometry args={[0.12, 0.015, 16, 32]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={1.2}
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
  const [ctxKey, setCtxKey] = useState(0);

  // Context lost hone par soft remount (black bg nahi)
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setCtxKey((k) => k + 1);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

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
    rotation.current.x = Math.max(
      -0.6,
      Math.min(0.4, rotation.current.x + dy * 0.009)
    );
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
        key={ctxKey}
        camera={{ position: [0, 0.05, 5.8], fov: 38 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          premultipliedAlpha: false,
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // fully transparent
          const canvas = gl.domElement;
          const onLost = (e) => {
            e.preventDefault();
            console.warn("WebGL context lost — remounting computer...");
            setTimeout(() => setCtxKey((k) => k + 1), 400);
          };
          canvas.addEventListener("webglcontextlost", onLost, false);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.65} />
          <directionalLight position={[3, 3, 4]} intensity={1.15} />
          <pointLight position={[-3, -1, -2]} intensity={0.7} color="#915EFF" />
          <pointLight position={[3, 2, -1]} intensity={0.5} color="#60a5fa" />

          <group
            ref={groupRef}
            rotation={[rotation.current.x, rotation.current.y, 0]}
            position={[0, 0.05, 0]}
          >
            <ComputerModel />
          </group>

          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
            far={2.5}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ComputerSetup;