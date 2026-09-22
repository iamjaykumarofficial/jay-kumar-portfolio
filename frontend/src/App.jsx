import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import Works from "./components/Works";
import Contact from "./components/Contact";
import AnimatedSphere from "./components/canvas/AnimatedSphere";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <div className="relative z-0 bg-[#050816]">
          <Navbar />
          <Hero />
          <AnimatedSphere />
          <About />
          <Experience />
          <Tech />
          <Works />
          <Contact />
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;