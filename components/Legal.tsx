import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Legal: React.FC = () => {
  // Page load hone par upar scroll karein
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-sifar-black pt-32 pb-20 px-6 selection:bg-sifar-gold selection:text-black">
      <div className="max-w-4xl mx-auto font-inter text-sifar-muted leading-relaxed">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 border-b border-sifar-gray/20 pb-12">
          <h1 className="font-cinzel text-4xl md:text-5xl text-sifar-gold mb-4">The Covenant</h1>
          <p className="text-sm uppercase tracking-[0.2em] text-sifar-text opacity-70">
            Terms of Use & Privacy Policy
          </p>
          <p className="text-xs text-sifar-muted/40 mt-7 font-mono">
            Last Updated: February  {new Date().getFullYear()}  | Jurisdiction: Cuttack, India
          </p>
          <p className="text-xs text-sifar-muted/40 mt-2 font-times">
            Some personal information on this site has been modified for security and privacy reasons.
          </p>
        </div>

        {/* --- 1. PREAMBLE --- */}
        <section className="mb-16">
          <p className="text-lg text-sifar-text font-serif italic mb-6">
            "SIFAR is not a product; it is a confession. Entering this digital space is an agreement to respect the journey, the silence, and the stories told here."
          </p>
          <p>
            By accessing <strong>The Sifar Journey</strong> (the "Website"), you agree to be bound by these Terms. If you do not agree with any part of these terms, you must leave the digital premises immediately.
          </p>
        </section>

        {/* --- 2. INTELLECTUAL PROPERTY (The Artifacts) --- */}
        <section className="mb-16">
          <h2 className="text-2xl text-sifar-gold font-cinzel mb-6 flex items-center gap-3">
            <span className="text-sm opacity-50">01.</span> Intellectual Property
          </h2>
          <div className="pl-6 border-l border-sifar-gray/30 space-y-4">
            <p>
              <strong>Ownership:</strong> Every pixel, photograph, video, line of code, and written word on this Website is the exclusive intellectual property of <strong>Ryo</strong> (unless explicitly stated otherwise). These are not stock assets; they are memories captured with intent.
            </p>
            <p>
              <strong>Prohibited Use:</strong> You are <span className="text-red-400">strictly forbidden</span> from:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-sifar-muted/80">
              <li>Downloading, copying, or reproducing images/videos for commercial use.</li>
              <li>Removing watermarks or metadata from any media.</li>
              <li>Using my content for AI training datasets without written consent.</li>
            </ul>
            <p>
              <strong>Permitted Use:</strong> You may share links to my stories on social media, provided that full credit is given to "The Sifar Journey" with a direct link back to the original post.
            </p>
          </div>
        </section>

        {/* --- 3. PRIVACY POLICY (The Shadow) --- */}
        <section className="mb-16">
          <h2 className="text-2xl text-sifar-gold font-cinzel mb-6 flex items-center gap-3">
            <span className="text-sm opacity-50">02.</span> Privacy & Data
          </h2>
          <div className="pl-6 border-l border-sifar-gray/30 space-y-4">
            <p>
              <strong>Data Collection:</strong> We collect minimal data solely to improve the experience. This may include:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sifar-muted/80">
              <li><strong>Voluntary Info:</strong> Name and Email (only if you contact us).</li>
              <li><strong>Technical Data:</strong> IP address, browser type (for security & analytics).</li>
            </ul>
            <p>
              <strong>Zero-Sale Policy:</strong> I am a traveler, not a data broker. Your personal information will <strong>never</strong> be sold, rented, or traded to third parties.
            </p>
            <p>
              <strong>GDPR/CCPA Compliance:</strong> You have the right to request a copy of your data or demand its deletion ("The Right to be Forgotten"). Contact me at <a href="mailto:srinivassharma53886@gmail.com" className="text-sifar-gold hover:underline">srinivassharma53886@gmail.com</a>.
            </p>
          </div>
        </section>

        {/* --- 4. COOKIE POLICY (Digital Footprints) --- */}
        <section className="mb-16">
          <h2 className="text-2xl text-sifar-gold font-cinzel mb-6 flex items-center gap-3">
            <span className="text-sm opacity-50">03.</span> Cookie Policy
          </h2>
          <div className="pl-6 border-l border-sifar-gray/30 space-y-4">
            <p>
              Like footprints in the sand, cookies leave a trace. We use essential cookies to ensure the website functions correctly (e.g., loading maps, playing audio).
            </p>
            <p>
              <strong>Third-Party Services:</strong> We use trusted services like Cloudinary (for images) and Leaflet/OpenStreetMap (for maps) which may place their own cookies. By using this site, you consent to these "Digital Footprints."
            </p>
          </div>
        </section>

        {/* --- 5. DISCLAIMER (The Reality) --- */}
        <section className="mb-16">
          <h2 className="text-2xl text-sifar-gold font-cinzel mb-6 flex items-center gap-3">
            <span className="text-sm opacity-50">04.</span> Disclaimer
          </h2>
          <div className="pl-6 border-l border-sifar-gray/30 space-y-4">
            <p>
              <strong>Not a Guide:</strong> The maps and routes depicted here are personal records, not navigational advice. Roads in Bharat change with the rains. I am not liable for any loss, injury, or getting lost if you attempt to retrace my steps.
            </p>
            <p>
              <strong>Subjectivity:</strong> The stories are viewed through my lens. Historical or cultural references are based on local oral traditions and my research, which may differ from academic textbooks.
            </p>
          </div>
        </section>

        {/* --- 6. ETHICS & CONSENT (The Human Element) --- */}
        <section className="mb-16">
          <h2 className="text-2xl text-sifar-gold font-cinzel mb-6 flex items-center gap-3">
            <span className="text-sm opacity-50">05.</span> Ethics & Consent
          </h2>
          <div className="pl-6 border-l border-sifar-gray/30 space-y-4">
            <p>
              <strong>The Faces of Bharat:</strong> Every portrait on this site is taken with dignity and, where possible, verbal or written consent.
            </p>
            <p>
              <strong>Takedown Request:</strong> If you appear in a photograph and wish for it to be removed, please contact me with the image details. I respect the privacy of the soul as much as the privacy of data.
            </p>
          </div>
        </section>

        {/* --- 7. GOVERNING LAW --- */}
        <section className="mb-20">
           <p className="text-xs text-sifar-muted/50 font-mono border-t border-sifar-gray/10 pt-6">
             These terms shall be governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts in Cuttack, Odisha.
           </p>
        </section>

        {/* --- ACTION --- */}
        <div className="text-center">
            <Link to="/" className="group relative inline-flex items-center gap-3 px-8 py-3 bg-transparent border border-sifar-gold text-sifar-gold hover:bg-sifar-gold hover:text-black transition-all duration-300 rounded-sm overflow-hidden">
                <span className="font-cinzel font-bold tracking-widest text-sm relative z-10">Accept & Return</span>
                <div className="absolute inset-0 bg-sifar-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Legal;