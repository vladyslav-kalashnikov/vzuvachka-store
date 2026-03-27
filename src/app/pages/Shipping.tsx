import * as React from "react";
import { CalendarClock, ClipboardCheck } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getSetting, getSettingList } from "../lib/siteContent";
import { PageLayout } from "./PageLayout";

export function Shipping() {
    const { settings } = useSiteSettings();
    const scenarioSteps = getSettingList(settings, "shipping_scenario_list", [
        "Менеджер підтверджує ваше замовлення",
        "Узгоджуємо кількість, розміри, кольори та упаковку",
        "Погодження документів, способу оплати й точки доставки",
        "Відвантаження перевізником або адресна доставка за домовленістю",
    ]);

    return (
        <PageLayout
            title={getSetting(settings, "shipping_page_title", "Умови поставки")}
            subtitle={getSetting(
                settings,
                "shipping_page_subtitle",
                "Як проходить замовлення, підготовка товару і доставка."
            )}
        >
            <div className="mx-auto max-w-4xl space-y-10">
                <div className="tech-clip border border-red-500/20 bg-gradient-to-br from-red-950/20 to-[#111] p-8">
                    <p className="text-sm font-bold leading-relaxed text-gray-300">
                        {getSetting(
                            settings,
                            "shipping_intro",
                            "Після узгодження замовлення ми перевіряємо наявність, погоджуємо кількість, упаковку і спосіб доставки. Більшість товарів відправляється зі складу в Україні, тому все відбувається досить швидко."
                        )}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="tech-clip premium-panel border border-white/10 bg-[#111] p-8">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black text-red-500">
                            <ClipboardCheck className="h-5 w-5" />
                        </div>
                        <h2 className="mb-6 text-xl font-black uppercase text-white">
                            {getSetting(settings, "shipping_scenario_title", "Базовий сценарій")}
                        </h2>
                        <ul className="space-y-4">
                            {scenarioSteps.map((text, index) => (
                                <li key={text} className="flex items-start gap-3 text-sm font-bold text-gray-400">
                                    <span className="text-red-500 font-mono">0{index + 1}.</span>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="tech-clip premium-panel border border-white/10 bg-[#111] p-8">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black text-red-500">
                            <CalendarClock className="h-5 w-5" />
                        </div>
                        <h2 className="mb-6 text-xl font-black uppercase text-white">
                            {getSetting(settings, "shipping_timing_title", "Строки")}
                        </h2>
                        <p className="mb-4 text-sm font-bold leading-relaxed text-gray-400">
                            {getSetting(
                                settings,
                                "shipping_timing_text_1",
                                "Зазвичай замовлення готуємо протягом 1-3 робочих днів після підтвердження."
                            )}
                        </p>
                        <p className="text-sm font-bold leading-relaxed text-gray-400">
                            {getSetting(
                                settings,
                                "shipping_timing_text_2",
                                "Якщо замовлення велике або нестандартне, строки погоджуємо окремо під час затвердження заявки."
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
