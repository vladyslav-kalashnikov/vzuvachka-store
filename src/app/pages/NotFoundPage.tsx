import * as React from "react";
import { AlertTriangle, Compass, Search, ShoppingBag } from "lucide-react";
import { PageLayout } from "./PageLayout";

type NotFoundPageProps = {
    routeSlug?: string;
};

const quickLinks = [
    {
        href: "#page/wholesale",
        title: "Умови співпраці",
        text: "Подивитися, як ми працюємо і що пропонуємо.",
        icon: Compass,
    },
    {
        href: "#search",
        title: "Пошук товарів",
        text: "Швидко знайти потрібну модель або перейти до каталогу.",
        icon: Search,
    },
    {
        href: "#cart",
        title: "Заявка",
        text: "Перевірити вибрані товари і надіслати запит.",
        icon: ShoppingBag,
    },
];

export function NotFoundPage({ routeSlug }: NotFoundPageProps) {
    return (
        <PageLayout
            title="404 / Сторінку не знайдено"
            subtitle={
                routeSlug
                    ? `Маршрут "${routeSlug}" відсутній у B2B-навігації.`
                    : "Схоже, сторінка була переміщена, видалена або посилання містить помилку."
            }
        >
            <section className="space-y-6">
                <div className="rounded-[28px] border border-white/10 bg-black/20 p-6 md:p-8">
                    <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-red-400">
                        <AlertTriangle className="h-4 w-4" />
                        Сторінку не знайдено
                    </div>

                    <p className="max-w-2xl text-base leading-8 text-gray-300">
                        Ми не знайшли сторінку, яку ви відкрили. Найчастіше це трапляється,
                        коли URL застарів, посилання було змінено або маршрут введено з
                        помилкою.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href="#home"
                            className="inline-flex rounded-xl border border-white/10 bg-[#111] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-red-500 hover:text-red-500"
                        >
                            На головну
                        </a>
                        <a
                            href="#page/men"
                            className="inline-flex rounded-xl border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-gray-300 transition-colors hover:border-white hover:text-white"
                        >
                            Відкрити каталог
                        </a>
                        <a
                            href="#page/contact"
                            className="inline-flex rounded-xl border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-gray-300 transition-colors hover:border-white hover:text-white"
                        >
                            Зв'язатися з нами
                        </a>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {quickLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className="group rounded-[24px] border border-white/10 bg-black/20 p-5 transition-colors hover:border-red-500/40"
                            >
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white transition-colors group-hover:border-red-500/40 group-hover:text-red-400">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h2 className="text-lg font-black uppercase tracking-[0.08em] text-white">
                                    {item.title}
                                </h2>
                                <p className="mt-3 text-sm leading-7 text-gray-400">{item.text}</p>
                            </a>
                        );
                    })}
                </div>
            </section>
        </PageLayout>
    );
}
