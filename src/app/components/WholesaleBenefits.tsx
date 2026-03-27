import * as React from "react";
import { Boxes, Handshake, Truck } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getSetting } from "../lib/siteContent";

export function WholesaleBenefits() {
    const { settings } = useSiteSettings();
    const meta = [
        {
            value: getSetting(settings, "wholesale_benefits_meta_1_value", "Швидко"),
            label: getSetting(settings, "wholesale_benefits_meta_1_label", "відповідаємо на запит"),
        },
        {
            value: getSetting(settings, "wholesale_benefits_meta_2_value", "Чітко"),
            label: getSetting(settings, "wholesale_benefits_meta_2_label", "пояснюємо умови"),
        },
        {
            value: getSetting(settings, "wholesale_benefits_meta_3_value", "Зручно"),
            label: getSetting(settings, "wholesale_benefits_meta_3_label", "працювати повторно"),
        },
    ];

    const benefits = [
        {
            title: getSetting(settings, "wholesale_benefit_1_title", "ДОПОМАГАЄМО З ВИБОРОМ"),
            desc: getSetting(settings, "wholesale_benefit_1_desc", "Підкажемо, які товари краще підійдуть саме для вашого магазину або формату продажу."),
            icon: Boxes,
        },
        {
            title: getSetting(settings, "wholesale_benefit_2_title", "ПРОСТІ УМОВИ"),
            desc: getSetting(settings, "wholesale_benefit_2_desc", "Без зайвих складнощів пояснюємо оплату, відправку, мінімальне замовлення і повторні покупки."),
            icon: Handshake,
        },
        {
            title: getSetting(settings, "wholesale_benefit_3_title", "ШВИДКА ВІДПРАВКА"),
            desc: getSetting(settings, "wholesale_benefit_3_desc", "Тримаємо зв'язок по наявності і швидко готуємо товари до відправки."),
            icon: Truck,
        },
    ];

    return (
        <section className="border-t border-white/5 bg-[#0a0a0a] py-16 sm:py-24">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
                <div className="mb-16 text-center fade-up">
                    <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-red-600">
                        {getSetting(settings, "wholesale_benefits_badge", "Чому це зручно")}
                    </span>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
                        {getSetting(settings, "wholesale_benefits_title", "Наші")}{" "}
                        <span className="text-red-600">
                            {getSetting(settings, "wholesale_benefits_title_accent", "переваги")}
                        </span>
                    </h2>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    {meta.map((item, index) => (
                        <div
                            key={item.label}
                            className="premium-panel tech-clip fade-up px-5 py-5"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <p className="text-2xl font-black uppercase text-white">{item.value}</p>
                            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-gray-400">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {benefits.map((benefit, i) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={benefit.title}
                                className="tech-clip premium-panel group p-6 transition-all hover:-translate-y-1 hover:border-red-600 fade-up sm:p-8"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            >
                                <div className="tech-clip mb-6 flex h-14 w-14 items-center justify-center bg-white/5 transition-colors group-hover:bg-red-600">
                                    <Icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-white">
                                    {benefit.title}
                                </h3>
                                <p className="text-[13px] font-medium leading-relaxed text-gray-400">
                                    {benefit.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
