import React, { useState } from 'react';
import { FORMSPREE_ID } from '../constants';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setPurpose('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  // ✅ Shared Transparent Style for Inputs
  const inputClasses = "w-full bg-transparent border-b border-black/30 text-black font-medium px-0 py-3 focus:border-black focus:outline-none transition-all placeholder-gray-600 focus:placeholder-gray-800";
  const labelClasses = "block text-[10px] uppercase tracking-widest text-gray-800 mb-1 font-bold";

  return (
    <div className="relative min-h-screen pt-28 pb-12 px-6 flex items-center justify-center overflow-hidden">
       
       {/* 1. BACKGROUND IMAGE (Fixed ID for Faster Loading) */}
       <div 
         className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat fixed"
         style={{ 
            // ✅ FIX: Simple static number (random=20) for caching & speed
            backgroundImage: `url("https://picsum.photos/1920/1080?random=20")`,
            filter: "brightness(0.7) blur(2px) contrast(0.9)" 
         }}
       ></div>

       {/* Light Overlay */}
       <div className="absolute inset-0 z-0 bg-black/1 backdrop-blur-sm"></div>

       <div className="max-w-7xl mx-auto w-full relative z-10">
         
         {/* Hero Text */}
         <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-cinzel text-4xl md:text-6xl text-black mb-4 drop-shadow-sm">
              Collab with SIFAR
            </h1>
            <p className="text-gray-900 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                Brands, filmmakers, travelers – agar tumhe Bharat ki asli dhadkan dikhani hai, 
                toh chalo milkar 806 districts ki kahani likhte hain.
            </p>
            <p className="text-[18px] text-sifar-muted/40 text-center mt-7 font-cinzel">
                         Refresh This Page for New Background Image With Better vibes.
                    </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
           
           {/* Left Sidebar */}
           <div className="space-y-10 animate-fade-in-up delay-100">
              <div className="p-4">
                <h2 className="font-cinzel text-2xl text-black mb-4 font-bold">Business & Sponsorship</h2>
                <p className="text-gray-900 leading-relaxed mb-6 font-medium">
                    Long‑term ride partnerships, gear testing, tourism campaigns, documentary collabs – 
                    sab ke liye form bhar do. Main har genuine message ko dhyaan se padhta hoon.
                </p>
                
                <div className="space-y-4 border-l-2 border-black pl-6">
                   <h3 className="text-black font-bold uppercase tracking-wider text-xs">Why Partner?</h3>
                   <ul className="space-y-3 text-gray-900 text-sm font-medium">
                       <li className="flex items-center gap-3">❖ 806‑district documented journey</li>
                       <li className="flex items-center gap-3">❖ Raw, Cinematic & Unfiltered Storytelling</li>
                       <li className="flex items-center gap-3">❖ Authentic Audience Connection</li>
                   </ul>
                </div>
              </div>
              
              <div className="pl-4">
                  <p className="text-xs font-bold text-black uppercase mb-1 tracking-widest">Direct Line</p>
                  <code className="text-black font-mono text-lg tracking-wide font-bold">
                    <a href="mailto:srinivassharma53886@gmail.com" className="text-sifar-gold hover:underline">srinivassharma53886@gmail.com</a></code>
              </div>
           </div>

           {/* Right Side: Form */}
           <div className="p-4 md:p-8 animate-fade-in-up delay-200">
             
             <h2 className="font-cinzel text-2xl text-black mb-10 flex items-center gap-3">
                <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                Send a Proposal
             </h2>
             
             {status === 'success' ? (
                <div className="text-center py-12 border border-black/10 rounded-lg bg-white/20">
                    <div className="text-5xl text-black mb-4">✓</div>
                    <h3 className="text-2xl text-black mb-2 font-cinzel font-bold">Message Received</h3>
                    <p className="text-gray-800 mb-8 font-medium">The signal has reached the traveler.</p>
                    <button 
                        onClick={() => { setStatus('idle'); setPurpose(''); }}
                        className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded uppercase text-xs tracking-widest font-bold"
                    >
                        Send Another
                    </button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group">
                            <label className={labelClasses}>
                              Name / Company <span className="text-red-600">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                required 
                                className={inputClasses}
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="group">
                            <label className={labelClasses}>
                              Work Email <span className="text-red-600">*</span>
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                required 
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Please enter a valid email address"
                                className={`${inputClasses} invalid:border-red-500 invalid:text-red-600`}
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className={labelClasses}>
                          Purpose <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                            <select 
                                name="type" 
                                required 
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                className={`${inputClasses} appearance-none cursor-pointer bg-transparent text-black`}
                            >
                                <option value="" className="text-gray-500">Select an option</option>
                                <option value="sponsorship" className="text-black bg-white">Sponsorship / Brand Deal</option>
                                <option value="film" className="text-black bg-white">Film / Documentary</option>
                                <option value="tourism" className="text-black bg-white">Tourism / Hospitality</option>
                                <option value="media" className="text-black bg-white">Media Partnership</option>
                                <option value="other" className="text-black bg-white">Other</option>
                            </select>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-black text-xs">▼</div>
                        </div>
                    </div>

                    {/* DYNAMIC BOX FOR 'OTHER' */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${purpose === 'other' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="group">
                            <label className={`${labelClasses} text-black`}>
                              Please Specify Subject <span className="text-red-600">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="other_subject" 
                                required={purpose === 'other'} 
                                className={inputClasses}
                                placeholder="What's on your mind?"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className={labelClasses}>
                          Project Details <span className="text-red-600">*</span>
                        </label>
                        <textarea 
                            name="message" 
                            rows={3} 
                            required 
                            placeholder="Tell me the story: brand, locations, timeline, expectations..." 
                            className={`${inputClasses} resize-none`}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded shadow-lg transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {status === 'submitting' ? 'Transmitting...' : 'Send Message'}
                    </button>
                    
                    <p className="text-[10px] text-sifar-muted/40 text-center mt-7 font-cinzel">
                         By submitting, you agree that I can contact you back regarding this project.
                    </p>
                     <p className="text-[10px] text-sifar-muted/40 text-center mt-3 font-mono">
                        Secure Transmission. No spam, only adventures.
                    </p>

                </form>
             )}
           </div>

         </div>
       </div>
    </div>
  );
};

export default ContactForm;