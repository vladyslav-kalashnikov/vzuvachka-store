import * as React from 'react';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
    return (
        <section id="hero" className="relative h-screen min-h-[700px] w-full flex flex-col justify-end pb-24 px-6 overflow-hidden bg-black">
            {/* Динамічне атмосферне фото (бруд, вода, екстрим) */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 duration-1000 ease-out"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2000&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Елемент HUD */}
            <div className="absolute top-32 left-6 hidden md:block text-[10px] font-mono text-white/50 tracking-widest">
                <p>ZONE: ВУЛИЦЯ / ДІМ</p>
                <p>COND: БРУД / ВОДА</p>
                <p>TEMP: -10°C ... +30°C</p>
            </div>

            <div className="relative z-10 max-w-[1600px] w-full mx-auto fade-up">
                <div className="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 mb-4 tracking-widest tech-clip uppercase">
                    Нове надходження екіпірування
                </div>

                <h1 className="text-6xl md:text-[100px] lg:text-[130px] font-black leading-[0.85] tracking-tighter text-white mb-6 uppercase">
                    Підкорюй <br/>
                    <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Будь-який бруд.</span>
                </h1>

                <p className="text-sm md:text-lg text-gray-300 max-w-xl font-medium mb-10 border-l-2 border-red-600 pl-4">
                    Від професійних рибальських чобіт до затишних домашніх тапочок. Ультралегкі матеріали, абсолютний захист від води та безкомпромісний комфорт у будь-яких умовах.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a href="#categories" className="w-full sm:w-auto px-10 py-5 bg-white text-black text-xs uppercase tracking-widest font-extrabold hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-3 tech-clip">
                        Відкрити каталог <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}