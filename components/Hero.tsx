import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HERO_VIDEO } from '../constants'; // <--- CHANGE: Image ki jagah Video import karein

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Function to smoothly scroll down
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      
      {/* ✅ NEW: Video Background with Parallax */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{
          transform: `translateY(${offset * 0.5}px) scale(1.1)`, // Parallax effect maintained
        }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 mix-blend-overlay"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="font-cinzel text-5xl md:text-7xl lg:text-9xl font-bold text-sifar-gold mb-4 tracking-wider drop-shadow-2xl">
          SIFAR
        </h1>
        <p className="font-inter text-xl md:text-2xl text-sifar-text tracking-[0.2em] font-light mb-2">
          शून्य से आरम्भ, समय से आगे
        </p>
        <div className="w-24 h-1 bg-sifar-gold mx-auto my-6"></div>
        <p className="font-inter text-sifar-muted max-w-2xl mx-auto text-lg leading-relaxed mb-8">
          806 Districts. 12 Years. One Soul. <br/>
          A journey to document the raw, forgotten reality of Bharat.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto relative group">
          <input 
            type="text" 
            placeholder="Search for a district..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border border-sifar-gold/50 backdrop-blur-md text-sifar-text px-6 py-3 rounded-full focus:outline-none focus:border-sifar-gold transition-all duration-300 pr-12 placeholder-sifar-muted/80 shadow-lg"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sifar-gold p-2 hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </button>
        </form>
        
        {/* Clickable Scroll Arrow */}
        <div className="mt-16 cursor-pointer" onClick={scrollDown}>
          <div className="animate-bounce">
            <span className="text-sifar-gold text-2xl">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;