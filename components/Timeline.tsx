import React, { useMemo } from 'react';
import { TIMELINE_DATA } from '../constants';
import { TimelineEvent } from '../types';

const parseFrontmatter = (content: string): Partial<TimelineEvent> => {
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

const Timeline: React.FC = () => {
  const cmsEvents = useMemo(() => {
    // ✅ FIX: Vite 5/6 Syntax
    const modules = import.meta.glob('/src/data/timeline/*.md', { 
        eager: true, 
        query: '?raw', 
        import: 'default' 
    });

    return Object.keys(modules).map((path) => {
      const content = modules[path] as string;
      const attributes = parseFrontmatter(content);
      if (!attributes.title || !attributes.date) return null;
      return {
        ...attributes,
        id: path,
        date: attributes.date,
        description: attributes.description || '',
        image: attributes.image || ''
      } as TimelineEvent;
    }).filter(Boolean) as TimelineEvent[];
  }, []);

  const allEvents = [...TIMELINE_DATA, ...cmsEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="max-w-4xl mx-auto px-6 relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sifar-gold via-sifar-gray to-transparent transform -translate-x-1/2"></div>
      <div className="space-y-12">
        {allEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={event.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-sifar-black border-2 border-sifar-gold rounded-full transform -translate-x-1/2 z-10 box-content"></div>
              <div className="flex-1 w-full md:w-1/2"></div>
              <div className={`flex-1 w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                <div className="bg-sifar-gray/20 border border-sifar-gold/10 p-6 rounded-lg hover:border-sifar-gold/40 transition-colors duration-300 group">
                  <span className="text-sifar-gold text-xs font-bold uppercase tracking-widest mb-2 block">{new Date(event.date).toLocaleDateString()}</span>
                  <h3 className="text-xl font-cinzel text-sifar-text mb-3 group-hover:text-sifar-gold transition-colors">{event.title}</h3>
                  <p className="text-sifar-muted font-inter text-sm leading-relaxed mb-4">{event.description}</p>
                  {event.image && (
                    <div className="w-full h-40 overflow-hidden rounded-md mt-4">
                      <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"/>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Timeline;