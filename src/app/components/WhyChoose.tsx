import * as React from 'react';
import { ShieldCheck, Layers, Activity } from 'lucide-react';

const features = [
    { title: 'ПРЕМІУМ МАТЕРІАЛИ', desc: 'Екологічний матовий каучук та надлегка піна EVA для екстремальних умов.', icon: Layers },
    { title: 'БЕЗКОМПРОМІСНИЙ КОНТРОЛЬ', desc: 'Кожна пара проходить багаторівневий краш-тест та перевірку якості.', icon: ShieldCheck },
    { title: 'АДАПТИВНА АНАТОМІЯ', desc: 'Устілка, що приймає форму стопи, гасить удари та розподіляє навантаження.', icon: Activity },
];

export function WhyChoose() {
    return (
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
            {/* Декоративна сітка на фоні */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16 fade-up">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-bold mb-4 block">Технічні специфікації</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Стандарт <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Витривалості</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div key={i} className="bg-[#111] border border-white/10 p-8 hover:border-red-600 transition-colors group tech-clip fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors tech-clip">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-black tracking-tight uppercase mb-3 text-white">{feature.title}</h3>
                                <p className="text-[13px] text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}