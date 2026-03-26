import * as React from "react";
import { ArrowRight, Briefcase } from "lucide-react";

export function WholesaleHero() {
    const metrics = [
        { value: "Вибір", label: "допомагаємо підібрати товари" },
        { value: "Наявність", label: "підкажемо, що є в продажу" },
        { value: "Підтримка", label: "відповідаємо на питання по замовленню" },
    ];

    return (
        <section className="mesh-dark relative overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />

            <div className="relative z-10 mx-auto w-full max-w-[1600px]">
                <div className="grid items-end gap-10 lg:grid-cols-[1fr_420px]">
                    <div className="fade-up">
                        <div className="tech-clip mb-4 inline-flex items-center gap-2 bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                            <Briefcase className="h-3 w-3" />
                            Умови співпраці
                        </div>

                        <h1 className="mb-6 text-[clamp(2.75rem,14vw,6.25rem)] font-black uppercase leading-[0.88] tracking-tight text-white sm:leading-[0.85] sm:tracking-tighter md:text-[80px] lg:text-[100px]">
                            РОБИМО ЗАМОВЛЕННЯ
                            <br />
                            <span className="copper-text">ПРОСТИМ</span>
                        </h1>

                        <p className="mb-10 max-w-2xl border-l-2 border-red-600 pl-4 text-sm font-medium leading-relaxed text-gray-300 md:text-lg">
                            Пояснюємо умови простими словами, допомагаємо вибрати товари і швидко
                            супроводжуємо замовлення від першого звернення до відправки.
                        </p>

                        <div className="flex flex-col items-start gap-4 sm:flex-row">
                            <a
                                href="#b2b-register"
                                className="tech-clip flex w-full items-center justify-center gap-3 bg-white px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-black transition-colors hover:bg-red-600 hover:text-white sm:w-auto sm:px-10 sm:py-5 sm:text-xs sm:tracking-widest"
                            >
                                Залишити запит
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href="#b2b-matrix"
                                className="tech-clip flex w-full items-center justify-center gap-3 border border-white/20 bg-transparent px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:border-red-600 hover:text-red-500 sm:w-auto sm:px-10 sm:py-5 sm:text-xs sm:tracking-widest"
                            >
                                Подивитися приклад замовлення
                            </a>
                        </div>
                    </div>

                    <div className="grid gap-4 fade-up" style={{ animationDelay: "0.14s" }}>
                        {metrics.map((item) => (
                            <div key={item.label} className="premium-panel tech-clip px-5 py-5">
                                <p className="text-2xl font-black uppercase text-white">{item.value}</p>
                                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-gray-400">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
