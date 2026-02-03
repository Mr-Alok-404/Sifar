import React from 'react';
import { Link } from 'react-router-dom';
import { SiThreads, SiBluesky, SiX } from 'react-icons/si';
import { 
  FaYoutube, 
  FaInstagram, 
  FaFacebookF, 
  FaWhatsapp, 
  FaTelegramPlane, 
  FaPinterestP, 
  FaRedditAlien, 
  FaLinkedinIn, 
  FaGithub, 
  FaDiscord, 
  FaSnapchatGhost, 
  FaEnvelope,
  FaMedium,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'YouTube', url: 'https://youtube.com', icon: <FaYoutube /> },
    { name: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram /> },
    { name: 'Facebook', url: 'https://facebook.com', icon: <FaFacebookF /> },
    { name: 'WhatsApp', url: 'https://whatsapp.com', icon: <FaWhatsapp /> },
    { name: 'Telegram', url: 'https://telegram.org', icon: <FaTelegramPlane /> },
    { name: 'Pinterest', url: 'https://pinterest.com', icon: <FaPinterestP /> },
    { name: 'Reddit', url: 'https://reddit.com', icon: <FaRedditAlien /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mr-alok-404-zeno/', icon: <FaLinkedinIn /> },
    { name: 'GitHub', url: 'https://github.com/Mr-Alok-404', icon: <FaGithub /> },
    { name: 'X (formerly Twitter)', url: 'https://x.com', icon: <SiX /> },
    { name: 'Discord', url: 'https://discord.com', icon: <FaDiscord /> },
    { name: 'Snapchat', url: 'https://snapchat.com', icon: <FaSnapchatGhost /> },
    { name: 'Email', url: 'mailto:srinivassharma53886@gmail.com', icon: <FaEnvelope /> },
    { name: 'Medium', url: 'https://medium.com', icon: <FaMedium /> },
    { name: 'Threads', url: 'https://threads.net', icon: <SiThreads /> },
    { name: 'Bluesky', url: 'https://blueskyweb.xyz', icon: <SiBluesky /> },

  ];

  return (
    <footer className="bg-sifar-dark border-t border-sifar-border py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            {/* Branding */}
            <div className="max-w-sm">
                <h3 className="font-cinzel text-3xl text-sifar-gold font-bold mb-4">SIFAR</h3>
                <p className="text-sifar-muted text-sm leading-relaxed mb-6">
                    A digital museum documenting the raw, forgotten reality of Bharat. 
                    806 Districts. 12 Years. One Soul.
                </p>
                <p className="text-xs text-sifar-muted/50">Built with Soul & Code.</p>
            </div>

            {/* Social Grid */}
            <div className="flex-1">
                <h4 className="font-cinzel text-sifar-text text-lg mb-6 border-b border-sifar-border pb-2 inline-block">Connect with</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
                    {socialLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="group flex items-center gap-3 text-sm text-sifar-muted hover:text-sifar-gold transition-all duration-300 p-2 rounded hover:bg-sifar-gray/10"
                        >
                            <span className="text-lg text-sifar-gold/80 group-hover:text-sifar-gold group-hover:scale-110 transition-transform duration-300">
                                {link.icon}
                            </span>
                            <span className="font-medium">{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sifar-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-xs font-inter uppercase tracking-wider">
                <Link to="/legal" className="text-sifar-muted hover:text-sifar-gold transition-colors">Privacy Policy</Link>
                <Link to="/legal" className="text-sifar-muted hover:text-sifar-gold transition-colors">Terms of Use</Link>
            </div>

            <div className="text-center md:text-right">
                <p className="text-xs text-sifar-muted italic">
                    "The journey begins where the comfort zone ends."
                </p>
                <p className="text-[10px] text-sifar-muted/40 mt-1 font-mono">
                    © Copyright The Sifar Journey by Ryo from 2025 to {new Date().getFullYear()} All Rights are Reserved.
                </p>
                <p className="text-[10px] text-sifar-muted/40 mt-1 font-cinzel">
                    Collect Moments, not Codes & Things.
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;