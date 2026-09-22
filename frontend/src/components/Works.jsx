import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SolarSystemCanvas from "./canvas/SolarSystem";
import ProjectDetails from "./ProjectDetails";

const PROJECTS = [
  {
    id: 0,
    name: "Banking Management System",
    description: "A full-stack banking application with secure authentication and account management.",
    about: "Banking Management System is a full-stack web application designed to manage banking operations through a modern and responsive interface.",
    tech: [
      { name: "React", color: "#61dafb" },
      { name: "Node.js", color: "#68a063" },
      { name: "Express.js", color: "#f59e0b" },
      { name: "MySQL", color: "#00758f" },
    ],
    features: [
      { icon: "shield", text: "Secure user authentication and authorization" },
      { icon: "user", text: "Customer account management" },
      { icon: "refresh", text: "Banking transaction management" },
      { icon: "shield", text: "Role-based access control" },
      { icon: "code", text: "REST API based backend architecture" },
      { icon: "database", text: "MySQL database integration" },
      { icon: "monitor", text: "Responsive React user interface" },
      { icon: "layers", text: "Clean and scalable project architecture" },
    ],
    source_code_link: "https://github.com/yourusername/banking-management",
    live_demo_link: "#",
    texture: "/textures/earth_atmos_2048.jpg",
  },
  {
    id: 1,
    name: "Smart Munimji",
    description: "Intelligent accounting and business management platform built with the MERN stack.",
    about: "Smart Munimji is a complete business management solution for small businesses.",
    tech: [
      { name: "MongoDB", color: "#47A248" },
      { name: "Express", color: "#f59e0b" },
      { name: "React", color: "#61dafb" },
      { name: "Node.js", color: "#68a063" },
      { name: "Tailwind", color: "#38bdf8" },
    ],
    features: [
      { icon: "user", text: "Client & contact management" },
      { icon: "refresh", text: "Invoice generation & tracking" },
      { icon: "database", text: "Expense tracking system" },
      { icon: "monitor", text: "Beautiful analytics dashboard" },
      { icon: "shield", text: "Secure authentication" },
      { icon: "layers", text: "Clean MERN architecture" },
      { icon: "code", text: "RESTful API design" },
      { icon: "monitor", text: "Fully responsive design" },
    ],
    source_code_link: "https://github.com/yourusername/smart-munimji",
    texture: "/textures/2k_jupiter.jpg",
  },
  {
    id: 2,
    name: "Library Management System",
    description: "Complete library management solution with book tracking and issue/return system.",
    about: "Library Management System helps libraries digitize their operations.",
    tech: [
      { name: "React", color: "#61dafb" },
      { name: "Node.js", color: "#68a063" },
      { name: "MySQL", color: "#00758f" },
    ],
    features: [
      { icon: "database", text: "Book catalog management" },
      { icon: "user", text: "Member management system" },
      { icon: "refresh", text: "Issue & return workflow" },
      { icon: "shield", text: "Fine calculation engine" },
      { icon: "code", text: "Advanced search & filters" },
      { icon: "monitor", text: "Admin dashboard" },
      { icon: "layers", text: "Scalable architecture" },
      { icon: "monitor", text: "Responsive interface" },
    ],
    source_code_link: "https://github.com/yourusername/library-management",
    texture: "/textures/2k_saturn.jpg",
  },
  {
    id: 3,
    name: "YourQuote",
    description: "Share and discover inspiring quotes. Clean React frontend powered by Express backend.",
    about: "YourQuote is a social platform for quote lovers.",
    tech: [
      { name: "React", color: "#61dafb" },
      { name: "Express", color: "#f59e0b" },
    ],
    features: [
      { icon: "user", text: "User profiles & collections" },
      { icon: "refresh", text: "Quote sharing system" },
      { icon: "shield", text: "Like & comment features" },
      { icon: "database", text: "Category based discovery" },
      { icon: "monitor", text: "Clean modern UI" },
      { icon: "code", text: "Express REST API" },
      { icon: "layers", text: "Scalable structure" },
      { icon: "monitor", text: "Mobile friendly design" },
    ],
    source_code_link: "https://github.com/yourusername/yourquote",
    texture: "/textures/2k_mars.jpg",
  },
  {
    id: 4,
    name: "Finlec Task Manager",
    description: "Modern task and project management tool built with full MERN stack.",
    about: "Finlec Task Manager helps teams organize work with boards and deadlines.",
    tech: [
      { name: "MongoDB", color: "#47A248" },
      { name: "Express", color: "#f59e0b" },
      { name: "React", color: "#61dafb" },
      { name: "Node.js", color: "#68a063" },
    ],
    features: [
      { icon: "layers", text: "Kanban style task boards" },
      { icon: "user", text: "Team collaboration tools" },
      { icon: "refresh", text: "Deadlines & reminders" },
      { icon: "monitor", text: "Progress tracking dashboard" },
      { icon: "shield", text: "Role based permissions" },
      { icon: "code", text: "Real-time updates" },
      { icon: "database", text: "MongoDB data layer" },
      { icon: "monitor", text: "Dark mode support" },
    ],
    source_code_link: "https://github.com/yourusername/finlec-task-manager",
    texture: "/textures/2k_venus_surface.jpg",
  },
  {
    id: 5,
    name: "College Management System",
    description: "Comprehensive college administration system covering students, faculty and courses.",
    about: "College Management System digitizes academic administration.",
    tech: [
      { name: "React", color: "#61dafb" },
      { name: "Node.js", color: "#68a063" },
      { name: "MongoDB", color: "#47A248" },
    ],
    features: [
      { icon: "user", text: "Student & faculty portals" },
      { icon: "database", text: "Course registration system" },
      { icon: "refresh", text: "Attendance tracking" },
      { icon: "monitor", text: "Results & report cards" },
      { icon: "shield", text: "Secure role based access" },
      { icon: "code", text: "REST API backend" },
      { icon: "layers", text: "Modular architecture" },
      { icon: "monitor", text: "Responsive design" },
    ],
    source_code_link: "https://github.com/yourusername/college-management",
    texture: "/textures/2k_mercury.jpg",
  },
];

const Works = () => {
  const [selectedId, setSelectedId] = useState(null);

  const selectedProject =
    selectedId !== null
      ? PROJECTS.find((project) => project.id === selectedId)
      : null;

  return (
    <>
      <section
        id="work"
        className="relative w-full pt-16 sm:pt-24 pb-0"
        style={{
          background: "transparent",
          backgroundColor: "transparent",
        }}
      >
        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* ✅ HEADING — no bottom margin */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#915EFF]" />
              <p className="text-[#aaa6c3] text-[11px] uppercase tracking-[0.35em]">
                My Work
              </p>
            </div>

            <h2 className="text-white font-black text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1]">
              Projects Orbiting
              <br />
              <span className="text-[#915EFF]">My Universe</span>
            </h2>

            <p className="mt-5 text-[#aaa6c3] text-sm sm:text-base leading-relaxed max-w-md">
              Each project is a step towards building something meaningful.
            </p>
          </motion.div>

          {/* ✅ SOLAR SYSTEM — heading ke bilkul neeche */}
          <div
            className="relative w-full h-[500px] sm:h-[560px] lg:h-[620px] -mt-8 sm:-mt-12 lg:-mt-16 -mb-12 sm:-mb-16 lg:-mb-20"
            style={{
              background: "transparent",
              backgroundColor: "transparent",
            }}
          >
            {selectedId === null && (
              <SolarSystemCanvas onSelect={setSelectedId} />
            )}

            {selectedId === null && (
              <div className="absolute bottom-6 left-5 sm:left-8 pointer-events-none z-10">
                <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.28em] flex items-center gap-2">
                  <span className="text-base">↺</span>
                  Planets are orbiting
                </p>
                <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.28em] mt-1">
                  Click a planet to explore
                </p>
              </div>
            )}

            {selectedId === null && (
              <div className="absolute bottom-6 right-5 sm:right-8 flex items-center gap-2 z-10">
                {PROJECTS.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    aria-label={`Open ${project.name}`}
                    onClick={() => setSelectedId(project.id)}
                    className="h-2 rounded-full transition-all duration-300 bg-white/25 w-2 hover:bg-white/50"
                  />
                ))}
                <span className="ml-3 text-white/40 text-xs tabular-nums">
                  01 / 06
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onBack={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Works;