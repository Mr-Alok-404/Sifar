import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { District } from '../types';

// Helper to parse Frontmatter
const parseFrontmatter = (content: string): any => {
  const match = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return {};
  
  const frontmatterBlock = match[1];
  const attributes: any = {};
  
  frontmatterBlock.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    attributes[key] = value;
  });
  
  // Extract body content (story)
  const body = content.replace(/^---\s*[\s\S]*?\s*---/, '').trim();
  attributes.fullStory = body;
  
  return attributes;
};

// CRASH-PROOF Coordinate Parser
const parseCoordinates = (coordData: any): [number, number] => {
  if (!coordData) return [0, 0];

  try {
    if (typeof coordData === 'object' && Array.isArray(coordData.coordinates)) {
        return [coordData.coordinates[1], coordData.coordinates[0]];
    }
    if (typeof coordData === 'string' && coordData.trim().startsWith('{')) {
        const parsed = JSON.parse(coordData);
        if (parsed.coordinates && Array.isArray(parsed.coordinates)) {
             return [parsed.coordinates[1], parsed.coordinates[0]];
        }
    }
    if (typeof coordData === 'string') {
      const parts = coordData.split(',').map(s => parseFloat(s.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return [parts[0], parts[1]];
      }
    }
  } catch (err) {
    console.warn("Failed to parse coordinates:", err);
  }
  return [0, 0];
};

const DistrictDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [district, setDistrict] = useState<District | null>(null);

  // 1. Load ONLY CMS Districts
  const cmsDistricts = useMemo(() => {
    // ✅ VITE 6 FIX: Use query: '?raw' instead of as: 'raw'
    const modules = import.meta.glob('/src/data/districts/*.md', { 
        eager: true, 
        query: '?raw', 
        import: 'default' 
    });

    return Object.keys(modules).map((path) => {
      const content = modules[path] as string;
      const attributes = parseFrontmatter(content);
      
      // Safety Check: If name is missing, skip
      if (!attributes.name) return null;

      // Construct District Object from CMS Data
      return {
        id: attributes.id || path.split('/').pop()?.replace('.md', '') || '',
        name: attributes.name,
        state: attributes.state || 'India',
        description: attributes.description || '',
        fullStory: attributes.fullStory || attributes.body || attributes.description,
        image: attributes.image || '',
        status: attributes.status || 'planned',
        
        coordinates: parseCoordinates(attributes.coordinates),
        
        stats: {
            daysSpent: parseInt(attributes.days_spent || '0'),
            distanceCovered: parseInt(attributes.distance_km || '0')
        },
        
        quotes: attributes.quote_text 
            ? [{ text: attributes.quote_text, author: attributes.quote_author || 'Ryo' }] 
            : []
      } as District;
    }).filter(Boolean) as District[];
  }, []);

  useEffect(() => {
    // ✅ PURE CMS LOGIC: Only search within loaded Markdown files
    const found = cmsDistricts.find(d => d.id === id);

    if (found) {
      setDistrict(found);
      window.scrollTo(0, 0);
    } else {
        setDistrict(null);
    }
  }, [id, cmsDistricts]);

  // If ID doesn't exist in CMS, show Not Found
  if (!district) {
    return (
      <div className="min-h-screen bg-sifar-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-sifar-gold font-cinzel">District Not Found</h2>
          <p className="text-sifar-muted mt-2 text-sm">
            ID: <span className="font-mono text-sifar-gold">{id}</span> is not yet archived.
          </p>
          <Link to="/explore" className="text-sifar-muted hover:text-white underline mt-4 block">Return to Map</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sifar-black pb-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img src={district.image} alt={district.name} className="w-full h-full object-cover filter brightness-50"/>
        <div className="absolute inset-0 bg-gradient-to-t from-sifar-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-5xl mx-auto">
             <span className="bg-sifar-gold text-sifar-black px-3 py-1 text-xs font-bold uppercase tracking-widest rounded mb-4 inline-block">
               {district.id} | {district.state}
             </span>
             <h1 className="font-cinzel text-5xl md:text-7xl text-sifar-text font-bold mb-4">{district.name}</h1>
             
             {/* Stats Display */}
             <div className="flex gap-8 text-sm text-sifar-muted font-mono">
                {district.stats && (
                    <>
                    <span className="flex items-center gap-2">
                        <span className="text-sifar-gold">⏳</span> {district.stats.daysSpent} Days
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="text-sifar-gold">🏍️</span> {district.stats.distanceCovered} Km
                    </span>
                    </>
                )}
                {/* Coordinates Display */}
                {district.coordinates && district.coordinates[0] !== 0 && (
                    <span className="flex items-center gap-2 hidden md:flex">
                        <span className="text-sifar-gold">📍</span> {district.coordinates[0].toFixed(4)}° N, {district.coordinates[1].toFixed(4)}° E
                    </span>
                )}
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {/* Story Section */}
        <div className="mb-16">
           <h2 className="font-cinzel text-2xl text-sifar-gold mb-6">The Story</h2>
           <div className="prose prose-invert max-w-none">
             <p className="text-lg md:text-xl leading-loose font-serif text-sifar-text/90 border-l-4 border-sifar-gold pl-6 py-2 whitespace-pre-line">
               {district.fullStory || district.description}
             </p>
           </div>
        </div>

        {/* Quotes Section */}
        {district.quotes && district.quotes.length > 0 && (
          <div className="mb-16">
            <h2 className="font-cinzel text-2xl text-sifar-gold mb-8">Echoes from the Road</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {district.quotes.map((quote, idx) => (
                <div key={idx} className="bg-sifar-gray/10 p-8 border border-sifar-gray/30 rounded-lg relative hover:border-sifar-gold/30 transition-colors">
                  <span className="absolute top-4 left-4 text-4xl text-sifar-gold opacity-20 font-serif">"</span>
                  <p className="text-sifar-text italic mb-4 relative z-10 font-light text-lg">{quote.text}</p>
                  <p className="text-right text-xs text-sifar-gold uppercase tracking-wider">— {quote.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logbook / Archive Note */}
        <div className="p-6 bg-sifar-gray/10 rounded-xl border border-dashed border-sifar-gray/50 text-center">
            <h3 className="text-sifar-muted text-sm uppercase mb-2">Traveler's Log</h3>
            <p className="text-sifar-muted/60 text-sm">Additional data for {district.name} is archived in the physical logbook.</p>
        </div>
      </div>
    </div>
  );
};

export default DistrictDetail;