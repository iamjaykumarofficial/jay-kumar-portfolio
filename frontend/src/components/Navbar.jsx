import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#050816]/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="section-container h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-3 group"
          >
            <img
              src="/logo.png"
              alt="Jay Kumar Choudhary"
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-white text-[14px] sm:text-[15px] font-semibold tracking-wide group-hover:text-[#c4b5fd] transition-colors">
                Jay Kumar Choudhary
              </span>
              <span className="text-[#8b899b] text-[10px] sm:text-[11px] font-mono">
                // full-stack developer
              </span>
            </div>
          </a>

          <ul className="hidden sm:flex items-center gap-8">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <a
                  href={`#${nav.id}`}
                  onClick={() => setActive(nav.title)}
                  className={`text-[14px] font-medium transition-colors ${
                    active === nav.title
                      ? "text-white"
                      : "text-[#aaa6c3] hover:text-white"
                  }`}
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="sm:hidden text-white text-xl p-1"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            {toggle ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {toggle && (
          <div className="sm:hidden absolute top-16 left-6 right-6 bg-[#151030] border border-white/10 rounded-xl py-4 px-5 shadow-xl">
            <ul className="flex flex-col gap-4">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={`#${nav.id}`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                    className={`text-[15px] font-medium ${
                      active === nav.title ? "text-white" : "text-[#aaa6c3]"
                    }`}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;