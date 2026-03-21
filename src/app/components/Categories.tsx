import * as React from 'react';

export function Categories() {
  const terrains = [
    {
      name: 'ЖІНОЧА КОЛЕКЦІЯ',
      tag: 'WOMEN',
      colSpan: 'md:col-span-2',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop',
      href: '#page/women'
    },
    {
      name: 'ЧОЛОВІЧА КОЛЕКЦІЯ',
      tag: 'MEN',
      colSpan: 'md:col-span-1',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
      href: '#page/men'
    },
    {
      name: 'ДИТЯЧЕ ВЗУТТЯ',
      tag: 'KIDS',
      colSpan: 'md:col-span-1',
      image: 'https://images.unsplash.com/photo-1514090259040-e221375dcb01?q=80&w=800&auto=format&fit=crop',
      href: '#page/kids'
    },
    {
      name: 'ВЗУВАЧКА PRO™',
      tag: 'ДЛЯ РОБОТИ / ЕКСТРИМУ',
      colSpan: 'md:col-span-2',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop',
      href: '#page/work'
    },
  ];

  return (
      <section id="categories" className="py-24 bg-black border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              ЕКІПІРУВАННЯ ДЛЯ <br/><span className="text-red-600">КОЖНОГО</span>
            </h2>
            <span className="text-[10px] font-mono text-gray-500 hidden md:block tracking-widest uppercase">Select Department [01-04]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {terrains.map((terrain, index) => (
                <a key={terrain.name} href={terrain.href} className={`group relative h-[400px] overflow-hidden bg-zinc-900 ${terrain.colSpan} fade-up tech-clip`} style={{ animationDelay: `${index * 0.1}s` }}>

                  {/* Чорно-біле фото, яке стає кольоровим при наведенні */}
                  <img src={terrain.image} alt={terrain.name} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />

                  {/* Технічний градієнт */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="self-start px-3 py-1.5 bg-black/80 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest tech-clip border border-white/10">
                      {terrain.tag}
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {terrain.name}
                      </h3>
                      {/* Анімована лінія замість підкреслення */}
                      <div className="h-[4px] w-0 bg-red-600 mt-4 group-hover:w-24 transition-all duration-500" />
                    </div>
                  </div>
                </a>
            ))}
          </div>
        </div>
      </section>
  );
}