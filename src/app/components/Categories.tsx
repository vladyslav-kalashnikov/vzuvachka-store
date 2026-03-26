import * as React from "react";
import { categorySections } from "../data/b2bContent";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function Categories() {
    const { settings } = useSiteSettings();
    const overviewCards = [
        { value: "5", label: "основних категорій товарів" },
        { value: "Швидко", label: "допоможемо з вибором і замовленням" },
        { value: "Просто", label: "зрозумілі умови без зайвих складнощів" },
    ];

    const sections = [
        {
            ...categorySections[0],
            image:
                settings.category_women_image ||
                "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
            colSpan: "md:col-span-3",
        },
        {
            ...categorySections[1],
            image:
                settings.category_men_image ||
                "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
            colSpan: "md:col-span-3",
        },
        {
            ...categorySections[2],
            image:
                settings.category_kids_image ||
                "https://images.unsplash.com/photo-1514090259040-e221375dcb01?q=80&w=900&auto=format&fit=crop",
            colSpan: "md:col-span-2",
        },
        {
            ...categorySections[3],
            image:
                settings.category_work_image ||
                "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop",
            colSpan: "md:col-span-2",
        },
        {
            ...categorySections[4],
            image:
                settings.menu_accessories_image ||
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
            colSpan: "md:col-span-2",
        },
    ];

    const title1 = settings.categories_title_line_1 || "КАТЕГОРІЇ";
    const title2 = settings.categories_title_line_2 || "ТОВАРІВ";

    return (
        <section id="categories" className="mesh-light relative overflow-hidden py-24 text-black">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,15,15,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,15,15,0.06)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
            <div className="mx-auto max-w-[1600px] px-6">
                <div className="mb-10 flex flex-col gap-5 border-b border-black/10 pb-6 md:flex-row md:items-end md:justify-between">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-black md:text-6xl">
                        {title1}
                        <br />
                        <span className="text-red-600">{title2}</span>
                    </h2>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-black/45">
                            Оберіть потрібний розділ
                        </span>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    {overviewCards.map((card, index) => (
                        <div
                            key={card.label}
                            className="premium-panel-light tech-clip fade-up px-6 py-5"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <p className="mb-2 text-3xl font-black uppercase text-black md:text-4xl">{card.value}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-black/65">{card.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
                    {sections.map((section, index) => (
                        <a
                            key={section.key}
                            href={section.href}
                            className={`tech-clip group relative min-h-[380px] overflow-hidden border border-black/10 bg-zinc-900 fade-up shadow-[0_26px_60px_rgba(20,12,5,0.12)] ${section.colSpan}`}
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <img
                                src={section.image}
                                alt={section.label}
                                className="absolute inset-0 h-full w-full object-cover opacity-55 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                            <div className="absolute inset-0 flex flex-col justify-between p-8">
                                <div className="space-y-3">
                                    <div className="tech-clip inline-flex self-start border border-white/10 bg-black/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                                        {section.badge}
                                    </div>
                                    <p className="max-w-xs text-xs uppercase tracking-[0.18em] text-white/70">
                                        {section.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="translate-y-4 text-3xl font-black uppercase tracking-tighter text-white transition-transform duration-300 group-hover:translate-y-0 md:text-5xl">
                                        {section.label}
                                    </h3>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {section.subcategories.slice(0, 3).map((item) => (
                                            <span
                                                key={item.slug}
                                                className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
                                            >
                                                {item.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
