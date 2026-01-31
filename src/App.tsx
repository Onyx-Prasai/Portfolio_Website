import { Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Volume2, VolumeX } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import ZenShrine from './components/ZenShrine';
import ZenLoadingScreen from './components/ZenLoadingScreen';
import SakuraParticles from './components/SakuraParticles';
import ZenMusic from './components/ZenMusic';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [loading, setLoading] = useState(true);
  const [showShrine, setShowShrine] = useState(true);
  const [playMusic, setPlayMusic] = useState(false);

  const handleEnter = () => {
    setShowShrine(false);
    setPlayMusic(true);
  };

  if (showShrine) {
    return (
      <AnimatePresence>
        <ZenShrine onEnter={handleEnter} />
        <CustomCursor />
      </AnimatePresence>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-transparent">
      <CustomCursor />
      <ZenMusic isPlaying={playMusic} />

      {/* Music Toggle Icon - Fixed Bottom Right */}
      {!showShrine && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-[100] p-2 bg-primary border border-secondary/10 rounded-full shadow-md text-secondary hover:text-accent hover:border-accent transition-all cursor-none"
          onClick={() => setPlayMusic(!playMusic)}
          title={playMusic ? "Mute Music" : "Play Music"}
        >
          {playMusic ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </motion.button>
      )}

      <AnimatePresence>
        {loading && <ZenLoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          {/* 3D Background */}
          <div className="fixed inset-0 z-0">
            <Canvas>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} />
                <SakuraParticles />
              </Suspense>
            </Canvas>
          </div>
          {/* UI Overlay */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
