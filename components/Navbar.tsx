import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationItem } from '../types';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  toggleAudio: () => void;
  isMuted: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode, toggleAudio, isMuted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: NavigationItem.HOME },
    { name: 'Timeline', path: NavigationItem.TIMELINE },
    { name: 'Map', path: NavigationItem.MAP },
    { name: 'Explore', path: NavigationItem.EXPLORE },
    { name: 'Gallery', path: NavigationItem.GALLERY },
    { name: 'Contact', path: NavigationItem.CONTACT },
  ];

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-sm uppercase tracking-widest font-semibold transition-colors duration-300 ${
      isActive ? 'text-sifar-gold' : 'text-sifar-text hover:text-sifar-gold'
    }`;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-sifar-black/95 backdrop-blur-md border-sifar-border py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-cinzel text-2xl font-bold text-sifar-gold tracking-widest">
          SIFAR
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={getLinkClass(link.path)}>
              {link.name}
            </Link>
          ))}

          <div className="h-6 w-px bg-sifar-border mx-4"></div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-sifar-text hover:text-sifar-gold transition-colors">
              {isDarkMode ? (
                <span title="Switch to Light Mode">☀︎</span>
              ) : (
                <span title="Switch to Dark Mode">☾</span>
              )}
            </button>

            {/* Audio Toggle */}
            <button onClick={toggleAudio} className={`text-sifar-text hover:text-sifar-gold transition-colors ${isMuted ? 'animate-pulse' : ''}`}>
              {isMuted ? (
                <span title="Unmute Music">🔇</span>
              ) : (
                <span title="Mute Music">🔊</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
             {/* Mobile Controls */}
            <button onClick={toggleTheme} className="text-sifar-text">
              {isDarkMode ? '☀︎' : '☾'}
            </button>
            <button onClick={toggleAudio} className="text-sifar-text">
              {isMuted ? '🔇' : '🔊'}
            </button>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-sifar-text focus:outline-none ml-2"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
                </svg>
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-sifar-black border-b border-sifar-border transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-4 px-6 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={getLinkClass(link.path)}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;