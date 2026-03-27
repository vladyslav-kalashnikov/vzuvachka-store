import * as React from "react";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getManagedCategorySections, getSetting } from "../lib/siteContent";

export function Categories() {
    const { settings } = useSiteSettings();
    const overviewCards = [
        {
            value: getSetting(settings, "categories_stat_1_value", "5"),
            label: getSetting(settings, "categories_stat_1_label", "основних напрямків"),
        },
        {
            value: getSetting(settings, "categories_stat_2_value", "24h"),
            label: getSetting(settings, "categories_stat_2_label", "швидка відправка замовлень"),
        },
        {
            value: getSetting(settings, "categories_stat_3_value", "1 ящ"),
            label: getSetting(settings, "categories_stat_3_label", "мінімальний об'єм закупівлі"),
        },
    ];
    const titleLine1 = getSetting(settings, "categories_title_line_1", "КАТАЛОГ");
    const titleLine2 = getSetting(settings, "categories_title_line_2", "МАТРИЦЬ");
    const caption = getSetting(settings, "categories_caption", "Оберіть потрібний напрямок");
    const managedSections = getManagedCategorySections(settings);
    const imageMap = {
        women: settings.category_women_image || "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
        men: settings.category_men_image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
        kids: settings.category_kids_image || "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop",
        work: settings.category_work_image || "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop",
        accessories:
            settings.category_accessories_image ||
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    };
    const sections = managedSections.map((section) => ({
        ...section,
        image: imageMap[section.key as keyof typeof imageMap],
        colSpan:
            section.key === "women" || section.key === "men"
                ? "md:col-span-3"
                : "md:col-span-2",
    }));

    return (
        <section id="categories" className="mesh-dark relative overflow-hidden py-16 text-white sm:py-24 border-t border-white/5 bg-black">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 relative z-10">
                <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-6xl">
                        {titleLine1}
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">{titleLine2}</span>
                    </h2>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 sm:tracking-widest">
                        {caption}
                    </span>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    {overviewCards.map((card, index) => (
                        <div key={card.label} className="tech-clip premium-panel border border-white/10 bg-[#111] px-6 py-5" style={{ animationDelay: `${index * 0.08}s` }}>
                            <p className="mb-2 text-2xl font-black uppercase text-white copper-text sm:text-3xl">{card.value}</p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{card.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
                    {sections.map((section, index) => (
                        <a key={section.key} href={section.href} className={`tech-clip group relative min-h-[320px] overflow-hidden border border-white/10 bg-black shadow-[0_26px_60px_rgba(0,0,0,0.5)] transition-all hover:border-[#e39c5e]/50 hover:shadow-[0_0_30px_rgba(184,115,51,0.15)] sm:min-h-[380px] ${section.colSpan}`}>
                            <img src={section.image} alt={section.label} className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                            <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8">
                                <div className="space-y-3">
                                    <div className="tech-clip inline-flex self-start border border-red-500/30 bg-red-600/80 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                                        {section.badge}
                                    </div>
                                    <p className="max-w-full text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300 sm:max-w-xs">
                                        {section.description}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="translate-y-0 text-2xl font-black uppercase tracking-tight text-white transition-transform duration-300 group-hover:-translate-y-2 sm:text-3xl md:text-5xl">
                                        {section.label}
                                    </h3>
                                    <div className="mt-4 flex flex-wrap gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#e39c5e] copper-shadow flex items-center gap-2">
                                            Відкрити каталог <ArrowRight className="h-3 w-3" />
                                        </span>
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
