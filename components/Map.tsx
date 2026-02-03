import React, { useEffect, useMemo } from 'react';
import { District } from '../types';

declare global {
  interface Window { L: any; }
}

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
  return attributes;
};

const parseCoordinates = (coordData: any): [number, number] | null => {
  if (!coordData) return null;
  try {
    if (typeof coordData === 'object' && Array.isArray(coordData.coordinates)) return [coordData.coordinates[1], coordData.coordinates[0]];
    let data = coordData;
    if (typeof coordData === 'string' && coordData.trim().startsWith('{')) {
        data = JSON.parse(coordData);
        if (data.coordinates) return [data.coordinates[1], data.coordinates[0]];
    }
    if (typeof coordData === 'string') {
      const parts = coordData.split(',').map(s => parseFloat(s.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) return [parts[0], parts[1]];
    }
  } catch (e) {}
  return null;
};

const Map: React.FC = () => {
  const cmsDistricts = useMemo(() => {
    // ✅ FIX: NEW VITE SYNTAX
    const modules = import.meta.glob('/src/data/districts/*.md', { 
        eager: true, 
        query: '?raw', 
        import: 'default' 
    });
    return Object.keys(modules).map((path) => {
      const content = modules[path] as string;
      const attr = parseFrontmatter(content);
      const coords = parseCoordinates(attr.coordinates);
      if (!coords || !attr.name) return null;
      return {
        id: attr.id || path.split('/').pop()?.replace('.md', ''),
        name: attr.name,
        state: attr.state || 'India',
        status: attr.status || 'planned',
        coordinates: coords,
        stats: {
            daysSpent: parseInt(attr.days_spent || '0'),
            distanceCovered: parseInt(attr.distance_km || '0')
        }
      } as District;
    }).filter(Boolean) as District[];
  }, []);

  useEffect(() => {
    if (!window.L) return;
    const container = window.L.DomUtil.get('map');
    if(container != null) container._leaflet_id = null;
    const map = window.L.map('map', { center: [22.9734, 78.6569], zoom: 5, zoomControl: false, attributionControl: false });
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
    window.L.control.zoom({ position: 'bottomright' }).addTo(map);

    cmsDistricts.forEach((district) => {
        let marker;
        if (district.status === 'milestone') {
            marker = window.L.circleMarker(district.coordinates, { radius: 9, fillColor: '#f4c430', color: '#f4c430', weight: 2, opacity: 0.6, fillOpacity: 1 }).addTo(map);
            window.L.circleMarker(district.coordinates, { radius: 14, fillColor: 'transparent', color: '#f4c430', weight: 1, opacity: 0.3, className: 'animate-pulse' }).addTo(map);
            bindDetailedPopup(marker, district, 'text-sifar-gold');
        } else if (district.status === 'visited') {
            marker = window.L.circleMarker(district.coordinates, { radius: 6, fillColor: '#10b981', color: '#ffffff', weight: 1, opacity: 0.8, fillOpacity: 0.8 }).addTo(map);
            bindDetailedPopup(marker, district, 'text-green-400');
        } else if (district.status === 'transit') {
            marker = window.L.circleMarker(district.coordinates, { radius: 5, fillColor: '#ffffff', color: '#f4c430', weight: 1, opacity: 0.8, fillOpacity: 1 }).addTo(map);
            bindDetailedPopup(marker, district, 'text-white');
        } else {
            marker = window.L.circleMarker(district.coordinates, { radius: 4, fillColor: '#333', color: '#666', weight: 1, opacity: 0.5, fillOpacity: 0.3 }).addTo(map);
            marker.bindTooltip(district.name, { direction: 'top', className: 'bg-sifar-black text-xs border border-sifar-gray text-sifar-muted px-1' });
        }
    });
    return () => map.remove();
  }, [cmsDistricts]);

  const bindDetailedPopup = (marker: any, district: District, titleColorClass: string) => {
    marker.bindPopup(`<div class="font-sans text-center min-w-[160px]"><p class="text-[10px] text-sifar-muted uppercase tracking-wider mb-1">${district.state}</p><h3 class="font-bold ${titleColorClass} text-sm mb-2">${district.name}</h3><div class="flex justify-center gap-3 border-t border-gray-700 pt-2 mt-2"><div class="text-center"><span class="block text-[10px] text-sifar-gold">Days</span><span class="text-xs text-white font-mono">${district.stats?.daysSpent || 0}</span></div><div class="text-center"><span class="block text-[10px] text-sifar-gold">Km</span><span class="text-xs text-white font-mono">${district.stats?.distanceCovered || 0}</span></div></div><a href="#/district/${district.id}" class="block mt-3 text-[10px] bg-white/5 text-sifar-muted py-1 rounded hover:bg-white/10 hover:text-white transition-colors">Read Chronicle →</a></div>`);
  };

  return (
    <div className="relative w-full h-full bg-sifar-black">
      <div id="map" className="w-full h-full z-10"></div>
      <div className="absolute top-10 left-0 w-full z-[900] pointer-events-none flex justify-center px-4">
         <div className="bg-sifar-black/60 backdrop-blur-md border border-sifar-gold/30 px-6 py-2 rounded-full shadow-2xl animate-fade-in-up">
            <p className="font-cinzel text-xs md:text-sm text-sifar-gold tracking-[0.2em] text-center uppercase">"A map is not a guide; it is a confession."</p>
         </div>
      </div>
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-[1000] bg-sifar-black/80 backdrop-blur border border-sifar-gold/20 p-3 md:p-4 rounded-lg shadow-xl max-w-[200px] md:max-w-xs transition-all">
        <h4 className="font-cinzel text-sifar-gold text-xs md:text-sm mb-2">The Legend</h4>
        <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-sifar-gold border border-sifar-gold"></span><span className="text-[10px] md:text-xs text-sifar-text">Soul Stop</span></div>
        <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 border border-white"></span><span className="text-[10px] md:text-xs text-sifar-text">Conquered</span></div>
        <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white border border-sifar-gold"></span><span className="text-[10px] md:text-xs text-sifar-text">Transit</span></div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-sifar-gray border border-sifar-muted"></span><span className="text-[10px] md:text-xs text-sifar-text">Planned</span></div>
      </div>
    </div>
  );
};
export default Map;