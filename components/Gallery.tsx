import React, { useState, useMemo } from 'react';
import { GALLERY_DATA } from '../constants';
import { GalleryItem } from '../types';

const parseFrontmatter = (content: string): Partial<GalleryItem> => {
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
  return attributes;
};

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // 1. Load CMS Data (Dynamic)
  const cmsGalleryItems = useMemo(() => {
    // ✅ FIX: Vite 6 Syntax
    const modules = import.meta.glob('/src/data/gallery/*.md', { 
        eager: true, 
        query: '?raw', 
        import: 'default' 
    });

    return Object.keys(modules).map((path) => {
      const content = modules[path] as string; 
      const attributes = parseFrontmatter(content);
      if (!attributes.caption && !(attributes as any).title) return null;

      return {
        id: path,
        url: (attributes as any).image || attributes.url || '', 
        caption: attributes.caption || (attributes as any).title || '',
        location: attributes.location || 'Unknown Location',
        date: attributes.date || 'Recently'
      } as GalleryItem;
    }).filter(Boolean) as GalleryItem[];
  }, []);

  return (
    <div className="min-h-screen bg-sifar-black pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* === SECTION 1: CMS ARCHIVES (With Date & Location) === */}
        {cmsGalleryItems.length > 0 && (
          <div className="mb-24">
            <div className="text-center mb-16">
              <h1 className="font-cinzel text-4xl text-sifar-gold mb-4">The Archives</h1>
              <p className="text-sifar-muted">The World, Through My Lens</p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {cmsGalleryItems.map((item) => (
                <div key={item.id} className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg bg-sifar-gray/20 border border-sifar-gray/30 hover:border-sifar-gold/50 transition-colors" onClick={() => setSelectedItem(item)}>
                  <img src={item.url} alt={item.caption} loading="lazy" className="w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    {/* CMS Items show Date & Location */}
                    <p className="text-sifar-gold text-xs uppercase tracking-widest mb-1">{item.location} | {item.date}</p>
                    <p className="text-white font-cinzel text-lg drop-shadow-md">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === SECTION 2: STATIC CONSTANTS (Clean Look) === */}
        {GALLERY_DATA.length > 0 && (
          <div>
            {/* Divider */}
            <div className="flex items-center justify-center mb-12">
               <div className="h-px bg-sifar-gray/30 w-1/3"></div>
               <div className="w-2 h-2 bg-sifar-gold rounded-full mx-4"></div>
               <div className="h-px bg-sifar-gray/30 w-1/3"></div>
            </div>

            <div className="text-center mb-12">
              <h2 className="font-cinzel text-3xl text-sifar-text">Colours Can't Forget</h2>
              <p className="text-sifar-muted text-sm mt-2 tracking-wide uppercase text-sifar-gold">Some Random Shots</p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {GALLERY_DATA.map((item) => (
                <div key={item.id} className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg bg-sifar-gray/20 border border-sifar-gray/30 hover:border-sifar-gold/50 transition-colors" onClick={() => setSelectedItem(item)}>
                  <img src={item.url} alt={item.caption} loading="lazy" className="w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    {/* Static Items ONLY show Caption */}
                    <p className="text-white font-cinzel text-lg drop-shadow-md text-center border-b-2 border-sifar-gold pb-2 inline-block mx-auto">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Modal (Works for BOTH) */}
        {selectedItem && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
            <button className="absolute top-6 right-6 text-white text-4xl hover:text-sifar-gold transition-colors">&times;</button>
            <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full h-full">
                <img src={selectedItem.url} alt={selectedItem.caption} className="max-h-[80vh] w-auto mx-auto object-contain rounded-sm shadow-2xl border border-sifar-gray/20"/>
              </div>
              <div className="mt-6 text-center">
                 <h3 className="text-sifar-gold font-cinzel text-xl">{selectedItem.caption}</h3>
                 {/* Only show date/location if they exist (i.e. for CMS items) */}
                 {selectedItem.location && selectedItem.date && (
                    <p className="text-sifar-muted text-sm mt-2 uppercase tracking-widest">{selectedItem.location} — {selectedItem.date}</p>
                 )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;