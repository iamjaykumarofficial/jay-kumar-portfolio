import { motion } from "framer-motion";
import LoaderBubbles from "./canvas/LoaderBubbles";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050816] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Real 3D distorted spheres flying in from the edges */}
      <LoaderBubbles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative flex flex-col items-center px-6 text-center z-10"
      >
        <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] via-[#c084fc] to-[#60a5fa] tracking-wide">
          JAY KUMAR
        </h1>
        <p className="text-[#aaa6c3] text-base sm:text-lg mt-3 tracking-[0.3em] uppercase">
          Full Stack Developer
        </p>

        <div className="w-56 sm:w-72 h-[3px] bg-white/10 rounded-full mt-10 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[#915EFF] to-[#60a5fa] rounded-full"
          />
        </div>

        <p className="text-[#6b7280] text-xs sm:text-sm mt-4 tracking-wide">
          Initializing Portfolio...
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;