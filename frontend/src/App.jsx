import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import Works from "./components/Works";
import Contact from "./components/Contact";
import AnimatedSphere from "./components/canvas/AnimatedSphere";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderFinish = () => {
    setLoading(false);
  };

  return (
    <div className="relative z-0 min-h-screen w-full bg-[#050816]">
      {/* Loader */}
      {loading && <Loader onFinish={handleLoaderFinish} />}

      {/* Global bubble / sphere — unchanged */}
      <AnimatedSphere />

      {/* Main website */}
      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Experience />
          <Tech />
          <Works />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;