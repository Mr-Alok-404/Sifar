import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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

const Stats: React.FC = () => {
  const DIARY_LINK = "https://your-notion-link-here.com"; 

  const cmsStats = useMemo(() => {
    // ✅ FIX: Vite 5/6 Syntax
    const modules = import.meta.glob('/src/data/districts/*.md', { 
        eager: true, 
        query: '?raw', 
        import: 'default' 
    });
    return Object.values(modules).map((content) => {
      const attr = parseFrontmatter(content as string);
      return { status: attr.status || 'planned' };
    });
  }, []);

  const totalDistricts = 806; 
  const completedCount = cmsStats.filter(d => d.status === 'visited' || d.status === 'milestone' || d.status === 'transit').length;
  const remaining = totalDistricts - completedCount;
  const percentage = ((completedCount / totalDistricts) * 100).toFixed(1);

  const data = [
    { name: 'Completed', value: completedCount, fill: '#f4c430' },
    { name: 'Remaining', value: remaining, fill: '#262626' },
  ];

  return (
    <section className="py-20 bg-sifar-dark border-t border-sifar-gray/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left min-w-0">
            <h2 className="font-cinzel text-3xl md:text-4xl text-sifar-text mb-4">The <span className="text-sifar-gold">Master Plan</span></h2>
            <p className="font-inter text-sifar-muted mb-6 leading-relaxed">Tracking the soul of India, one coordinate at a time.</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 border border-sifar-gold/20 rounded-lg bg-sifar-black/50">
                <h3 className="text-3xl font-bold text-sifar-gold animate-pulse">{completedCount}</h3>
                <p className="text-sm text-sifar-text uppercase tracking-wider mt-1">Districts Conquered</p>
              </div>
              <a href={DIARY_LINK} target="_blank" rel="noopener noreferrer" className="group p-4 border border-sifar-gold/20 rounded-lg bg-sifar-black/50 hover:bg-sifar-gold/10 hover:border-sifar-gold transition-all duration-300 cursor-pointer flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity"><span className="text-sifar-gold text-xs">↗</span></div>
                <h3 className="text-xl font-cinzel font-bold text-sifar-text group-hover:text-sifar-gold transition-colors">The Logbook</h3>
                <p className="text-xs text-sifar-muted uppercase tracking-wider mt-2 group-hover:text-sifar-text transition-colors">Read Daily Entries</p>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[300px] relative min-w-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={80} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#f4c430', color: '#e8e8e8' }} itemStyle={{ color: '#f4c430' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="block text-4xl font-bold text-sifar-gold">{percentage}%</span>
              <span className="text-xs text-sifar-muted uppercase tracking-widest">Complete</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Stats;