import { motion } from "framer-motion";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Smart MunimJi",
    date: "2024 - Present",
    icon: "💼",
    iconBg: "#915EFF",
    points: [
      "Developing and maintaining web applications using React.js, Node.js and MySQL.",
      "Building complete GST-ready billing & inventory systems for small businesses.",
      "Implementing JWT authentication, role-based access and real-time features.",
      "Collaborating on full-stack architecture and database design.",
    ],
  },
  {
    title: "MERN Stack Developer",
    company: "Finlec Task Manager",
    date: "2024",
    icon: "⚡",
    iconBg: "#E6DEFF",
    points: [
      "Built a complete Task Management System with React frontend and Node.js backend.",
      "Implemented user authentication, task assignment and real-time updates.",
      "Designed responsive UI with Tailwind CSS and modern state management.",
      "Integrated REST APIs and MongoDB for efficient data handling.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "CDAC",
    date: "2023 - 2024",
    icon: "🏆",
    iconBg: "#915EFF",
    points: [
      "Developed Library Management System using Java and MySQL.",
      "Won Gold Medal in Hackathon for the Library Management System project.",
      "Worked on backend logic, database design and frontend integration.",
      "Gained strong foundation in full-stack development and teamwork.",
    ],
  },
  {
    title: "Web Developer",
    company: "Personal Projects",
    date: "2023 - Present",
    icon: "🚀",
    iconBg: "#E6DEFF",
    points: [
      "Built Banking Management System with secure authentication and transaction features.",
      "Created YourQuote - a quote sharing platform with modern UI.",
      "Practiced clean code, responsive design and version control with Git.",
      "Continuously learning new technologies like Three.js and advanced React patterns.",
    ],
  },
];

// side: "left" | "right" | null — controls which direction the card animates in from.
// connectorSide: "right" | "left" | null (null = no pointer, used on mobile)
const ExperienceCard = ({ exp, side, connectorSide }) => {
  const connectorClass =
    connectorSide === "right"
      ? "before:content-[''] before:absolute before:top-8 before:-right-2 before:w-4 before:h-4 before:bg-[#1d1836] before:border-r before:border-t before:border-white/10 before:rotate-45"
      : connectorSide === "left"
      ? "before:content-[''] before:absolute before:top-8 before:-left-2 before:w-4 before:h-4 before:bg-[#1d1836] before:border-l before:border-b before:border-white/10 before:rotate-45"
      : "";

  const xOffset = side === "left" ? -60 : side === "right" ? 60 : 0;
  const yOffset = side ? 0 : 30;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: yOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-60px" }}
      className={`relative bg-[#1d1836] p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-[#915EFF]/40 transition-colors duration-300 ${connectorClass}`}
    >
      <h3 className="text-white text-[19px] sm:text-[21px] font-bold">{exp.title}</h3>
      <p className="text-[#aaa6c3] text-[14px] font-medium mt-1">{exp.company}</p>
      <p className="text-[#6b7280] text-xs uppercase tracking-wide mt-2 md:hidden">{exp.date}</p>
      <ul className="mt-4 space-y-2 list-disc list-inside">
        {exp.points.map((point, i) => (
          <li key={i} className="text-[#aaa6c3] text-[13px] sm:text-[14px] leading-relaxed">
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="section-container relative w-full py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-[#915EFF] text-[15px] sm:text-[16px] uppercase tracking-wider mb-3 font-medium">
          What I have done so far
        </p>
        <h2 className="text-white font-black text-4xl sm:text-5xl leading-none">
          Work Experience.
        </h2>
      </div>

      {/* Desktop: alternating timeline.
          items-center (not items-start) is the key: it vertically centers the
          icon + date within the full height of the tall card next to it,
          which naturally pushes the icon well below the heading - no fake
          margin hacks needed, matches the reference exactly. */}
      <div className="hidden md:block relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/30" />

        <div className="flex flex-col gap-16">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 pb-100px">
                {/* left column: card if isLeft (connector points right, toward the line), otherwise the date */}
                <div className={isLeft ? "" : "flex justify-end pr-1"}>
                  {isLeft ? (
                    <ExperienceCard exp={exp} side="left" connectorSide="right" />
                  ) : (
                    <span className="text-[#aaa6c3] text-[14px] whitespace-nowrap">{exp.date}</span>
                  )}
                </div>

                {/* center icon */}
                <div className="flex justify-center px-1">
                  <div
                    className="w-11 h-11 rounded-full border-[3px] border-white flex items-center justify-center shrink-0 z-10"
                    style={{ backgroundColor: exp.iconBg }}
                  >
                    <span className="text-lg">{exp.icon}</span>
                  </div>
                </div>

                {/* right column: card if !isLeft (connector points left, toward the line), otherwise the date */}
                <div className={!isLeft ? "" : "flex items-center pl-10"}>
                  {!isLeft ? (
                    <ExperienceCard exp={exp} side="right" connectorSide="left" />
                  ) : (
                    <span className="text-[#aaa6c3] text-[14px] whitespace-nowrap">{exp.date}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: linear left-aligned timeline */}
      <div className="md:hidden flex flex-col gap-8">
        {experiences.map((exp, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full border-[3px] border-white flex items-center justify-center shrink-0"
                style={{ backgroundColor: exp.iconBg }}
              >
                <span className="text-base">{exp.icon}</span>
              </div>
              {index !== experiences.length - 1 && (
                <div className="w-[2px] flex-1 bg-white/20 mt-1" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <ExperienceCard exp={exp} side={null} connectorSide={null} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;