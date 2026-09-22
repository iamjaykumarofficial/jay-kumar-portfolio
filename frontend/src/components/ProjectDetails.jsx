import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const FALLBACK_TEXTURE = "/textures/earth_atmos_2048.jpg";

/* =========================================================
   DETAIL PLANET — bigger
========================================================= */

const DetailPlanet = ({ texture }) => {
  const planetRef = useRef();
  const colorMap = useTexture(texture || FALLBACK_TEXTURE);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group>
      <Sphere ref={planetRef} args={[2.5, 128, 128]}>
        <meshStandardMaterial
          map={colorMap}
          metalness={0}
          roughness={0.86}
          toneMapped
        />
      </Sphere>

      <Sphere args={[2.65, 64, 64]} raycast={() => null}>
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      <Sphere args={[2.95, 48, 48]} raycast={() => null}>
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      <mesh rotation={[Math.PI / 3, 0.3, 0.5]} raycast={() => null}>
        <torusGeometry args={[3.25, 0.008, 8, 120]} />
        <meshBasicMaterial
          color="#915EFF"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

const DetailPlanetCanvas = ({ texture }) => (
  <div className="absolute inset-0">
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.3, 8.8], fov: 42, near: 0.1, far: 100 }}
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
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 5, 7]} intensity={2.6} />
        <directionalLight position={[-5, 2, -4]} intensity={0.6} color="#93c5fd" />
        <pointLight position={[3, 2, 5]} intensity={1.2} color="#a78bfa" />

        <Stars
          radius={70}
          depth={50}
          count={1800}
          factor={3}
          saturation={0}
          fade
          speed={0.25}
        />

        <DetailPlanet texture={texture} />
      </Suspense>
    </Canvas>
  </div>
);

/* =========================================================
   FEATURE ICON
========================================================= */

const FeatureIcon = ({ type }) => {
  const icons = {
    shield: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    user: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    refresh: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" /><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>),
    code: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
    database: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>),
    monitor: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>),
    layers: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>),
  };
  return icons[type] || icons.shield;
};

/* =========================================================
   PROJECT DETAILS
========================================================= */

const ProjectDetails = ({ project, onBack }) => {
  if (!project) return null;

  const features = Array.isArray(project.features) ? project.features : [];
  const tech = Array.isArray(project.tech) ? project.tech : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#050816]/95 backdrop-blur-2xl"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-[#7c3aed]/12 blur-[160px]" />
        <div className="absolute bottom-[-5%] right-[15%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition mb-10 group"
        >
          <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#915EFF]/50 group-hover:bg-[#915EFF]/10 transition">
            ←
          </span>
          <span className="text-sm">Back to Projects</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-[420px] sm:h-[500px] lg:h-[540px] w-full"
          >
            <DetailPlanetCanvas texture={project.texture} />
            <p className="absolute bottom-4 left-4 text-white/40 text-xs tracking-[0.3em] uppercase pointer-events-none">
              Project / {String(project.id + 1).padStart(2, "0")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#915EFF] text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              Featured Project
              <span className="w-10 h-[1px] bg-[#915EFF]/50" />
            </p>

            <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.1] mb-5">
              {project.name.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#915EFF]">
                {project.name.split(" ").slice(-1)}
              </span>
            </h1>

            <p className="text-[#aaa6c3] text-base leading-relaxed mb-8 max-w-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {tech.map((item) => (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/80"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#915EFF] hover:bg-[#7c3aed] text-white font-semibold text-sm transition shadow-[0_8px_30px_rgba(145,94,255,0.35)]"
              >
                View Source Code
              </a>
              {project.live_demo_link && project.live_demo_link !== "#" && (
                <a
                  href={project.live_demo_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/30 bg-white/[0.03] text-white font-semibold text-sm transition"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-[#915EFF] text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              01
              <span className="w-8 h-[1px] bg-[#915EFF]/40" />
            </p>
            <h2 className="text-white font-bold text-2xl mb-5">About the Project</h2>
            <p className="text-[#aaa6c3] text-sm leading-relaxed">{project.about}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-[#915EFF] text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              02
              <span className="w-8 h-[1px] bg-[#915EFF]/40" />
            </p>
            <h2 className="text-white font-bold text-2xl mb-6">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={`${feature.text}-${index}`} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#915EFF]/15 border border-[#915EFF]/25 flex items-center justify-center text-[#915EFF] shrink-0">
                    <FeatureIcon type={feature.icon} />
                  </div>
                  <p className="text-[#c7c4d8] text-sm leading-snug pt-1.5">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0f0a1e]/70 to-[#0a0a18]/70 backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="text-[#915EFF] text-[10px] uppercase tracking-[0.3em] mb-2">
              Explore More
            </p>
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-1">
              Interested in this <span className="text-[#915EFF]">project</span>?
            </h3>
            <p className="text-[#aaa6c3] text-sm">
              Check out the source code and explore how this project was designed and developed.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#915EFF] hover:bg-[#7c3aed] text-white font-semibold text-sm transition"
            >
              GitHub Repository
            </a>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 hover:border-white/30 text-white font-semibold text-sm transition"
            >
              ← Back to Work
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;