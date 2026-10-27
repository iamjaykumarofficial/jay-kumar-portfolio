import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  FiBriefcase,
  FiZap,
  FiAward,
  FiCode,
  FiCalendar,
  FiArrowUpRight,
  FiLayers,
} from "react-icons/fi";

import {
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiJsonwebtokens,
  SiExpress,
  SiMongodb,
  SiGit,
} from "react-icons/si";

/* =========================================================
   EXPERIENCE DATA
========================================================= */

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Smart MunimJi",
    date: "2024 - Present",
    icon: FiBriefcase,
    iconBg: "#915EFF",
    type: "Professional Experience",

    points: [
      "Developing and maintaining scalable web applications using React.js, Node.js and MySQL.",
      "Building GST-ready billing, inventory and business management systems for small businesses.",
      "Implementing JWT authentication, role-based access control and real-time application features.",
      "Contributing to full-stack architecture, REST APIs and database design.",
    ],

    technologies: [
      {
        name: "React.js",
        icon: SiReact,
        color: "#61DAFB",
      },
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "#68A063",
      },
      {
        name: "MySQL",
        icon: SiMysql,
        color: "#00758F",
      },
      {
        name: "JWT",
        icon: SiJsonwebtokens,
        color: "#ffffff",
      },
    ],
  },

  {
    title: "MERN Stack Developer",
    company: "Finlec Task Manager",
    date: "2024",
    icon: FiZap,
    iconBg: "#7C3AED",
    type: "Project Experience",

    points: [
      "Built a complete task management platform with React frontend and Node.js backend.",
      "Implemented authentication, task assignment, user management and real-time updates.",
      "Designed responsive interfaces using Tailwind CSS and modern React patterns.",
      "Integrated REST APIs and database operations for reliable task management.",
    ],

    technologies: [
      {
        name: "React.js",
        icon: SiReact,
        color: "#61DAFB",
      },
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "#68A063",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "#ffffff",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47A248",
      },
    ],
  },

  {
    title: "Full Stack Developer",
    company: "CDAC",
    date: "2023 - 2024",
    icon: FiAward,
    iconBg: "#915EFF",
    type: "Training & Development",

    points: [
      "Developed a Library Management System using Java and MySQL.",
      "Designed application workflows, database structure and core backend functionality.",
      "Won a Gold Medal in the hackathon for the Library Management System project.",
      "Strengthened practical knowledge of full-stack development, teamwork and problem solving.",
    ],

    technologies: [
      {
        name: "Java",
        icon: FiCode,
        color: "#ED8B00",
      },
      {
        name: "MySQL",
        icon: SiMysql,
        color: "#00758F",
      },
      {
        name: "DBMS",
        icon: FiLayers,
        color: "#915EFF",
      },
      {
        name: "Full Stack",
        icon: FiCode,
        color: "#A78BFA",
      },
    ],
  },

  {
    title: "Web Developer",
    company: "Personal Projects",
    date: "2023 - Present",
    icon: FiCode,
    iconBg: "#7C3AED",
    type: "Independent Development",

    points: [
      "Built a Banking Management System with authentication, account management and transaction features.",
      "Created YourQuote, a quote-sharing platform with a modern responsive interface.",
      "Practiced clean architecture, responsive design, reusable components and Git workflows.",
      "Continuously exploring advanced React patterns, Three.js and modern frontend development.",
    ],

    technologies: [
      {
        name: "React.js",
        icon: SiReact,
        color: "#61DAFB",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "#ffffff",
      },
      {
        name: "MySQL",
        icon: SiMysql,
        color: "#00758F",
      },
      {
        name: "Git",
        icon: SiGit,
        color: "#F05032",
      },
    ],
  },
];

/* =========================================================
   TYPEWRITER
   - Text is already visible
   - Hover starts automatic reveal
   - Runs only once
========================================================= */

const TypewriterText = ({ text, start }) => {
  const [count, setCount] = useState(0);

  const timerRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!start || hasPlayedRef.current) {
      return;
    }

    hasPlayedRef.current = true;

    let current = 0;

    const type = () => {
      current += 1;

      setCount(current);

      if (current < text.length) {
        timerRef.current = setTimeout(type, 18);
      }
    };

    timerRef.current = setTimeout(type, 40);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [start, text]);

  return (
    <span className="relative inline">

      {/* Original text always exists */}
      <span className="text-[#aaa6c3]">
        {text}
      </span>

      {/* White typewriter layer */}
      {start && (
        <span className="pointer-events-none absolute left-0 top-0 text-white">
          {text.slice(0, count)}

          {count > 0 && count < text.length && (
            <span className="ml-[2px] inline-block h-[15px] w-[1px] translate-y-[2px] animate-pulse bg-[#915EFF]" />
          )}
        </span>
      )}

    </span>
  );
};

/* =========================================================
   TECHNOLOGY LOGO
========================================================= */

const TechnologyLogo = ({ technology }) => {
  const Icon = technology.icon;

  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.08,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group/tech relative"
      title={technology.name}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-xl opacity-0 blur-lg transition-opacity duration-300 group-hover/tech:opacity-30"
        style={{
          backgroundColor: technology.color,
        }}
      />

      {/* Logo Box */}
      <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0a20]/80 shadow-[0_8px_25px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 group-hover/tech:border-white/20 group-hover/tech:bg-white/[0.06]">

        {/* Shine */}
        <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 group-hover/tech:left-[130%]" />

        <Icon
          className="relative text-[19px] transition-transform duration-300 group-hover/tech:scale-110"
          style={{
            color: technology.color,
            filter: `drop-shadow(0 0 7px ${technology.color}55)`,
          }}
        />
      </div>

      {/* Tooltip */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-30 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-white/10 bg-[#0b0818]/95 px-2 py-1 text-[9px] font-medium text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover/tech:translate-y-0 group-hover/tech:opacity-100">
        {technology.name}
      </div>
    </motion.div>
  );
};

/* =========================================================
   EXPERIENCE CARD
========================================================= */

const ExperienceCard = ({ exp, side }) => {
  const Icon = exp.icon;

  const [typewriterStarted, setTypewriterStarted] =
    useState(false);

  const hasTriggeredRef = useRef(false);

  const xOffset =
    side === "left"
      ? -50
      : side === "right"
        ? 50
        : 0;

  /* =======================================================
     START ONLY ON FIRST HOVER / TOUCH
  ======================================================= */

  const startTypewriter = () => {
    if (hasTriggeredRef.current) {
      return;
    }

    hasTriggeredRef.current = true;
    setTypewriterStarted(true);
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        x: xOffset,
        y: side ? 0 : 25,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      onMouseEnter={startTypewriter}
      onTouchStart={startTypewriter}
      className="group relative"
    >

      {/* Connector */}
      {side && (
        <div
          className={`absolute top-10 hidden h-px w-12 lg:block ${
            side === "left"
              ? "right-[-48px] bg-gradient-to-r from-transparent via-[#915EFF]/40 to-[#915EFF]"
              : "left-[-48px] bg-gradient-to-r from-[#915EFF] via-[#915EFF]/40 to-transparent"
          }`}
        />
      )}

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#15112d]/90 p-6 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#915EFF]/40 group-hover:bg-[#191435] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-7">

        {/* Glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#915EFF]/10 blur-3xl transition-all duration-300 group-hover:bg-[#915EFF]/20" />

        {/* =================================================
            TOP ROW
        ================================================= */}

        <div className="relative flex items-start justify-between gap-4">

          <div className="flex items-start gap-4">

            {/* Experience Icon */}
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10"
              style={{
                background: `linear-gradient(135deg, ${exp.iconBg}, #15112d)`,
                boxShadow: `0 8px 25px ${exp.iconBg}30`,
              }}
            >
              <Icon className="text-lg text-white" />
            </div>

            {/* Title */}
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#915EFF]">
                {exp.type}
              </p>

              <h3 className="text-[18px] font-bold leading-tight text-white sm:text-[20px]">
                {exp.title}
              </h3>

              <p className="mt-1 text-[13px] font-medium text-[#aaa6c3] sm:text-[14px]">
                {exp.company}
              </p>
            </div>

          </div>

          {/* Desktop Date */}
          <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 md:flex">

            <FiCalendar className="text-xs text-[#915EFF]" />

            <span className="text-[11px] font-medium text-[#aaa6c3]">
              {exp.date}
            </span>

          </div>

        </div>

        {/* Mobile Date */}
        <div className="mt-4 flex items-center gap-2 md:hidden">

          <FiCalendar className="text-xs text-[#915EFF]" />

          <span className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">
            {exp.date}
          </span>

        </div>

        {/* Divider */}
        <div className="relative my-5 h-px bg-gradient-to-r from-white/10 via-white/[0.04] to-transparent" />

        {/* =================================================
            EXPERIENCE TEXT
        ================================================= */}

        <ul className="relative space-y-3">

          {exp.points.map((point, index) => (
            <li
              key={index}
              className="flex gap-3 text-[13px] leading-[1.65] sm:text-[14px]"
            >

              {/* Bullet */}
              <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#915EFF] shadow-[0_0_8px_rgba(145,94,255,0.8)]" />

              {/* Typewriter */}
              <TypewriterText
                text={point}
                start={typewriterStarted}
              />

            </li>
          ))}

        </ul>

        {/* =================================================
            TECHNOLOGY LOGOS
        ================================================= */}

        <div className="relative mt-7 flex flex-wrap items-center gap-3">

          {exp.technologies.map((technology) => (
            <TechnologyLogo
              key={technology.name}
              technology={technology}
            />
          ))}

        </div>

        {/* Arrow */}
        <div className="absolute bottom-5 right-5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100">

          <FiArrowUpRight className="text-lg text-[#915EFF]" />

        </div>

      </div>
    </motion.article>
  );
};

/* =========================================================
   EXPERIENCE SECTION
========================================================= */

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden py-24 sm:py-28"
    >

      <div className="section-container">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="relative left-150 mb-16 w-screen -translate-x-1/2 sm:mb-20">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
            className="flex w-full flex-col items-center justify-center px-5 text-center"
          >

            <div className="mb-4 flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#915EFF]/60" />

              <p className="whitespace-nowrap text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#915EFF] sm:text-[12px]">
                My professional journey
              </p>

              <span className="h-px w-8 bg-[#915EFF]/60" />

            </div>

            <h2 className="text-center text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
              Work Experience
              <span className="text-[#915EFF]">.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-center text-[13px] leading-7 text-[#aaa6c3] sm:text-[14px]">
              A timeline of my development journey, projects, technical
              experience and the technologies I have worked with along the way.
            </p>

          </motion.div>

        </div>

        {/* ===================================================
            DESKTOP TIMELINE
        =================================================== */}

        <div className="relative hidden md:block">

          {/* Timeline */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#915EFF]/35 to-transparent" />

          <div className="space-y-16 lg:space-y-20">

            {experiences.map((exp, index) => {

              const isLeft = index % 2 === 0;
              const Icon = exp.icon;

              return (
                <div
                  key={`${exp.company}-${exp.title}`}
                  className="relative grid grid-cols-[1fr_100px_1fr] items-center gap-8 lg:gap-12"
                >

                  {/* LEFT */}
                  <div>

                    {isLeft ? (
                      <ExperienceCard
                        exp={exp}
                        side="left"
                      />
                    ) : (
                      <div className="flex justify-end pr-8 lg:pr-12">

                        <div className="text-right">

                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#915EFF]">
                            Project
                          </p>

                          <p className="mt-2 text-sm font-medium text-[#aaa6c3]">
                            {exp.date}
                          </p>

                        </div>

                      </div>
                    )}

                  </div>

                  {/* CENTER NODE */}
                  <div className="relative flex items-center justify-center">

                    <div className="absolute h-16 w-16 rounded-full bg-[#915EFF]/10 blur-xl" />

                    <div
                      className="relative flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#050816] shadow-[0_0_0_2px_rgba(145,94,255,0.45),0_0_25px_rgba(145,94,255,0.2)]"
                      style={{
                        background: `linear-gradient(135deg, ${exp.iconBg}, #211a42)`,
                      }}
                    >

                      <Icon className="text-[17px] text-white" />

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div>

                    {!isLeft ? (
                      <ExperienceCard
                        exp={exp}
                        side="right"
                      />
                    ) : (
                      <div className="flex justify-start pl-8 lg:pl-12">

                        <div>

                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#915EFF]">
                            {index === 0
                              ? "Current"
                              : "Experience"}
                          </p>

                          <p className="mt-2 text-sm font-medium text-[#aaa6c3]">
                            {exp.date}
                          </p>

                        </div>

                      </div>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* ===================================================
            MOBILE TIMELINE
        =================================================== */}

        <div className="md:hidden">

          <div className="relative">

            {/* Timeline */}
            <div className="absolute bottom-8 left-[23px] top-8 w-px bg-gradient-to-b from-[#915EFF]/60 via-[#915EFF]/25 to-transparent" />

            <div className="space-y-8">

              {experiences.map((exp) => {

                const Icon = exp.icon;

                return (
                  <div
                    key={`${exp.company}-${exp.title}`}
                    className="relative flex gap-5"
                  >

                    {/* Node */}
                    <div className="relative z-10 shrink-0">

                      <div className="absolute inset-[-7px] rounded-full bg-[#915EFF]/10 blur-md" />

                      <div
                        className="relative flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#050816] shadow-[0_0_0_1px_rgba(145,94,255,0.4)]"
                        style={{
                          background: `linear-gradient(135deg, ${exp.iconBg}, #211a42)`,
                        }}
                      >

                        <Icon className="text-base text-white" />

                      </div>

                    </div>

                    {/* Card */}
                    <div className="min-w-0 flex-1">

                      <ExperienceCard
                        exp={exp}
                        side={null}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Experience;