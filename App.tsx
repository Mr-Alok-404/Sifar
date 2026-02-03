import React, { useState, useEffect, useRef, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import DistrictExplore from './components/DistrictExplore';
import DistrictDetail from './components/DistrictDetail';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Stats from './components/Stats';
import BackButton from './components/BackButton';
import ScrollToTop from './components/ScrollToTop';
import Legal from './components/Legal';
import ScrollProgress from './components/ScrollProgress';

// Lazy Load the Map (Huge performance boost)
const Map = React.lazy(() => import('./components/Map'));

// Audio Source - Reliable wind ambience from Mixkit
const AUDIO_SRC = "https://res.cloudinary.com/dl7c8ts7f/video/upload/v1769937290/wind_ambience_wscmku.mp3";

const Home: React.FC = () => (
  <div className="bg-sifar-black min-h-screen relative">
    <Hero />
    <Stats />
    <section className="py-20 relative">
      {/* Background Texture for Content Area (Stardust) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="font-cinzel text-3xl text-sifar-gold">Recent Chronicles</h2>
        <div className="w-16 h-0.5 bg-sifar-gray mx-auto mt-4"></div>
      </div>
      <Timeline />
    </section>
  </div>
);

/* const LegalPlaceholder: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-sifar-black pt-20">
    <div className="text-center p-8 max-w-2xl">
      <h1 className="font-cinzel text-3xl text-sifar-gold mb-4">Legal & Philosophy</h1>
      <p className="text-sifar-muted leading-relaxed">
        This is a personal documentation project ("The Sifar Journey"). 
        All content is copyrighted by Ryo. No cookies are tracked because I believe in privacy as much as I believe in freedom.
      </p>
    </div>
  </div>
);
*/

const App: React.FC = () => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Audio State
  const [isMuted, setIsMuted] = useState(true); // Default muted for browser policy
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Handle Theme Class on Body
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        // User interaction allows play
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Play started
                if (audioRef.current) audioRef.current.muted = false;
                setIsMuted(false);
            })
            .catch(error => {
                console.log("Audio play failed:", error);
            });
        }
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <Router>
      {/* ScrollToTop ensures smooth scroll to top on route change */}
      <ScrollToTop />

      {/* --- MOODY UPGRADES START --- */}
    
      {/* 2. Top Progress Line */}
      <ScrollProgress />

      {/* 3. Cinematic Vignette (Dark Corners) - Always on top */}
      <div className="fixed inset-0 pointer-events-none z-[50] bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]"></div>
      
      {/* --- MOODY UPGRADES END --- */}

      <div className="flex flex-col min-h-screen bg-sifar-black text-sifar-text selection:bg-sifar-gold selection:text-sifar-black transition-colors duration-500">
        <Navbar 
          toggleTheme={toggleTheme} 
          isDarkMode={isDarkMode} 
          toggleAudio={toggleAudio}
          isMuted={isMuted}
        />
        
        {/* Background Audio Element */}
        <audio ref={audioRef} src={AUDIO_SRC} loop muted={true} crossOrigin="anonymous" />

        <BackButton />
        
        {/* Main Content needs z-10 to stay above background but below vignette/cursor */}
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={
              <div className="pt-28 pb-20 bg-sifar-black min-h-screen">
                <div className="text-center mb-16">
                  <h1 className="font-cinzel text-4xl text-sifar-gold">The Timeline</h1>
                  <p className="text-sifar-muted mt-2">Chronological steps into the unknown.</p>
                </div>
                <Timeline />
              </div>
            } />
            <Route path="/map" element={
              <Suspense fallback={<div className="h-screen flex items-center justify-center text-sifar-gold font-cinzel text-xl">Loading Map...</div>}>
                <div className="pt-20 h-screen flex flex-col bg-sifar-black">
                  <Map />
                </div>
              </Suspense>
            } />
            <Route path="/explore" element={<DistrictExplore />} />
            <Route path="/district/:id" element={<DistrictDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/legal" element={<Legal />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;