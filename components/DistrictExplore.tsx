import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

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

const DistrictExplore: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<'all' | 'visited' | 'planned'>('all');
  const [search, setSearch] = useState('');

  // ✅ FIX: Vite 6 Syntax
  const allDistricts = useMemo(() => {
    const modules = import.meta.glob('/src/data/districts/*.md', { 
        eager: true, 
        query: '?raw', 
        import: 'default' 
    });

    return Object.keys(modules).map((path) => {
      const content = modules[path] as string;
      const attributes = parseFrontmatter(content);
      if (!attributes.name && !attributes.title) return null;
      const fileId = attributes.id || path.split('/').pop()?.replace('.md', '') || '';
      return {
        id: fileId,
        name: attributes.name || attributes.title,
        state: attributes.state || 'India',
        description: attributes.description || '',
        image: attributes.image || '',
        status: attributes.status === 'visited' ? 'visited' : 'planned',
        coordinates: [0, 0]
      };
    }).filter(Boolean) as any[];
  }, []);

  const filteredDistricts = allDistricts.filter(d => {
    const matchesFilter = filter === 'all' || d.status === filter;
    const searchLower = search.toLowerCase();
    const matchesSearch = d.name.toLowerCase().includes(searchLower) || d.state.toLowerCase().includes(searchLower) || d.id.toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) setSearch(query);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-sifar-black pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-cinzel text-4xl text-sifar-gold mb-4">Explore the Map</h1>
          <p className="text-sifar-muted">Searching for the dark & beautiful reality.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex space-x-2 bg-sifar-gray/30 p-1 rounded-lg">
            {(['all', 'visited', 'planned'] as const).map((status) => (
              <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === status ? 'bg-sifar-gold text-sifar-black shadow-lg' : 'text-sifar-text hover:text-sifar-gold'} capitalize`}>{status}</button>
            ))}
          </div>
          <input type="text" placeholder="Search District, State or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full md:w-64 bg-sifar-gray/20 border border-sifar-gray/50 text-sifar-text px-4 py-2 rounded-lg focus:outline-none focus:border-sifar-gold transition-colors"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDistricts.map((district) => (
            <Link to={`/district/${district.id}`} key={district.id} className="block group animate-fade-in-up">
              <div className="relative bg-sifar-gray/10 rounded-xl overflow-hidden border border-sifar-gray/30 hover:border-sifar-gold/50 transition-all duration-300 h-full flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img src={district.image || 'https://via.placeholder.com/600x400?text=No+Image'} alt={district.name} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"/>
                  <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold uppercase rounded ${district.status === 'visited' ? 'bg-green-900/80 text-green-300' : 'bg-sifar-gray/80 text-sifar-muted'}`}>{district.status}</div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div><p className="text-xs text-sifar-gold uppercase tracking-wider mb-1">{district.state}</p><h3 className="text-xl font-cinzel text-sifar-text mb-2 group-hover:text-sifar-gold transition-colors">{district.name}</h3><p className="text-sm text-sifar-muted line-clamp-2 mb-4">{district.description || "No description available yet."}</p></div>
                  <div className="pt-4 border-t border-sifar-gray/20 flex justify-between items-center mt-auto"><span className="text-xs font-mono text-sifar-muted">{district.id}</span><span className="text-xs text-sifar-gold opacity-0 group-hover:opacity-100 transition-opacity">Read Story →</span></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DistrictExplore;