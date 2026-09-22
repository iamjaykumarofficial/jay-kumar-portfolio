import { motion } from "framer-motion";
import ComputerSetup from "./canvas/ComputerSetup";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Soft Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Computer - right side */}
      {/* 3D Computer - right side - wider so full model dikhe */}
      <div className="absolute right-0 sm:right-2 lg:right-8 bottom-0 w-full sm:w-[540px] lg:w-[620px] h-[400px] sm:h-[470px] lg:h-[540px] z-[5] bg-transparent">
  <ComputerSetup />
</div>

      {/* Text Content */}
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-6 flex flex-row items-start gap-5 z-10 pointer-events-none">
        {/* Left purple line + dot */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF] shadow-[0_0_25px_#915EFF]" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915EFF] to-transparent" />
        </div>

        {/* Text */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-black text-white text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.15]"
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] via-[#c084fc] to-[#60a5fa]">
              Jay Kumar Choudhary
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#c4b5fd] font-medium text-[18px] sm:text-[22px] mt-4"
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[#a78bfa]/80 text-[15px] sm:text-[16px] mt-3 max-w-md leading-relaxed"
          >
            Building modern, scalable & beautiful web applications with React,
            Node.js & Three.js
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4 pointer-events-auto"
          >
            <a
              href="#work"
              className="px-7 py-3 rounded-full bg-[#915EFF] text-white font-semibold hover:bg-[#7c3aed] transition-all duration-300 shadow-[0_0_25px_rgba(145,94,255,0.45)]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-full border border-[#915EFF]/50 text-white font-semibold hover:bg-[#915EFF]/10 transition-all duration-300"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 w-full flex justify-center z-10">
        <a href="#about">
          <div className="w-[26px] h-[46px] rounded-3xl border-2 border-[#915EFF]/40 flex justify-center items-start p-1.5">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#915EFF]"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;