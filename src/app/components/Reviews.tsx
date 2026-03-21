import * as React from 'react';

const reviews = [
    { text: "Абсолютний захист від води. Тестували їх у найжорсткіших умовах осіннього бездоріжжя — ноги залишилися сухими. Високий рівень утилітарності.", author: "OUTDOOR MAGAZINE" },
    { text: "Нарешті з'явилися калоші, які не соромно взути в місті. Брутальний дизайн, глибокий протектор і нереальна легкість.", author: "МАКСИМ В., КИЇВ (VERIFIED BUYER)" },
];

export function Reviews() {
    return (
        <section className="py-32 bg-black border-t border-white/5">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-bold mb-16">Польові випробування</p>

                <div className="space-y-24">
                    {reviews.map((review, i) => (
                        <div key={i} className="fade-up" style={{ animationDelay: `${i * 0.2}s` }}>
                            {/* Декоративні лапки */}
                            <span className="text-6xl font-black text-white/10 block mb-4 leading-none">"</span>
                            <p className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-tight text-white mb-8 max-w-4xl mx-auto">
                                {review.text}
                            </p>
                            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500">
                                // {review.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}