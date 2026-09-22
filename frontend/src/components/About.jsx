import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import { useEffect, useRef, useState } from "react";

import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaCode,
  FaLayerGroup,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { SiThreedotjs } from "react-icons/si";


/* =========================================================
   SKILLS DATA
========================================================= */

const services = [
  {
    title: "Web Developer",
    label: "Frontend Development",
    description:
      "I build fast, responsive and modern websites with clean layouts and smooth user experiences.",
    Icon: FaCode,
    color: "#915EFF",
    number: "01",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "React Developer",
    label: "Frontend Engineering",
    description:
      "I build dynamic and scalable interfaces using React, reusable components and modern frontend architecture.",
    Icon: FaReact,
    color: "#61DAFB",
    number: "02",
    tags: ["React", "Redux", "Hooks"],
  },
  {
    title: "Backend Developer",
    label: "Backend Engineering",
    description:
      "I develop secure APIs, authentication systems and scalable backend applications.",
    Icon: FaNodeJs,
    color: "#68A063",
    number: "03",
    tags: ["Node.js", "Express", "REST API"],
  },
  {
    title: "UI / UX Designer",
    label: "Creative Design",
    description:
      "I design modern and intuitive interfaces focused on usability and beautiful experiences.",
    Icon: FaFigma,
    color: "#F24E1E",
    number: "04",
    tags: ["Figma", "UI Design", "UX"],
  },
  {
    title: "3D Creator",
    label: "Creative Development",
    description:
      "I create immersive digital experiences using 3D graphics and interactive animations.",
    Icon: SiThreedotjs,
    color: "#A78BFA",
    number: "05",
    tags: ["Three.js", "3D", "Animation"],
  },
  {
    title: "Full Stack Developer",
    label: "Full Stack Engineering",
    description:
      "I build complete applications from beautiful frontend interfaces to powerful backend systems.",
    Icon: FaLayerGroup,
    color: "#FBBF24",
    number: "06",
    tags: ["MERN", "MySQL", "APIs"],
  },
];


/* =========================================================
   COMPACT SKILL CARD
========================================================= */

const SkillCard = ({ service, isActive }) => {
  const SkillIcon = service.Icon;

  return (
    <motion.div
      whileHover={
        isActive
          ? {
              y: -5,
              scale: 1.02,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 20,
      }}
      className="
        relative
        w-full
        h-[270px]
        sm:h-[300px]
        md:h-[320px]
        overflow-hidden
        rounded-[22px]
        bg-[#0b0914]
        border
        border-white/[0.10]
        shadow-[0_18px_50px_rgba(0,0,0,0.70)]
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 50% 35%,
                ${service.color}38,
                transparent 34%
              ),
              radial-gradient(
                circle at 10% 0%,
                ${service.color}20,
                transparent 45%
              ),
              linear-gradient(
                145deg,
                #211a35,
                #090812 68%
              )
            `,
          }}
        />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
          }}
        />

        {/* BACKGROUND NUMBER */}
        <div
          className="
            absolute
            -right-2
            -top-6
            text-[110px]
            sm:text-[140px]
            font-black
            leading-none
            text-white/[0.025]
            select-none
            pointer-events-none
          "
        >
          {service.number}
        </div>

        {/* ACTIVE GLOW */}
        {isActive && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-1/2
              top-[42%]
              -translate-x-1/2
              -translate-y-1/2
              w-[150px]
              h-[150px]
              sm:w-[190px]
              sm:h-[190px]
              rounded-full
              blur-[65px]
            "
            style={{
              background: service.color,
            }}
          />
        )}

        {/* HUGE LOGO */}
        <motion.div
          animate={
            isActive
              ? {
                  y: [0, -5, 0],
                  scale: [1, 1.04, 1],
                  rotate: [0, 2, 0, -2, 0],
                }
              : {}
          }
          transition={{
            duration: 5,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            pb-2
            pointer-events-none
          "
        >
          <SkillIcon
            className="
              text-[125px]
              sm:text-[165px]
              md:text-[185px]
              opacity-90
            "
            style={{
              color: service.color,
              filter: `
                drop-shadow(0 0 12px ${service.color})
                drop-shadow(0 0 35px ${service.color}70)
              `,
            }}
          />
        </motion.div>

        {/* TOP OVERLAY */}
        <div
          className="
            absolute
            z-20
            top-0
            left-0
            right-0
            h-[27%]
            bg-gradient-to-b
            from-black/70
            via-black/20
            to-transparent
          "
        />

        {/* BOTTOM OVERLAY */}
        <div
          className="
            absolute
            z-20
            left-0
            right-0
            bottom-0
            h-[62%]
            bg-gradient-to-t
            from-[#050509]
            via-[#050509]/95
            to-transparent
          "
        />
      </div>


      {/* CARD CONTENT */}
      <div
        className="
          absolute
          z-30
          inset-0
          p-3
          sm:p-4
          flex
          flex-col
          justify-between
        "
      >
        {/* TOP */}
        <div className="flex items-center justify-between gap-2">

          <div
            className="
              px-2
              py-1
              rounded-full
              bg-black/35
              backdrop-blur-xl
              border
              border-white/[0.12]
              text-[6px]
              sm:text-[8px]
              uppercase
              tracking-[0.08em]
              text-white/70
              whitespace-nowrap
              overflow-hidden
              text-ellipsis
              max-w-[150px]
            "
          >
            {service.label}
          </div>

          <span
            className="
              text-[9px]
              sm:text-[11px]
              font-semibold
              tracking-[0.15em]
            "
            style={{
              color: service.color,
            }}
          >
            {service.number}
          </span>

        </div>


        {/* BOTTOM CONTENT */}
        <div>

          {/* TITLE */}
          <div className="flex items-center gap-1.5 mb-1">

            <h3
              className="
                text-white
                text-[15px]
                sm:text-[19px]
                font-bold
                tracking-tight
              "
            >
              {service.title}
            </h3>

            <FaCheckCircle
              className="text-[11px] sm:text-sm flex-shrink-0"
              style={{
                color: service.color,
              }}
            />

          </div>


          {/* DESCRIPTION */}
          <p
            className="
              text-white/75
              text-[8px]
              sm:text-[10px]
              leading-relaxed
              mb-2
            "
          >
            {service.description}
          </p>


          {/* TAGS */}
          <div className="flex flex-wrap gap-1 mb-2.5">

            {service.tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-1.5
                  py-[3px]
                  rounded-full
                  bg-white/[0.10]
                  border
                  border-white/[0.10]
                  backdrop-blur-xl
                  text-white/85
                  text-[6px]
                  sm:text-[8px]
                "
              >
                {tag}
              </span>
            ))}

          </div>


          {/* DIVIDER */}
          <div className="h-px w-full bg-white/[0.10] mb-2.5" />


          {/* FOOTER */}
          <div className="flex items-center justify-between">

            <div
              className="
                flex
                items-center
                gap-1
                text-[6px]
                sm:text-[8px]
                text-white/50
              "
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: service.color,
                  boxShadow: `0 0 8px ${service.color}`,
                }}
              />

              Available

            </div>


            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                flex
                items-center
                gap-1
                px-2.5
                sm:px-3
                py-1.5
                rounded-lg
                text-[7px]
                sm:text-[9px]
                font-semibold
                text-white
                border
                border-white/[0.20]
                backdrop-blur-xl
              "
              style={{
                background: `${service.color}35`,
                boxShadow: `0 6px 18px ${service.color}20`,
              }}
            >
              Explore
              <FaArrowRight />
            </motion.button>

          </div>

        </div>

      </div>


      {/* ACTIVE BORDER */}
      {isActive && (
        <motion.div
          animate={{
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="
            absolute
            z-40
            inset-0
            rounded-[22px]
            border
            pointer-events-none
          "
          style={{
            borderColor: `${service.color}80`,
            boxShadow: `
              inset 0 0 25px ${service.color}10,
              0 0 28px ${service.color}18
            `,
          }}
        />
      )}

    </motion.div>
  );
};


/* =========================================================
   ABOUT COMPONENT
========================================================= */

const About = () => {

  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(1);

  const [isPaused, setIsPaused] = useState(false);


  /* SCROLL ANIMATION */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });


  const eyeScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55],
    [0.7, 1.15, 1.4]
  );


  const eyeOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.42, 0.7],
    [0.25, 1, 1, 0.35]
  );


  const introY = useTransform(
    scrollYProgress,
    [0.2, 0.45],
    [80, 0]
  );


  const introOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.42],
    [0, 1]
  );


  /* AUTO SLIDER */

  useEffect(() => {

    if (isPaused) return;

    const interval = setInterval(() => {

      setActiveIndex((previous) =>
        previous === services.length - 1
          ? 0
          : previous + 1
      );

    }, 3500);

    return () => clearInterval(interval);

  }, [isPaused]);


  /* CARD POSITION */

  const getPosition = (index) => {

    let position = index - activeIndex;

    const total = services.length;

    if (position > total / 2) {
      position -= total;
    }

    if (position < -total / 2) {
      position += total;
    }

    return position;
  };


  /* PREVIOUS */

  const previous = () => {

    setActiveIndex((previousIndex) =>
      previousIndex === 0
        ? services.length - 1
        : previousIndex - 1
    );

  };


  /* NEXT */

  const next = () => {

    setActiveIndex((previousIndex) =>
      previousIndex === services.length - 1
        ? 0
        : previousIndex + 1
    );

  };


  return (

    <section
      ref={sectionRef}
      id="about"
      className="
        relative
        w-full
        bg-[#050816]
        overflow-hidden
      "
    >

      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div
          className="
            absolute
            top-[5%]
            left-1/2
            -translate-x-1/2
            w-[600px]
            h-[600px]
            rounded-full
            bg-[#915EFF]/10
            blur-[180px]
          "
        />

        <div
          className="
            absolute
            top-[50%]
            right-[-200px]
            w-[500px]
            h-[500px]
            rounded-full
            bg-[#7c3aed]/10
            blur-[180px]
          "
        />

      </div>


      {/* =================================================
          SECTION 01 — VISION
      ================================================= */}

      <div className="relative min-h-[90vh] z-10">

        <div
          className="
            sticky
            top-0
            h-[85vh]
            flex
            flex-col
            items-center
            justify-center
            px-6
            overflow-hidden
          "
        >

          {/* BACKGROUND TEXT */}
          <motion.div
            style={{
              scale: eyeScale,
              opacity: eyeOpacity,
            }}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              pointer-events-none
            "
          >
            <h2
              className="
                font-black
                text-white/[0.06]
                text-[18vw]
                leading-none
                tracking-tighter
                select-none
                whitespace-nowrap
              "
            >
              VISION.
            </h2>
          </motion.div>


          {/* EYE CARD */}
          <motion.div
            style={{
              scale: eyeScale,
              opacity: eyeOpacity,
            }}
            className="
              relative
              z-10
              w-[260px]
              sm:w-[320px]
              h-[150px]
              sm:h-[185px]
              rounded-2xl
              border
              border-white/20
              overflow-hidden
              shadow-[0_0_80px_rgba(145,94,255,0.25)]
            "
          >

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-[#1a1035]
                via-[#0d0b1f]
                to-[#050816]
                flex
                items-center
                justify-center
              "
            >

              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  w-20
                  h-20
                  sm:w-24
                  sm:h-24
                  rounded-full
                  bg-gradient-to-br
                  from-[#915EFF]
                  via-[#c084fc]
                  to-[#60a5fa]
                  opacity-90
                  blur-[1px]
                "
              />

              <motion.div
                animate={{ scale: [1, 0.8, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  bg-[#050816]
                  border-2
                  border-white/30
                "
              />

            </div>

            {/* CORNERS */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/50" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/50" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/50" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/50" />

          </motion.div>


          {/* SIDE TEXT */}
          <motion.p
            style={{ opacity: eyeOpacity }}
            className="absolute top-[28%] left-[10%] text-[8px] sm:text-[10px] tracking-[0.3em] text-white/40 uppercase"
          >
            Focus
          </motion.p>

          <motion.p
            style={{ opacity: eyeOpacity }}
            className="absolute top-[28%] right-[10%] text-[8px] sm:text-[10px] tracking-[0.3em] text-white/40 uppercase"
          >
            Defines
          </motion.p>

          <motion.p
            style={{ opacity: eyeOpacity }}
            className="absolute bottom-[30%] right-[12%] text-[8px] sm:text-[10px] tracking-[0.3em] text-white/40 uppercase"
          >
            Direction
          </motion.p>


          {/* INTRODUCTION */}
          <motion.div
            style={{
              y: introY,
              opacity: introOpacity,
            }}
            className="
              relative
              z-20
              mt-14
              max-w-xl
              text-center
              px-4
            "
          >

            <p className="text-[#aaa6c3] text-xs uppercase tracking-widest mb-3">
              Introduction
            </p>

            <h3 className="text-white font-black text-3xl sm:text-4xl mb-4">
              Overview.
            </h3>

            <p className="text-[#aaa6c3] text-[14px] sm:text-[16px] leading-relaxed">
              I'm a passionate Full Stack Developer who loves building
              modern web applications with clean code, smooth animations
              and immersive digital experiences. I turn ideas into fast,
              beautiful and scalable products.
            </p>

          </motion.div>

        </div>

      </div>


      {/* DIVIDER */}
      <div
        className="
          relative
          z-20
          h-px
          mx-auto
          max-w-5xl
          bg-gradient-to-r
          from-transparent
          via-[#915EFF]/50
          to-transparent
        "
      />


      {/* =================================================
          SECTION 02 — SKILLS
      ================================================= */}

      <section
        className="
          relative
          z-20
          py-10
          sm:py-14
          overflow-hidden
        "
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.55, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-1/2
              top-[45%]
              -translate-x-1/2
              -translate-y-1/2
              w-[350px]
              h-[350px]
              sm:w-[500px]
              sm:h-[500px]
              rounded-full
              bg-[#915EFF]/20
              blur-[140px]
            "
          />

        </div>


        {/* HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="
            relative
            z-10
            text-center
            mb-5
            sm:mb-7
            px-6
          "
        >

          <p className="text-[#915EFF] text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-3">
            What I Do
          </p>

          <h2 className="text-white text-3xl sm:text-5xl font-black tracking-tight">
            Skills &{" "}

            <span
              className="
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-[#915EFF]
                via-[#c084fc]
                to-[#61DAFB]
              "
            >
              Expertise.
            </span>

          </h2>

          <p className="text-[#aaa6c3] text-xs sm:text-sm mt-3">
            Explore the technologies and skills I use
            to build modern digital experiences.
          </p>

        </motion.div>


        {/* NETFLIX CAROUSEL */}
        <div
          className="
            relative
            z-10
            w-full
            h-[310px]
            sm:h-[370px]
            md:h-[390px]
            overflow-hidden
          "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {services.map((service, index) => {

            const position = getPosition(index);
            const distance = Math.abs(position);
            const isActive = position === 0;

            const xPosition =
              position *
              (typeof window !== "undefined" &&
              window.innerWidth < 640
                ? 140
                : 215);


            let scale = 1;

            if (distance === 1) scale = 0.78;
            if (distance === 2) scale = 0.58;
            if (distance >= 3) scale = 0.4;


            let opacity = 1;

            if (distance === 1) opacity = 0.55;
            if (distance === 2) opacity = 0.18;
            if (distance >= 3) opacity = 0;


            return (

              <motion.div
                key={service.title}
                animate={{
                  left: `calc(50% + ${xPosition}px)`,
                  scale,
                  opacity,
                  rotateY: position * -10,
                  filter:
                    isActive
                      ? "blur(0px)"
                      : distance === 1
                      ? "blur(1px)"
                      : "blur(4px)",
                  zIndex: 100 - distance,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 24,
                  mass: 0.8,
                }}
                onClick={() => setActiveIndex(index)}
                className="
                  absolute
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-[200px]
                  sm:w-[240px]
                  md:w-[260px]
                  cursor-pointer
                  [transform-style:preserve-3d]
                "
              >

                <SkillCard
                  service={service}
                  isActive={isActive}
                />

              </motion.div>

            );

          })}


          {/* PREVIOUS */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={previous}
            className="
              absolute
              left-2
              sm:left-8
              md:left-14
              top-1/2
              -translate-y-1/2
              z-[200]
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-full
              border
              border-white/[0.15]
              bg-black/40
              backdrop-blur-xl
              text-white
              flex
              items-center
              justify-center
              hover:border-[#915EFF]/70
              transition
            "
          >
            <FaArrowLeft />
          </motion.button>


          {/* NEXT */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="
              absolute
              right-2
              sm:right-8
              md:right-14
              top-1/2
              -translate-y-1/2
              z-[200]
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-full
              border
              border-white/[0.15]
              bg-black/40
              backdrop-blur-xl
              text-white
              flex
              items-center
              justify-center
              hover:border-[#915EFF]/70
              transition
            "
          >
            <FaArrowRight />
          </motion.button>

        </div>


        {/* CURRENT NUMBER */}
        <AnimatePresence mode="wait">

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="
              relative
              z-20
              text-center
              mt-2
            "
          >

            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
              {activeIndex + 1} / {services.length}
            </p>

          </motion.div>

        </AnimatePresence>


        {/* DOTS */}
        <div
          className="
            relative
            z-20
            flex
            justify-center
            gap-2
            mt-4
          "
        >

          {services.map((service, index) => (

            <button
              key={service.title}
              onClick={() => setActiveIndex(index)}
              className="
                relative
                h-1.5
                rounded-full
                transition-all
                duration-500
              "
              style={{
                width:
                  activeIndex === index
                    ? "28px"
                    : "7px",

                background:
                  activeIndex === index
                    ? service.color
                    : "rgba(255,255,255,0.2)",

                boxShadow:
                  activeIndex === index
                    ? `0 0 10px ${service.color}`
                    : "none",
              }}
            />

          ))}

        </div>


        {/* BOTTOM TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="
            relative
            z-20
            text-center
            text-[#aaa6c3]
            text-[9px]
            sm:text-xs
            uppercase
            tracking-[0.3em]
            mt-5
          "
        >
          Click a skill to explore
        </motion.p>

      </section>

    </section>

  );

};


export default About;