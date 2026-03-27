import * as React from "react";
import { Boxes, ShieldCheck, TrendingUp } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function WhyChoose() {
    const { settings } = useSiteSettings();
    const stats = [
        { value: "1", label: "контакт для всіх питань" },
        { value: "5", label: "основних категорій товарів" },
        { value: "Швидко", label: "відповідаємо і готуємо замовлення" },
    ];

    const features = [
        {
            title: settings.whychoose_card_1_title || "ЛЕГКО ПОЧАТИ",
            desc:
                settings.whychoose_card_1_desc ||
                "Допомагаємо вибрати товари, з якими зручно стартувати без зайвого ризику.",
            icon: Boxes,
        },
        {
            title: settings.whychoose_card_2_title || "ВСЕ ЗРОЗУМІЛО",
            desc:
                settings.whychoose_card_2_desc ||
                "Ви отримуєте зрозумілі умови, актуальну наявність і швидкий зв'язок із менеджером.",
            icon: ShieldCheck,
        },
        {
            title: settings.whychoose_card_3_title || "ЗРУЧНО ПОВЕРТАТИСЯ",
            desc:
                settings.whychoose_card_3_desc ||
                "Коли товари добре продаються, їх можна швидко дозамовити без зайвої плутанини.",
            icon: TrendingUp,
        },
    ];

    return (
        <section className="mesh-dark relative overflow-hidden border-t border-white/5 bg-[#0a0a0a] py-16 text-white sm:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />

            <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6">
                <div className="mb-10 flex flex-col items-center text-center fade-up">
                    <span className="mb-4 inline-block border border-red-500/20 bg-red-600/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                        {settings.whychoose_badge || "Чому з нами зручно"}
                    </span>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
                        {settings.whychoose_title || "Проста"}{" "}
                        <span className="copper-text text-[#e39c5e] copper-shadow-lg">
                            {settings.whychoose_title_outline || "співпраця"}
                        </span>
                    </h2>
                </div>

                <div className="mb-12 grid gap-4 md:grid-cols-3">
                    {stats.map((item, index) => (
                        <div
                            key={item.label}
                            className="premium-panel tech-clip border border-white/10 bg-[#111] px-5 py-5 text-center"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <p className="mb-2 text-3xl font-black uppercase text-white">{item.value}</p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{item.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="premium-panel tech-clip group border border-white/10 bg-black/40 p-8 transition-all hover:-translate-y-2 hover:border-red-500/50 hover:shadow-[0_20px_40px_rgba(220,38,38,0.15)]"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            >
                                <div className="tech-clip mb-6 flex h-14 w-14 items-center justify-center border border-white/10 bg-[#111] text-gray-400 transition-colors group-hover:border-red-500 group-hover:text-red-500 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-3 text-lg font-black uppercase tracking-tight text-white transition-colors group-hover:text-red-400">
                                    {feature.title}
                                </h3>
                                <p className="text-xs font-medium leading-relaxed text-gray-400">
                                    {feature.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}