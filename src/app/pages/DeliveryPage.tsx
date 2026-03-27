import * as React from "react";
import {
    Clock,
    CreditCard,
    PackageOpen,
    Truck,
    Zap,
} from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getSetting } from "../lib/siteContent";
import { PageLayout } from "./PageLayout";

export function DeliveryPage() {
    const { settings } = useSiteSettings();
    const cards = [
        {
            icon: PackageOpen,
            badge: getSetting(settings, "delivery_card_1_badge", "РОСТОВКИ / ЯЩИКИ"),
            title: getSetting(settings, "delivery_card_1_title", "МІНІМАЛЬНИЙ ОБ'ЄМ"),
            text: getSetting(
                settings,
                "delivery_card_1_text",
                "Ми працюємо виключно оптом. Мінімальне замовлення складає 1 ящик (ростовку). Кількість пар та розмірна сітка вказані в картці товару."
            ),
        },
        {
            icon: CreditCard,
            badge: getSetting(settings, "delivery_card_2_badge", "B2B ПЛАТЕЖІ"),
            title: getSetting(settings, "delivery_card_2_title", "СПОСОБИ ОПЛАТИ"),
            text: getSetting(
                settings,
                "delivery_card_2_text",
                "На розрахунковий рахунок ФОП.\nНакладений платіж з передплатою."
            ),
        },
        {
            icon: Truck,
            badge: getSetting(settings, "delivery_card_3_badge", "ЛОГІСТИКА"),
            title: getSetting(settings, "delivery_card_3_title", "ДОСТАВКА ТОВАРУ"),
            text: getSetting(
                settings,
                "delivery_card_3_text",
                "Відправляємо Новою Поштою по всій Україні. Послуги доставки оплачує отримувач за тарифами перевізника."
            ),
        },
        {
            icon: Clock,
            badge: getSetting(settings, "delivery_card_4_badge", "ЧАС — ЦЕ ГРОШІ"),
            title: getSetting(settings, "delivery_card_4_title", "ГРАФІК ОПЕРАЦІЙ"),
            text: getSetting(
                settings,
                "delivery_card_4_text",
                "Оплата до 14:00 — відправка в той же день. Після 14:00 — наступного робочого дня. Неділя — вихідний."
            ),
        },
    ];

    return (
        <PageLayout
            title={getSetting(settings, "delivery_page_title", "B2B ПРАВИЛА ТА ЛОГІСТИКА")}
            subtitle={getSetting(
                settings,
                "delivery_page_subtitle",
                "Прозорі умови для вашого бізнесу. Все чітко, швидко та зрозуміло."
            )}
        >
            <div className="mx-auto max-w-7xl">
                <div className="tech-clip premium-panel relative mb-12 flex flex-col items-center justify-between border border-white/10 bg-[#111] p-8 text-center shadow-2xl shadow-red-600/5 transition-colors hover:border-red-500/30 sm:flex-row sm:text-left">
                    <div className="relative z-10 mb-6 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border border-red-500/20 bg-black sm:mb-0 sm:mr-8">
                        <Zap className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="relative z-10 flex-grow">
                        <h2 className="mb-2 text-2xl font-black uppercase text-white sm:text-3xl">
                            {getSetting(settings, "delivery_banner_title", "ВАША ЗАЯВКА — НАШ ПРІОРИТЕТ")}
                        </h2>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
                            {getSetting(
                                settings,
                                "delivery_banner_subtitle",
                                "Короткий і зрозумілий шлях від першого звернення до готового замовлення."
                            )}
                        </p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-red-600/10 blur-3xl" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="tech-clip premium-panel flex flex-col items-center border border-white/10 bg-[#111] p-8 text-center transition-all hover:-translate-y-1 hover:border-red-500/30 sm:items-start sm:text-left"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-black/60 text-red-500">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                    {card.badge}
                                </h3>
                                <h2 className="mb-4 text-xl font-black uppercase text-white">
                                    {card.title}
                                </h2>
                                <p className="max-w-md whitespace-pre-line text-sm font-bold leading-relaxed text-gray-400">
                                    {card.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </PageLayout>
    );
}
