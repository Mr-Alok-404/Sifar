import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === '/') return null;

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-20 left-4 md:left-8 z-40 flex items-center gap-2 px-3 py-1.5 bg-sifar-black/60 backdrop-blur-sm border border-sifar-gold/30 rounded text-sifar-gold hover:bg-sifar-gold hover:text-sifar-black transition-all duration-300 shadow-lg group"
    >
      <span className="text-sm group-hover:-translate-x-0.5 transition-transform">←</span>
      <span className="text-[10px] uppercase font-bold tracking-widest">Back</span>
    </button>
  );
};

export default BackButton;