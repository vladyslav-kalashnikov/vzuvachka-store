import * as React from "react";
import { PageLayout } from "./PageLayout";
import { Target, Truck, Headset, CheckSquare } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getSetting, getSettingList } from "../lib/siteContent";

export function About() {
    const { settings } = useSiteSettings();
    const principles = [
        {
            title: getSetting(settings, "about_principle_1_title", "Простий вибір"),
            text: getSetting(settings, "about_principle_1_text", "Ми допомагаємо підібрати товари, які легко зрозуміти і зручно продавати."),
            icon: Target,
        },
        {
            title: getSetting(settings, "about_principle_2_title", "Зрозуміла доставка"),
            text: getSetting(settings, "about_principle_2_text", "Ви знаєте, що є в наявності, коли буде відправка і як зробити наступне замовлення."),
            icon: Truck,
        },
        {
            title: getSetting(settings, "about_principle_3_title", "Підтримка"),
            text: getSetting(settings, "about_principle_3_text", "Ми відповідаємо на питання, допомагаємо з вибором і супроводжуємо замовлення."),
            icon: Headset,
        },
    ];
    const features = getSettingList(settings, "about_benefits_list", [
        "Жіноче, чоловіче, дитяче, робоче взуття та аксесуари",
        "Допомога з першим замовленням",
        "Супутні товари до основного асортименту",
        "Товари в наявності для швидкого замовлення",
        "Один контакт для зв'язку",
        "Зрозумілі умови без зайвої бюрократії",
    ]);

    return (
        <PageLayout
            title={getSetting(settings, "about_page_title", "Про нас")}
            subtitle={getSetting(
                settings,
                "about_page_subtitle",
                "Взуття й аксесуари для магазинів, компаній і регулярних замовлень."
            )}
        >
            <div className="mx-auto max-w-5xl space-y-12">
                <div className="tech-clip premium-panel border border-white/10 bg-[#111] p-8 sm:p-10 shadow-2xl shadow-red-600/5">
                    <p className="mb-4 text-lg font-bold leading-relaxed text-gray-300">
                        {getSetting(
                            settings,
                            "about_intro_1",
                            "ВЗУВАЧКА - це не просто каталог товарів. Ми допомагаємо магазинам і компаніям швидко підібрати взуття, зрозуміти умови і без зайвих труднощів зробити замовлення."
                        )}
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-gray-400">
                        {getSetting(
                            settings,
                            "about_intro_2",
                            "Для нас важливо, щоб усе було просто: зрозумілі ціни, актуальна наявність і нормальний людський зв'язок без складних схем."
                        )}
                    </p>
                </div>

                <div>
                    <h2 className="mb-6 text-2xl font-black uppercase text-white">
                        {getSetting(settings, "about_principles_title", "Наші принципи")}
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {principles.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.title} className="tech-clip premium-panel border border-white/10 bg-[#111] p-6 transition-colors hover:border-red-500/30">
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center bg-black border border-white/5 text-red-500">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-3 text-sm font-black uppercase tracking-[0.1em] text-white">{item.title}</h3>
                                    <p className="text-xs font-bold leading-relaxed text-gray-400">{item.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="tech-clip border border-white/10 bg-black/40 p-8">
                        <h2 className="mb-4 text-xl font-black uppercase text-[#e39c5e] copper-text">
                            {getSetting(settings, "about_audience_title", "Кому підходимо")}
                        </h2>
                        <p className="text-sm font-bold leading-relaxed text-gray-400">
                            {getSetting(
                                settings,
                                "about_audience_text",
                                "Працюємо з магазинами, онлайн-продавцями, компаніями та командами, яким потрібне зрозуміле замовлення і надійна поставка."
                            )}
                        </p>
                    </div>

                    <div className="tech-clip border border-white/10 bg-[#111] p-8">
                        <h2 className="mb-6 text-xl font-black uppercase text-white">
                            {getSetting(settings, "about_benefits_title", "Що ви отримуєте")}
                        </h2>
                        <ul className="space-y-4">
                            {features.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm font-bold text-gray-400">
                                    <CheckSquare className="h-5 w-5 shrink-0 text-red-500" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
