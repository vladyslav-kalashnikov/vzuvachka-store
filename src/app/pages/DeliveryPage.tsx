import * as React from "react";
import { PageLayout } from "./PageLayout";
import { Truck, CreditCard, PackageOpen, Clock, Zap } from "lucide-react";

export function DeliveryPage() {
    return (
        <PageLayout
            title="B2B ПРАВИЛА ТА ЛОГІСТИКА"
            subtitle="Прозорі умови для вашого бізнесу. Все чітко, швидко та зрозуміло."
        >
            <div className="mx-auto max-w-7xl">

                {/* Головна банер-картка (Вау-ефект №1) */}
                <div className="tech-clip premium-panel relative mb-12 flex flex-col items-center justify-between border border-white/10 bg-[#111] p-8 text-center sm:flex-row sm:text-left shadow-2xl shadow-red-600/5 hover:border-red-500/30 transition-colors">
                    <div className="relative z-10 mb-6 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border border-red-500/20 bg-black red-shadow sm:mb-0 sm:mr-8">
                        <Zap className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="relative z-10 flex-grow">
                        <h2 className="mb-2 text-2xl font-black uppercase text-white copper-text copper-shadow sm:text-3xl">
                            ВАША ЗАЯВКА — НАШ ПРІОРИТЕТ
                        </h2>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
                            Короткий і зрозумілий шлях від першого звернення до готового замовлення.
                        </p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-red-600/10 blur-3xl" />
                </div>

                {/* Сітка умов співпраці (Вау-ефект №2) */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">

                    {/* 1. Мінімальне замовлення */}
                    <div className="tech-clip premium-panel flex flex-col items-center border border-white/10 bg-[#111] p-8 text-center transition-all hover:border-red-500/30 hover:-translate-y-1 sm:items-start sm:text-left">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-black/60 text-red-500 red-shadow">
                            <PackageOpen className="h-7 w-7" />
                        </div>
                        <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                            РОСТОВКИ / ЯЩИКИ
                        </h3>
                        <h2 className="mb-4 text-xl font-black uppercase text-white">
                            МІНІМАЛЬНИЙ ОБ'ЄМ
                        </h2>
                        <p className="max-w-md text-sm font-bold leading-relaxed text-gray-400">
                            Ми працюємо <span className="text-white">виключно оптом</span>. Мінімальне замовлення складає <span className="copper-text text-[#b87333]">1 ящик (ростовку)</span>. Кількість пар та розмірна сітка вказані в картці товару.
                        </p>
                    </div>

                    {/* 2. Оплата */}
                    <div className="tech-clip premium-panel flex flex-col items-center border border-white/10 bg-[#111] p-8 text-center transition-all hover:border-red-500/30 hover:-translate-y-1 sm:items-start sm:text-left">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-black/60 text-red-500 red-shadow">
                            <CreditCard className="h-7 w-7" />
                        </div>
                        <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                            B2B ПЛАТЕЖІ
                        </h3>
                        <h2 className="mb-4 text-xl font-black uppercase text-white">
                            SПОСОБИ ОПЛАТИ
                        </h2>
                        <ul className="max-w-md space-y-3 text-sm font-bold leading-relaxed text-gray-400">
                            <li className="flex items-start gap-2"><span className="text-red-500">■</span> На розрахунковий рахунок ФОП.</li>
                            <li className="flex items-start gap-2"><span className="text-red-500">■</span> Накладений платіж (<span className="text-white">з передплатою</span>).</li>
                        </ul>
                    </div>

                    {/* 3. Доставка */}
                    <div className="tech-clip premium-panel flex flex-col items-center border border-white/10 bg-[#111] p-8 text-center transition-all hover:border-red-500/30 hover:-translate-y-1 sm:items-start sm:text-left">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-black/60 text-red-500 red-shadow">
                            <Truck className="h-7 w-7" />
                        </div>
                        <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                            ЛОГІСТИКА
                        </h3>
                        <h2 className="mb-4 text-xl font-black uppercase text-white">
                            ДОСТАВКА ТОВАРУ
                        </h2>
                        <p className="max-w-md text-sm font-bold leading-relaxed text-gray-400">
                            Відправляємо <span className="copper-text text-[#b87333]">Новою Поштою</span> по всій Україні. <span className="text-white">Послуги доставки</span> оплачує отримувач за тарифами перевізника.
                        </p>
                    </div>

                    {/* 4. Графік відправок */}
                    <div className="tech-clip premium-panel flex flex-col items-center border border-white/10 bg-[#111] p-8 text-center transition-all hover:border-red-500/30 hover:-translate-y-1 sm:items-start sm:text-left">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-black/60 text-red-500 red-shadow">
                            <Clock className="h-7 w-7" />
                        </div>
                        <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                            ЧАС — ЦЕ ГРОШІ
                        </h3>
                        <h2 className="mb-4 text-xl font-black uppercase text-white">
                            ГРАФІК ОПЕРАЦІЙ
                        </h2>
                        <p className="max-w-md text-sm font-bold leading-relaxed text-gray-400">
                            Оплата <span className="copper-text text-[#b87333]">до 14:00</span> — відправка в той же день. Після 14:00 — наступного робочого дня. Неділя — вихідний.
                        </p>
                    </div>

                </div>
            </div>
        </PageLayout>
    );
}