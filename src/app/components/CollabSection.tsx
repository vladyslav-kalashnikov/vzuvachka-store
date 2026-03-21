import * as React from 'react';

export function CollabSection() {
  return (
      <section className="py-24 bg-[#111] text-white">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 fade-up">
              <p className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-bold mb-6">Філософія бренду</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                ДОСЛІДЖУЙ<br/><span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>ТЕРИТОРІЮ.</span>
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed max-w-md mb-10 text-sm border-l-2 border-red-600 pl-4">
                Ваші ноги заслуговують на найкраще в будь-якій локації. Калоші, чоботи чи тапочки — кожна категорія розроблена для абсолютного комфорту та захисту на твій території.
              </p>
              <a href="#page/categories" className="inline-block bg-white text-black px-10 py-5 text-xs font-extrabold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors tech-clip">
                Відкрити каталоги
              </a>
            </div>
            <div className="order-1 md:order-2 fade-up" style={{ animationDelay: '0.2s' }}>
              <img
                  src="Знімок екрана 2026-03-19 о 18.56.32.png"
                  alt="Досліджуй територію"
                  className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-[2s] tech-clip"
              />
            </div>
          </div>
        </div>
      </section>
  );
}