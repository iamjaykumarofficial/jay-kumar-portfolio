import React, { useState } from "react";
import { motion } from "framer-motion";

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

import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiJavascript,
  SiRedux,
  SiThreedotjs,
} from "react-icons/si";


/* =====================================================
   SKILLS DATA
===================================================== */

const skills = [
  {
    id: 1,

    title: "Web Developer",

    label: "Frontend Development",

    description:
      "I build modern, responsive and high-performance websites with clean design, smooth animations and a great user experience.",

    Icon: FaCode,

    color: "#915EFF",

    number: "01",

    tags: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
  },


  {
    id: 2,

    title: "React Developer",

    label: "Frontend Engineering",

    description:
      "I create dynamic, scalable and interactive user interfaces using React, reusable components and modern frontend practices.",

    Icon: FaReact,

    color: "#61DAFB",

    number: "02",

    tags: [
      "React",
      "Redux",
      "Hooks",
    ],
  },


  {
    id: 3,

    title: "Backend Developer",

    label: "Backend Engineering",

    description:
      "I develop secure and scalable backend applications with REST APIs, authentication and powerful database integration.",

    Icon: FaNodeJs,

    color: "#68A063",

    number: "03",

    tags: [
      "Node.js",
      "Express",
      "REST API",
    ],
  },


  {
    id: 4,

    title: "UI / UX Designer",

    label: "Creative Design",

    description:
      "I design clean, intuitive and visually engaging interfaces focused on usability, accessibility and modern user experience.",

    Icon: FaFigma,

    color: "#F24E1E",

    number: "04",

    tags: [
      "Figma",
      "UI Design",
      "UX",
    ],
  },


  {
    id: 5,

    title: "3D Developer",

    label: "Creative Development",

    description:
      "I create immersive and interactive web experiences using modern 3D graphics, animations and creative technologies.",

    Icon: SiThreedotjs,

    color: "#A78BFA",

    number: "05",

    tags: [
      "Three.js",
      "3D",
      "Animation",
    ],
  },


  {
    id: 6,

    title: "Full Stack Developer",

    label: "Full Stack Engineering",

    description:
      "I build complete web applications from beautiful frontend interfaces to powerful backend systems and databases.",

    Icon: FaLayerGroup,

    color: "#FBBF24",

    number: "06",

    tags: [
      "MERN",
      "MySQL",
      "REST API",
    ],
  },
];



/* =====================================================
   PREMIUM SKILL CARD
===================================================== */

const PremiumSkillCard = ({

  skill,

  isActive,

}) => {

  const SkillIcon = skill.Icon;


  return (

    <motion.div

      whileHover={
        isActive
          ? {
              y: -10,
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
        group
        relative
        w-full
        h-[430px]
        sm:h-[500px]
        overflow-hidden
        rounded-[28px]
        sm:rounded-[34px]
        bg-[#111118]
        shadow-[0_30px_90px_rgba(0,0,0,0.75)]
      "
    >



      {/* =============================================
          MAIN BACKGROUND
      ============================================= */}

      <div
        className="
          absolute
          inset-0
        "
      >


        {/* BASE GRADIENT */}

        <div

          className="
            absolute
            inset-0
          "

          style={{

            background: `

              radial-gradient(
                circle at 50% 35%,
                ${skill.color}45,
                transparent 30%
              ),

              radial-gradient(
                circle at 20% 10%,
                ${skill.color}20,
                transparent 40%
              ),

              radial-gradient(
                circle at 80% 70%,
                ${skill.color}15,
                transparent 45%
              ),

              linear-gradient(
                145deg,
                #252532,
                #08080d
              )

            `,

          }}

        />



        {/* =============================================
            GRID BACKGROUND
        ============================================= */}

        <div

          className="
            absolute
            inset-0
            opacity-[0.08]
          "

          style={{

            backgroundImage: `

              linear-gradient(
                rgba(255,255,255,0.4) 1px,
                transparent 1px
              ),

              linear-gradient(
                90deg,
                rgba(255,255,255,0.4) 1px,
                transparent 1px
              )

            `,

            backgroundSize:
              "32px 32px",

          }}

        />



        {/* =============================================
            HUGE BACKGROUND NUMBER
        ============================================= */}

        <div

          className="
            absolute
            -right-5
            -top-8

            text-[180px]
            sm:text-[250px]

            font-black
            leading-none

            text-white/[0.025]

            select-none
            pointer-events-none
          "
        >

          {skill.number}

        </div>



        {/* =============================================
            ANIMATED GLOW
        ============================================= */}

        {isActive && (

          <motion.div

            animate={{

              scale: [
                1,
                1.35,
                1,
              ],

              opacity: [
                0.25,
                0.6,
                0.25,
              ],

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

              w-[220px]
              h-[220px]

              sm:w-[320px]
              sm:h-[320px]

              rounded-full

              blur-[80px]
            "


            style={{
              background:
                skill.color,
            }}

          />

        )}



        {/* =============================================
            LARGE FULL CARD LOGO
        ============================================= */}

        <motion.div


          animate={
            isActive
              ? {

                  y: [
                    0,
                    -10,
                    0,
                  ],


                  scale: [
                    1,
                    1.08,
                    1,
                  ],


                  rotate: [
                    0,
                    2,
                    0,
                    -2,
                    0,
                  ],

                }

              : {}
          }


          transition={{

            duration: 5,

            repeat:
              isActive
                ? Infinity
                : 0,

            ease: "easeInOut",

          }}


          className="
            absolute
            inset-0

            z-10

            flex
            items-center
            justify-center

            pb-12

            pointer-events-none
          "
        >


          <SkillIcon


            className="
              text-[190px]

              sm:text-[280px]

              md:text-[320px]

              opacity-90
            "


            style={{

              color:
                skill.color,


              filter: `

                drop-shadow(
                  0 0 20px
                  ${skill.color}
                )

                drop-shadow(
                  0 0 60px
                  ${skill.color}90
                )

              `,

            }}

          />


        </motion.div>



        {/* =============================================
            TOP DARK GRADIENT
        ============================================= */}

        <div

          className="
            absolute
            z-20

            top-0
            left-0
            right-0

            h-[30%]

            bg-gradient-to-b

            from-black/50

            via-black/10

            to-transparent
          "

        />



        {/* =============================================
            BOTTOM DARK OVERLAY

            TEXT READABILITY
        ============================================= */}

        <div

          className="
            absolute
            z-20

            left-0
            right-0
            bottom-0

            h-[65%]

            bg-gradient-to-t

            from-[#050508]

            via-[#050508]/95

            to-transparent
          "

        />


      </div>



      {/* =============================================
          CARD CONTENT

          ALL TEXT OVER THE LOGO
      ============================================= */}

      <div

        className="
          absolute
          z-30

          inset-0

          p-5
          sm:p-7

          flex
          flex-col

          justify-between
        "
      >



        {/* =============================================
            TOP AREA
        ============================================= */}

        <div

          className="
            flex
            items-center
            justify-between
          "
        >


          {/* CATEGORY */}

          <div

            className="
              px-3
              py-1.5

              rounded-full

              bg-black/35

              backdrop-blur-xl

              border
              border-white/[0.12]

              text-[8px]
              sm:text-[10px]

              uppercase

              tracking-[0.15em]

              text-white/65
            "
          >

            {skill.label}

          </div>



          {/* NUMBER */}

          <div

            className="
              text-xs
              sm:text-sm

              font-semibold

              tracking-[0.2em]
            "


            style={{
              color:
                skill.color,
            }}
          >

            {skill.number}

          </div>


        </div>



        {/* =============================================
            BOTTOM INFORMATION
        ============================================= */}

        <div>


          {/* TITLE */}

          <div

            className="
              flex
              items-center
              gap-2

              mb-2
            "
          >


            <h3

              className="
                text-white

                text-[21px]

                sm:text-[28px]

                font-bold

                tracking-tight

                drop-shadow-2xl
              "
            >

              {skill.title}

            </h3>



            {/* VERIFIED BADGE */}

            <FaCheckCircle

              className="
                text-base
                sm:text-xl
              "


              style={{

                color:
                  skill.color,


                filter: `

                  drop-shadow(
                    0 0 8px
                    ${skill.color}
                  )

                `,

              }}

            />


          </div>



          {/* =============================================
              DESCRIPTION
          ============================================= */}

          <p

            className="
              max-w-[95%]

              text-white/75

              text-[11px]

              sm:text-[14px]

              leading-relaxed

              mb-4

              drop-shadow-lg
            "
          >

            {skill.description}

          </p>



          {/* =============================================
              TAGS
          ============================================= */}

          <div

            className="
              flex
              flex-wrap
              gap-2

              mb-5
            "
          >


            {skill.tags.map(

              (tag) => (

                <span

                  key={tag}


                  className="
                    px-2.5
                    py-1

                    rounded-full

                    bg-white/[0.10]

                    backdrop-blur-xl

                    border
                    border-white/[0.12]

                    text-white/80

                    text-[8px]
                    sm:text-[10px]

                    font-medium
                  "
                >

                  {tag}

                </span>

              )

            )}


          </div>



          {/* =============================================
              DIVIDER
          ============================================= */}

          <div

            className="
              w-full
              h-px

              bg-white/[0.10]

              mb-4
            "

          />



          {/* =============================================
              FOOTER
          ============================================= */}

          <div

            className="
              flex
              items-center
              justify-between
            "
          >


            {/* STATUS */}

            <div

              className="
                flex
                items-center
                gap-2

                text-[9px]
                sm:text-[11px]

                text-white/50
              "
            >


              <span

                className="
                  w-2
                  h-2

                  rounded-full
                "


                style={{

                  background:
                    skill.color,


                  boxShadow: `

                    0 0 10px
                    ${skill.color}

                  `,

                }}

              />


              Available to build


            </div>



            {/* =============================================
                EXPLORE BUTTON
            ============================================= */}

            <motion.button


              whileHover={{

                scale: 1.06,

              }}


              whileTap={{

                scale: 0.95,

              }}


              className="
                group/btn

                flex
                items-center
                gap-2

                px-4
                sm:px-5

                py-2.5

                rounded-xl

                text-[10px]
                sm:text-[12px]

                font-semibold

                text-white

                border
                border-white/[0.20]

                backdrop-blur-xl

                transition-all
              "


              style={{

                background:
                  `${skill.color}35`,


                boxShadow: `

                  0 8px 30px
                  ${skill.color}30

                `,

              }}

            >


              Explore


              <motion.span

                animate={
                  isActive
                    ? {

                        x: [
                          0,
                          4,
                          0,
                        ],

                      }

                    : {}
                }


                transition={{

                  duration: 1.5,

                  repeat:
                    isActive
                      ? Infinity
                      : 0,

                }}

              >

                <FaArrowRight />

              </motion.span>


            </motion.button>


          </div>


        </div>


      </div>



      {/* =============================================
          ACTIVE BORDER
      ============================================= */}

      {isActive && (

        <motion.div


          animate={{

            opacity: [
              0.4,
              1,
              0.4,
            ],

          }}


          transition={{

            duration: 2.5,

            repeat: Infinity,

          }}


          className="
            absolute

            z-40

            inset-0

            rounded-[28px]
            sm:rounded-[34px]

            pointer-events-none

            border
          "


          style={{

            borderColor:
              `${skill.color}80`,


            boxShadow: `

              inset 0 0 40px
              ${skill.color}10,

              0 0 40px
              ${skill.color}20

            `,

          }}

        />

      )}


    </motion.div>

  );

};




/* =====================================================
   MAIN CAROUSEL
===================================================== */

const SkillsCarousel = () => {


  const [

    activeIndex,

    setActiveIndex,

  ] = useState(1);



  /* =====================================================
     NEXT CARD
  ===================================================== */

  const nextCard = () => {

    setActiveIndex(

      (previous) =>

        previous === skills.length - 1
          ? 0
          : previous + 1

    );

  };



  /* =====================================================
     PREVIOUS CARD
  ===================================================== */

  const previousCard = () => {

    setActiveIndex(

      (previous) =>

        previous === 0
          ? skills.length - 1
          : previous - 1

    );

  };



  return (

    <section

      className="
        relative

        w-full

        overflow-hidden

        py-16
        sm:py-24

        bg-transparent
      "
    >



      {/* =============================================
          SECTION HEADER
      ============================================= */}

      <div

        className="
          relative

          z-20

          text-center

          mb-10
          sm:mb-14

          px-5
        "
      >


        <p

          className="
            text-[#915EFF]

            text-[10px]
            sm:text-xs

            uppercase

            tracking-[0.35em]

            mb-3
          "
        >

          What I Do

        </p>



        <h2

          className="
            text-white

            text-3xl
            sm:text-5xl
            md:text-6xl

            font-black

            tracking-tight
          "
        >

          Skills &{" "}

          <span

            className="
              text-transparent

              bg-clip-text

              bg-gradient-to-r

              from-[#915EFF]

              via-[#C084FC]

              to-[#61DAFB]
            "
          >

            Expertise

          </span>


        </h2>



        <p

          className="
            max-w-xl

            mx-auto

            mt-4

            text-white/45

            text-sm
            sm:text-base
          "
        >

          Explore the technologies and skills
          I use to build modern digital experiences.

        </p>


      </div>



      {/* =============================================
          CAROUSEL AREA
      ============================================= */}

      <div

        className="
          relative

          w-full

          h-[500px]
          sm:h-[580px]
          md:h-[620px]
        "
      >



        {/* =============================================
            CARDS
        ============================================= */}

        <div

          className="
            absolute

            inset-0

            flex

            items-center
            justify-center
          "
        >


          {skills.map(

            (skill, index) => {


              let position =
                index - activeIndex;


              /*
                LOOP FIX
              */


              if (

                position >
                skills.length / 2

              ) {

                position -=
                  skills.length;

              }


              if (

                position <
                -skills.length / 2

              ) {

                position +=
                  skills.length;

              }



              const distance =
                Math.abs(position);



              const isActive =
                index === activeIndex;



              /*
                CARD POSITION
              */


              const xPosition =
                position * 260;



              return (

                <motion.div

                  key={skill.id}


                  animate={{

                    x:
                      xPosition,


                    scale:

                      isActive
                        ? 1
                        : distance === 1
                        ? 0.82
                        : 0.68,


                    opacity:

                      isActive
                        ? 1
                        : distance === 1
                        ? 0.55
                        : 0,


                    rotateY:
                      position * -12,


                    zIndex:
                      100 - distance,


                    filter:

                      isActive
                        ? "blur(0px)"
                        : distance === 1
                        ? "blur(1px)"
                        : "blur(5px)",

                  }}


                  transition={{

                    type: "spring",

                    stiffness: 180,

                    damping: 24,

                    mass: 0.8,

                  }}


                  onClick={() =>
                    setActiveIndex(index)
                  }


                  className="
                    absolute

                    w-[270px]

                    sm:w-[350px]

                    md:w-[380px]

                    cursor-pointer

                    [transform-style:preserve-3d]
                  "
                >


                  <PremiumSkillCard

                    skill={skill}

                    isActive={isActive}

                  />


                </motion.div>

              );

            }

          )}


        </div>



        {/* =============================================
            LEFT BUTTON
        ============================================= */}

        <motion.button


          whileHover={{

            scale: 1.1,

          }}


          whileTap={{

            scale: 0.92,

          }}


          onClick={previousCard}


          className="
            absolute

            z-[200]

            left-3
            sm:left-8
            md:left-14

            top-1/2

            -translate-y-1/2

            w-10
            h-10

            sm:w-12
            sm:h-12

            flex

            items-center
            justify-center

            rounded-full

            bg-black/40

            backdrop-blur-xl

            border

            border-white/[0.15]

            text-white/80

            hover:text-white

            transition
          "
        >

          <FaArrowLeft />


        </motion.button>



        {/* =============================================
            RIGHT BUTTON
        ============================================= */}

        <motion.button


          whileHover={{

            scale: 1.1,

          }}


          whileTap={{

            scale: 0.92,

          }}


          onClick={nextCard}


          className="
            absolute

            z-[200]

            right-3
            sm:right-8
            md:right-14

            top-1/2

            -translate-y-1/2

            w-10
            h-10

            sm:w-12
            sm:h-12

            flex

            items-center
            justify-center

            rounded-full

            bg-black/40

            backdrop-blur-xl

            border

            border-white/[0.15]

            text-white/80

            hover:text-white

            transition
          "
        >

          <FaArrowRight />


        </motion.button>



        {/* =============================================
            DOTS
        ============================================= */}

        <div

          className="
            absolute

            z-[200]

            bottom-0

            left-1/2

            -translate-x-1/2

            flex

            items-center

            gap-2
          "
        >


          {skills.map(

            (skill, index) => (

              <button

                key={skill.id}


                onClick={() =>
                  setActiveIndex(index)
                }


                className={`
                  
                  transition-all
                  duration-300
                  
                  rounded-full
                  
                  ${
                    activeIndex === index

                      ? "w-8 h-2"

                      : "w-2 h-2 bg-white/30 hover:bg-white/60"

                  }

                `}


                style={

                  activeIndex === index

                    ? {

                        background:
                          skill.color,

                        boxShadow: `
                          
                          0 0 12px
                          ${skill.color}

                        `,

                      }

                    : {}

                }

              />

            )

          )}


        </div>


      </div>


    </section>

  );

};


export default SkillsCarousel;