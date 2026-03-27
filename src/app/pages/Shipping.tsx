import * as React from "react";
import { PageLayout } from "./PageLayout";
import { ClipboardCheck, MapPin, CalendarClock } from "lucide-react";

export function Shipping() {
    return (
        <PageLayout
            title="Умови поставки"
            subtitle="Як проходить замовлення, підготовка товару і доставка."
        >
            <div className="mx-auto max-w-4xl space-y-10">
                <div className="tech-clip border border-red-500/20 bg-gradient-to-br from-red-950/20 to-[#111] p-8">
                    <p className="text-sm font-bold leading-relaxed text-gray-300">
                        Після узгодження замовлення ми перевіряємо наявність, погоджуємо кількість, упаковку і спосіб доставки. Більшість товарів відправляється зі складу в Україні, тому все відбувається досить швидко.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Базовий сценарій */}
                    <div className="tech-clip premium-panel border border-white/10 bg-[#111] p-8">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-black border border-white/10 text-red-500">
                            <ClipboardCheck className="h-5 w-5" />
                        </div>
                        <h2 className="mb-6 text-xl font-black uppercase text-white">Базовий сценарій</h2>
                        <ul className="space-y-4">
                            {[
                                "Менеджер підтверджує ваше замовлення",
                                "Узгоджуємо кількість, розміри, кольори та упаковку",
                                "Погодження документів, способу оплати й точки доставки",
                                "Відвантаження перевізником або адресна доставка за домовленістю"
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-400">
                                    <span className="text-red-500 font-mono">0{i+1}.</span>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Строки */}
                    <div className="tech-clip premium-panel border border-white/10 bg-[#111] p-8">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-black border border-white/10 text-red-500">
                            <CalendarClock className="h-5 w-5" />
                        </div>
                        <h2 className="mb-6 text-xl font-black uppercase text-white">Строки</h2>
                        <p className="text-sm font-bold leading-relaxed text-gray-400 mb-4">
                            Зазвичай замовлення готуємо протягом <span className="text-white">1-3 робочих днів</span> після підтвердження.
                        </p>
                        <p className="text-sm font-bold leading-relaxed text-gray-400">
                            Якщо замовлення велике або нестандартне, строки погоджуємо окремо під час затвердження заявки.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}