import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   LOCAL TEXTURES
========================================================= */

const TEXTURES = {
  earth: "/textures/earth_atmos_2048.jpg",
  jupiter: "/textures/2k_jupiter.jpg",
  mars: "/textures/2k_mars.jpg",
  mercury: "/textures/2k_mercury.jpg",
  saturn: "/textures/2k_saturn.jpg",
  venus: "/textures/2k_venus_surface.jpg",
  sun: "/textures/2k_sun.jpg",
};

/* =========================================================
   PLANET CONFIG — compact
========================================================= */

const INNER_ORBIT = 9;
const OUTER_ORBIT = 14;
const ORBIT_SPEED = 0.1;

const PLANET_CONFIG = [
  {
    id: 0,
    name: "Banking Management System",
    type: "earth",
    size: 1.3,
    distance: INNER_ORBIT,
    startAngle: 0,
    orbitSpeed: ORBIT_SPEED * 1.15,
    spinSpeed: 0.34,
    textureKey: "earth",
    labelColor: "#60a5fa",
  },
  {
    id: 1,
    name: "Smart Munimji",
    type: "jupiter",
    size: 1.75,
    distance: INNER_ORBIT,
    startAngle: (Math.PI * 2) / 3,
    orbitSpeed: ORBIT_SPEED * 1.15,
    spinSpeed: 0.25,
    textureKey: "jupiter",
    labelColor: "#fbbf24",
  },
  {
    id: 2,
    name: "Library Management System",
    type: "saturn",
    size: 1.55,
    distance: INNER_ORBIT,
    startAngle: (Math.PI * 4) / 3,
    orbitSpeed: ORBIT_SPEED * 1.15,
    spinSpeed: 0.22,
    textureKey: "saturn",
    labelColor: "#e2c48d",
  },
  {
    id: 3,
    name: "YourQuote",
    type: "mars",
    size: 1.25,
    distance: OUTER_ORBIT,
    startAngle: (Math.PI * 2) / 6,
    orbitSpeed: ORBIT_SPEED * 0.85,
    spinSpeed: 0.3,
    textureKey: "mars",
    labelColor: "#fb923c",
  },
  {
    id: 4,
    name: "Finlec Task Manager",
    type: "venus",
    size: 1.4,
    distance: OUTER_ORBIT,
    startAngle: (Math.PI * 5) / 6,
    orbitSpeed: ORBIT_SPEED * 0.85,
    spinSpeed: 0.21,
    textureKey: "venus",
    labelColor: "#fcd34d",
  },
  {
    id: 5,
    name: "College Management System",
    type: "mercury",
    size: 1.2,
    distance: OUTER_ORBIT,
    startAngle: (Math.PI * 3) / 2,
    orbitSpeed: ORBIT_SPEED * 0.85,
    spinSpeed: 0.24,
    textureKey: "mercury",
    labelColor: "#cbd5e1",
  },
];

/* =========================================================
   VISUAL CONFIG
========================================================= */

const VISUALS = {
  earth: { color: "#ffffff" },
  jupiter: { color: "#ffffff" },
  saturn: { color: "#ffffff" },
  mars: { color: "#ffffff" },
  venus: { color: "#fff6dd" },
  mercury: { color: "#ffffff" },
};

/* =========================================================
   ORBIT RING
========================================================= */

const OrbitRing = ({ radius }) => {
  const points = useMemo(() => {
    const result = [];
    const segments = 256;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      result.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        )
      );
    }
    return result;
  }, [radius]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line geometry={geometry} raycast={() => null}>
      <lineBasicMaterial color="#915EFF" transparent opacity={0.15} />
    </line>
  );
};

/* =========================================================
   SATURN RINGS
========================================================= */

const SaturnRings = ({ size }) => (
  <group rotation={[Math.PI / 2.45, 0.08, 0.18]} raycast={() => null}>
    <mesh>
      <ringGeometry args={[size * 1.35, size * 2.05, 128]} />
      <meshStandardMaterial
        color="#d8bd91"
        transparent
        opacity={0.78}
        side={THREE.DoubleSide}
        roughness={0.9}
      />
    </mesh>
    <mesh>
      <ringGeometry args={[size * 1.58, size * 1.72, 128]} />
      <meshStandardMaterial
        color="#806846"
        transparent
        opacity={0.62}
        side={THREE.DoubleSide}
        roughness={0.95}
      />
    </mesh>
    <mesh>
      <ringGeometry args={[size * 1.77, size * 1.9, 128]} />
      <meshStandardMaterial
        color="#c5a978"
        transparent
        opacity={0.45}
        side={THREE.DoubleSide}
        roughness={1}
      />
    </mesh>
  </group>
);

/* =========================================================
   SUN
========================================================= */

const Sun = () => {
  const sunRef = useRef();
  const sunTexture = useTexture(TEXTURES.sun);

  useFrame((_, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group>
      <Sphere ref={sunRef} args={[1.8, 96, 96]} raycast={() => null}>
        <meshBasicMaterial map={sunTexture} toneMapped={false} />
      </Sphere>

      <Sphere args={[2.1, 64, 64]} raycast={() => null}>
        <meshBasicMaterial
          color="#ff7a18"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      <Sphere args={[2.6, 64, 64]} raycast={() => null}>
        <meshBasicMaterial
          color="#ffb347"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      <Sphere args={[3.1, 48, 48]} raycast={() => null}>
        <meshBasicMaterial
          color="#ffcc88"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      <pointLight intensity={12} distance={120} decay={1.5} color="#ffb45b" />
      <pointLight intensity={5} distance={70} decay={1.7} color="#fff0c2" />
    </group>
  );
};

/* =========================================================
   PLANET
========================================================= */

const Planet = ({ config, texture, onSelect }) => {
  const groupRef = useRef();
  const planetRef = useRef();

  const angle = useRef(config.startAngle);
  const visual = VISUALS[config.type] || VISUALS.earth;

  useFrame((_, delta) => {
    angle.current += config.orbitSpeed * delta;

    const x = Math.cos(angle.current) * config.distance;
    const z = Math.sin(angle.current) * config.distance;

    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += delta * config.spinSpeed;
    }
  });

  const handleSelect = (event) => {
    event.stopPropagation();
    onSelect(config.id);
  };

  return (
    <group ref={groupRef}>
      <Sphere
        ref={planetRef}
        args={[config.size, 96, 96]}
        onClick={handleSelect}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <meshStandardMaterial
          map={texture}
          color={visual.color}
          roughness={0.9}
          metalness={0}
        />
      </Sphere>

      {config.type === "saturn" && <SaturnRings size={config.size} />}

      <Html
        position={[0, config.size + 0.8, 0]}
        center
        distanceFactor={12}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div className="text-center whitespace-nowrap">
          <p
            className="text-[11px] sm:text-sm font-bold tracking-[0.2em]"
            style={{ color: config.labelColor }}
          >
            {String(config.id + 1).padStart(2, "0")}
          </p>
          <p className="text-white text-sm sm:text-base font-semibold mt-0.5 drop-shadow-lg">
            {config.name}
          </p>
        </div>
      </Html>
    </group>
  );
};

/* =========================================================
   SCENE
========================================================= */

const SolarSystemScene = ({ onSelect }) => {
  const textures = useTexture([
    TEXTURES.earth,
    TEXTURES.jupiter,
    TEXTURES.mars,
    TEXTURES.mercury,
    TEXTURES.saturn,
    TEXTURES.venus,
  ]);

  const textureMap = {
    earth: textures[0],
    jupiter: textures[1],
    mars: textures[2],
    mercury: textures[3],
    saturn: textures[4],
    venus: textures[5],
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[12, 18, 12]} intensity={2.2} />
      <directionalLight position={[-12, 6, -12]} intensity={0.35} />

      <Sun />

      <Stars
        radius={110}
        depth={90}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.22}
      />

      <OrbitRing radius={INNER_ORBIT} />
      <OrbitRing radius={OUTER_ORBIT} />

      {PLANET_CONFIG.map((planet) => (
        <Planet
          key={planet.id}
          config={planet}
          texture={textureMap[planet.textureKey]}
          onSelect={onSelect}
        />
      ))}
    </>
  );
};

/* =========================================================
   CANVAS — camera PAAS, tight fit
========================================================= */

const SolarSystemCanvas = ({ onSelect }) => {
  return (
    <div
      className="solar-system-canvas absolute inset-0 w-full h-full"
      style={{
        background: "transparent",
        backgroundColor: "transparent",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 15, 24],       // ✅ PAAS — gap khatam
          fov: 55,
          near: 0.1,
          far: 350,
        }}
        style={{
          background: "transparent",
          backgroundColor: "transparent",
          width: "100%",
          height: "100%",
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
          scene.background = null;
        }}
      >
        <Suspense fallback={null}>
          <SolarSystemScene onSelect={onSelect} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SolarSystemCanvas;
export { PLANET_CONFIG, TEXTURES };