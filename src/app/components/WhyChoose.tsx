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
        <section className="mesh-light relative overflow-hidden py-16 text-black sm:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,15,15,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,15,15,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />

            <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6">
                <div className="mb-10 text-center fade-up">
                    <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.24em] text-red-600 sm:tracking-[0.4em]">
                        {settings.whychoose_badge || "Чому з нами зручно"}
                    </span>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-black md:text-5xl">
                        {settings.whychoose_title || "Проста"}{" "}
                        <span
                            className="text-transparent"
                            style={{ WebkitTextStroke: "1px #111" }}
                        >
                            {settings.whychoose_title_outline || "співпраця"}
                        </span>
                    </h2>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    {stats.map((item, index) => (
                        <div
                            key={item.label}
                            className="premium-panel-light tech-clip fade-up px-5 py-5"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <p className="mb-2 text-2xl font-black uppercase text-black">{item.value}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-black/65">{item.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div
                            key={feature.title}
                                className="premium-panel-light tech-clip group fade-up p-6 transition-all hover:-translate-y-1 hover:border-red-600/40 sm:p-8"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            >
                                <div className="tech-clip mb-6 flex h-12 w-12 items-center justify-center bg-black text-white transition-colors group-hover:bg-red-600">
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-black">
                                    {feature.title}
                                </h3>
                                <p className="text-[13px] font-medium leading-relaxed text-black/65">
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
