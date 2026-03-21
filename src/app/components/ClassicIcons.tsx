import * as React from 'react';
export function ClassicIcons() {
  const icons = [
    {
      name: 'Класика',
      image: 'https://images.unsplash.com/photo-1647939436983-f3d0f8bcc4ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jcyUyMGNyb2NiYW5kJTIwc2hvZXMlMjBibHVlfGVufDF8fHx8MTc3Mzc1NTMwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Ручна робота',
      image: 'https://images.unsplash.com/photo-1714935101713-d6f6da0e2c4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jcyUyMGNsb2dzJTIwc2hvZXMlMjBncmVlbiUyMGNyYWZ0ZWR8ZW58MXx8fHwxNzczNzU1MzAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Крокбенд',
      image: 'https://images.unsplash.com/photo-1647939436983-f3d0f8bcc4ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jcyUyMGNyb2NiYW5kJTIwc2hvZXMlMjBibHVlfGVufDF8fHx8MTc3Mzc1NTMwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      underline: true,
    },
    {
      name: 'Квіткова',
      image: 'https://images.unsplash.com/photo-1647939436983-f3d0f8bcc4ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jcyUyMGNyb2NiYW5kJTIwc2hvZXMlMjBibHVlfGVufDF8fHx8MTc3Mzc1NTMwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section id="classic-icons" className="bg-[#F8F3EE] py-16 border-b border-[#EFE2D6]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9E8A7B]">Лінійки</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#2B2420]">Культові ікони бренду</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {icons.map((icon) => (
            <div
              key={icon.name}
              className="bg-white border border-[#E6D9CF] rounded-3xl p-8 flex flex-col items-center justify-between min-h-[360px] hover:border-[#C6A27A] transition cursor-pointer shadow-[0_18px_50px_rgba(125,98,78,0.2)]"
            >
              <h3 className={`text-3xl font-semibold text-[#2B2420] ${icon.underline ? 'underline' : ''}`}>
                {icon.name}
              </h3>
              <div className="w-full h-48 flex items-end justify-center">
                <img
                  src={icon.image}
                  alt={icon.name}
                  className="w-full h-full object-contain opacity-90"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#bestsellers"
            className="inline-flex bg-[#2B2420] text-[#F8F3EE] px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.25em] hover:bg-[#3A302A] transition"
          >
            Переглянути всі класичні моделі
          </a>
        </div>
      </div>
    </section>
  );
}
