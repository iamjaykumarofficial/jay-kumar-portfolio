import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiThreedotjs,
  SiGit,
  SiDocker,
} from "react-icons/si";
import TechBall from "./canvas/TechBall";

const technologies = [
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Redux", Icon: SiRedux, color: "#764ABC" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#A78BFA" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
];

const Tech = () => (
  <section className="section-container relative w-full py-32 bg-[#050816]">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >
      <p className="text-[#915EFF] text-lg font-medium mb-2">What I work with</p>
      <h2 className="text-white font-black text-4xl sm:text-5xl">Tech Stack.</h2>
    </motion.div>

    <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-10">
      {technologies.map((tech, i) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          viewport={{ once: true }}
          className="w-24 sm:w-28 flex flex-col items-center"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28">
            <TechBall color={tech.color} Icon={tech.Icon} />
          </div>
          <span className="text-[11px] sm:text-xs text-[#aaa6c3] font-medium text-center mt-1">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Tech;