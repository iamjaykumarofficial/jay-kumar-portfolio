import { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import EarthCanvas from "./canvas/Earth";

const InfoCard = ({ href, icon, title, detail }) => (
  <a
    href={href}
    className="group flex items-center gap-3.5 px-4 py-3.5 rounded-xl border border-white/10 bg-[#0c0e18]/70 backdrop-blur-xl hover:border-[#915EFF]/40 transition-all"
  >
    <div className="w-10 h-10 shrink-0 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#c4b5fd]">
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-white text-[13px] font-semibold">{title}</p>
      <p className="text-[#8b899b] text-[12px] truncate">{detail}</p>
    </div>

    <div className="w-8 h-8 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-[#915EFF] group-hover:border-[#915EFF]/40 transition-colors">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M7 17L17 7M17 7H8M17 7V16" />
      </svg>
    </div>
  </a>
);

const Contact = () => {
  const formRef = useRef(null);
  const formZoneRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [earthDisabled, setEarthDisabled] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/contact", form);

      if (res.data.success) {
        alert("Thank you. I will get back to you as soon as possible.");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSectionMouseMove = (e) => {
    const formZone = formZoneRef.current;
    if (!formZone) return;

    const rect = formZone.getBoundingClientRect();
    const insideForm =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    setEarthDisabled(insideForm);
  };

  const handleSectionMouseLeave = () => {
    setEarthDisabled(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full pt-36 sm:pt-44 pb-24 bg-transparent overflow-hidden"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
    >
      <div className="absolute inset-x-0 top-0 z-0 flex justify-center pt-4 sm:pt-6 pointer-events-none overflow-hidden">
        <h1 className="text-white/20 font-black text-[90px] sm:text-[150px] lg:text-[210px] leading-none tracking-tight whitespace-nowrap select-none">
          CONTACT
        </h1>
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{ pointerEvents: earthDisabled ? "none" : "auto" }}
      >
        <EarthCanvas active={!earthDisabled} />
      </div>

      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 50%, rgba(5,8,22,0.28), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(5,8,22,0.18), transparent 65%)",
        }}
      />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md pointer-events-auto">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#915EFF]"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0 1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span className="text-white/80 text-xs font-medium tracking-wide">Contact</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="pointer-events-none"
          >
            <h2 className="text-white font-bold text-3xl sm:text-4xl leading-tight mb-2.5">
              Get in touch
            </h2>

            <p className="text-[#8b899b] text-[13px] sm:text-sm leading-relaxed mb-8 max-w-xs">
              Have a project in mind or just want to say hi? I would love to hear from you.
            </p>

            <div className="flex flex-col gap-3 max-w-sm pointer-events-auto">
              <InfoCard
                href="mailto:jaykumar@example.com"
                title="Email me"
                detail="jaykumar@example.com"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                }
              />

              <InfoCard
                href="tel:+910000000000"
                title="Call me"
                detail="+91 00000 00000"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
              />

              <InfoCard
                href="#"
                title="Based in"
                detail="Jabalpur, India"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              />
            </div>
          </motion.div>

          <motion.div
            ref={formZoneRef}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full relative z-20"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-[#0c0e18]/70 py-4 px-5 rounded-xl outline-none border border-white/10 focus:border-[#915EFF] text-white placeholder:text-white/35 transition-colors text-sm"
                required
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-[#0c0e18]/70 py-4 px-5 rounded-xl outline-none border border-white/10 focus:border-[#915EFF] text-white placeholder:text-white/35 transition-colors text-sm"
                required
              />

              <textarea
                rows={8}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full bg-[#0c0e18]/70 py-4 px-5 rounded-xl outline-none border border-white/10 focus:border-[#915EFF] text-white placeholder:text-white/35 resize-none transition-colors text-sm"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-[#050816] py-4 rounded-xl outline-none font-bold shadow-md hover:bg-[#915EFF] hover:text-white disabled:opacity-60 transition-all duration-300 text-sm"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-[100px] bg-gradient-to-b from-transparent via-[#915EFF]/40 to-[#915EFF]/80" />
    </section>
  );
};

export default Contact;