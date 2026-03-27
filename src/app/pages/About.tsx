import * as React from "react";
import { PageLayout } from "./PageLayout";
import { Target, Truck, Headset, CheckSquare } from "lucide-react";

const principles = [
    {
        title: "Простий вибір",
        text: "Ми допомагаємо підібрати товари, які легко зрозуміти і зручно продавати.",
        icon: Target,
    },
    {
        title: "Зрозуміла доставка",
        text: "Ви знаєте, що є в наявності, коли буде відправка і як зробити наступне замовлення.",
        icon: Truck,
    },
    {
        title: "Підтримка",
        text: "Ми відповідаємо на питання, допомагаємо з вибором і супроводжуємо замовлення.",
        icon: Headset,
    },
];

const features = [
    "Жіноче, чоловіче, дитяче, робоче взуття та аксесуари",
    "Допомога з першим замовленням",
    "Супутні товари до основного асортименту",
    "Товари в наявності для швидкого замовлення",
    "Один контакт для зв'язку",
    "Зрозумілі умови без зайвої бюрократії",
];

export function About() {
    return (
        <PageLayout
            title="Про нас"
            subtitle="Взуття й аксесуари для магазинів, компаній і регулярних замовлень."
        >
            <div className="mx-auto max-w-5xl space-y-12">
                {/* Вступний блок */}
                <div className="tech-clip premium-panel border border-white/10 bg-[#111] p-8 sm:p-10 shadow-2xl shadow-red-600/5">
                    <p className="mb-4 text-lg font-bold leading-relaxed text-gray-300">
                        <span className="copper-text text-[#e39c5e] font-black">ВЗУВАЧКА</span> - це не просто каталог товарів. Ми допомагаємо магазинам і компаніям швидко підібрати взуття, зрозуміти умови і без зайвих труднощів зробити замовлення.
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-gray-400">
                        Для нас важливо, щоб усе було просто: зрозумілі ціни, актуальна наявність і нормальний людський зв'язок без складних схем.
                    </p>
                </div>

                {/* Наші принципи */}
                <div>
                    <h2 className="mb-6 text-2xl font-black uppercase text-white">Наші принципи</h2>
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

                {/* Кому підходимо & Що отримуєте */}
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="tech-clip border border-white/10 bg-black/40 p-8">
                        <h2 className="mb-4 text-xl font-black uppercase text-[#e39c5e] copper-text">Кому підходимо</h2>
                        <p className="text-sm font-bold leading-relaxed text-gray-400">
                            Працюємо з магазинами, онлайн-продавцями, компаніями та командами, яким потрібне зрозуміле замовлення і надійна поставка.
                        </p>
                    </div>

                    <div className="tech-clip border border-white/10 bg-[#111] p-8">
                        <h2 className="mb-6 text-xl font-black uppercase text-white">Що ви отримуєте</h2>
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