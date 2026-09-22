import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import * as THREE from "three";


/* =========================================================
   NORMAL PLANET
========================================================= */

const NormalPlanet = ({
  texture,
  autoRotate = true,
  speed = 0.2,
}) => {
  const planetRef = useRef();

  const planetTexture = useTexture(texture);

  useFrame((state, delta) => {
    if (planetRef.current && autoRotate) {
      planetRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <mesh ref={planetRef}>

      <sphereGeometry args={[1.5, 64, 64]} />

      <meshStandardMaterial
        map={planetTexture}
        roughness={0.75}
        metalness={0.05}
      />

    </mesh>
  );
};


/* =========================================================
   SUN
========================================================= */

const SunPlanet = ({
  texture,
}) => {
  const planetRef = useRef();

  const planetTexture = useTexture(texture);

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={planetRef}>

      {/* SUN */}

      <mesh>

        <sphereGeometry args={[1.55, 64, 64]} />

        <meshStandardMaterial
          map={planetTexture}
          emissive="#ff4500"
          emissiveMap={planetTexture}
          emissiveIntensity={1.3}
          roughness={0.7}
        />

      </mesh>


      {/* OUTER GLOW */}

      <mesh scale={1.08}>

        <sphereGeometry args={[1.55, 64, 64]} />

        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />

      </mesh>

    </group>
  );
};


/* =========================================================
   SATURN
========================================================= */

const SaturnPlanet = ({
  texture,
}) => {
  const groupRef = useRef();

  const planetTexture = useTexture(texture);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.15, 0, 0]}
    >

      {/* SATURN BODY */}

      <mesh>

        <sphereGeometry args={[1.35, 64, 64]} />

        <meshStandardMaterial
          map={planetTexture}
          roughness={0.8}
          metalness={0}
        />

      </mesh>


      {/* SATURN RINGS */}

      <mesh
        rotation={[
          Math.PI / 2.35,
          0,
          0.15,
        ]}
      >

        <ringGeometry
          args={[
            1.65,
            2.45,
            128,
          ]}
        />

        <meshStandardMaterial
          color="#d8c49a"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          roughness={0.85}
        />

      </mesh>


      {/* INNER RING */}

      <mesh
        rotation={[
          Math.PI / 2.35,
          0,
          0.15,
        ]}
      >

        <ringGeometry
          args={[
            1.45,
            1.62,
            128,
          ]}
        />

        <meshStandardMaterial
          color="#8d7655"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />

      </mesh>

    </group>
  );
};


/* =========================================================
   MAIN MODEL
========================================================= */

const PlanetModel = ({
  texture,
  type,
}) => {

  if (type === "sun") {
    return (
      <SunPlanet
        texture={texture}
      />
    );
  }


  if (type === "saturn") {
    return (
      <SaturnPlanet
        texture={texture}
      />
    );
  }


  return (
    <NormalPlanet
      texture={texture}
    />
  );
};


/* =========================================================
   PLANET CANVAS
========================================================= */

const PlanetCanvas = ({
  texture,
  type = "planet",
}) => {

  return (

    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}

      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      }}

      dpr={[1, 2]}
    >

      <Suspense fallback={null}>


        {/* AMBIENT LIGHT */}

        <ambientLight
          intensity={0.45}
        />


        {/* MAIN LIGHT */}

        <directionalLight
          position={[5, 5, 5]}
          intensity={2.5}
        />


        {/* LEFT LIGHT */}

        <pointLight
          position={[-4, 2, 3]}
          intensity={1.5}
          color="#ffffff"
        />


        {/* BLUE SPACE LIGHT */}

        <pointLight
          position={[-3, -2, 2]}
          intensity={0.5}
          color="#6d5dfc"
        />


        {/* SUN EXTRA LIGHT */}

        {type === "sun" && (
          <pointLight
            color="#ff5500"
            intensity={3}
            distance={10}
          />
        )}


        {/* PLANET */}

        <PlanetModel
          texture={texture}
          type={type}
        />


        {/* MOUSE ROTATION */}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />


      </Suspense>


      <Preload all />

    </Canvas>

  );
};


export default PlanetCanvas;