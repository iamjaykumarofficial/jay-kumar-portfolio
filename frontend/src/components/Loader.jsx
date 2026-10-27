import { useEffect, useState } from "react";

const planets = [
  {
    size: 8,
    color: "#60a5fa",
    orbit: 48,
    duration: 7,
    delay: 0,
  },
  {
    size: 6,
    color: "#c084fc",
    orbit: 48,
    duration: 7,
    delay: -3.5,
  },
  {
    size: 7,
    color: "#f97316",
    orbit: 65,
    duration: 9,
    delay: -1.5,
  },
  {
    size: 5,
    color: "#34d399",
    orbit: 65,
    duration: 9,
    delay: -6,
  },
  {
    size: 9,
    color: "#a78bfa",
    orbit: 82,
    duration: 12,
    delay: -2,
  },
  {
    size: 5,
    color: "#f472b6",
    orbit: 82,
    duration: 12,
    delay: -8,
  },
  {
    size: 6,
    color: "#38bdf8",
    orbit: 100,
    duration: 15,
    delay: -4,
  },
];

const stars = Array.from({ length: 45 }, (_, index) => ({
  id: index,
  top: `${(index * 37.13) % 100}%`,
  left: `${(index * 61.71) % 100}%`,
  size: index % 7 === 0 ? 2 : 1,
  opacity: 0.25 + ((index * 17) % 65) / 100,
  delay: `${(index % 12) * 0.35}s`,
}));

const Loader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const finishTimer = window.setTimeout(() => {
      if (typeof onFinish === "function") {
        onFinish();
      }
    }, 2500);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden bg-[#02030d] transition-opacity duration-500 ${
        fadeOut
          ? "pointer-events-none opacity-0"
          : "pointer-events-auto opacity-100"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#120a2c_0%,_#050816_45%,_#02030d_100%)]" />

      {/* Center glow */}
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed]/10 blur-[60px]" />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white animate-loader-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4">
        {/* Solar System */}
        <div className="relative flex h-[230px] w-[230px] items-center justify-center">
          {/* Orbit 1 */}
          <div
            className="absolute rounded-full border border-dashed border-[#915EFF]/25"
            style={{
              width: 96,
              height: 96,
            }}
          />

          {/* Orbit 2 */}
          <div
            className="absolute rounded-full border border-dashed border-[#915EFF]/22"
            style={{
              width: 130,
              height: 130,
            }}
          />

          {/* Orbit 3 */}
          <div
            className="absolute rounded-full border border-dashed border-[#915EFF]/20"
            style={{
              width: 164,
              height: 164,
            }}
          />

          {/* Orbit 4 */}
          <div
            className="absolute rounded-full border border-dashed border-[#915EFF]/18"
            style={{
              width: 200,
              height: 200,
            }}
          />

          {/* Planets */}
          {planets.map((planet, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-1/2"
              style={{
                width: planet.orbit * 2,
                height: planet.orbit * 2,
                marginLeft: -planet.orbit,
                marginTop: -planet.orbit,
                animation: `loaderOrbit ${planet.duration}s linear infinite`,
                animationDelay: `${planet.delay}s`,
              }}
            >
              <div
                className="absolute left-1/2 top-0 rounded-full"
                style={{
                  width: planet.size,
                  height: planet.size,
                  transform: "translateX(-50%)",
                  background: planet.color,
                  boxShadow: `
                    0 0 5px ${planet.color},
                    0 0 10px ${planet.color}88
                  `,
                }}
              />
            </div>
          ))}

          {/* Logo */}
          <div className="relative z-50 flex h-[82px] w-[82px] items-center justify-center">
            {/* Glow */}
            <div
              className="
                absolute
                h-[72px]
                w-[72px]
                rounded-full
                bg-[#915EFF]/20
                blur-[18px]
              "
            />

            {/* Dark background */}
            <div
              className="
                absolute
                h-[66px]
                w-[66px]
                rounded-full
                bg-[#050816]/90
              "
            />

            {/* Logo */}
            <img
              src="/logo.png"
              alt="Jay Kumar Choudhary"
              draggable="false"
              className="
                relative
                z-[60]
                h-[68px]
                w-[68px]
                select-none
                object-contain
                opacity-100
                drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]
                drop-shadow-[0_0_14px_rgba(145,94,255,0.95)]
              "
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="mt-[-2px] text-center text-[21px] font-semibold tracking-wide text-white sm:text-[23px]">
          <span>Jay Kumar </span>
          <span className="text-[#b987ff]">Choudhary</span>
        </h1>

        {/* Loading */}
        <p className="mt-1 text-center text-[12px] text-[#aaa7b9] sm:text-[13px]">
          Loading experience...
        </p>

        {/* Code decoration */}
        <div className="mt-6 flex items-center justify-center">
          <div className="hidden h-px w-12 bg-gradient-to-r from-transparent to-[#915EFF]/70 sm:block" />

          <div className="mx-2 flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[#915EFF] shadow-[0_0_8px_#915EFF]" />

            <span className="text-[18px] text-[#915EFF]">•</span>

            <span className="text-[22px] leading-none text-[#a855f7]">
              {"</>"}
            </span>

            <span className="text-[18px] text-[#915EFF]">•</span>

            <span className="h-1 w-1 rounded-full bg-[#915EFF] shadow-[0_0_8px_#915EFF]" />
          </div>

          <div className="hidden h-px w-12 bg-gradient-to-l from-transparent to-[#915EFF]/70 sm:block" />
        </div>

        {/* Role */}
        <p className="mt-5 text-center text-[8px] font-medium uppercase tracking-[0.24em] text-[#8b899b] sm:text-[9px] sm:tracking-[0.28em]">
          Full-Stack Developer
          <span className="mx-1.5 text-[#915EFF]">•</span>
          Designer
          <span className="mx-1.5 text-[#915EFF]">•</span>
          Problem Solver
        </p>
      </div>

      {/* Loader animations */}
      <style>{`
        @keyframes loaderOrbit {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes loaderTwinkle {
          0%,
          100% {
            transform: scale(0.7);
            opacity: 0.25;
          }

          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        .animate-loader-twinkle {
          animation: loaderTwinkle 2.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-loader-twinkle {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;