import * as React from "react";
import { PageLayout } from "./PageLayout";
import { Truck, CreditCard, PackageOpen, Clock } from "lucide-react";

export function DeliveryPage() {
    return (
        <PageLayout title="Умови співпраці" subtitle="Прозорі правила для вашого бізнесу">
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">

                {/* Мінімальне замовлення */}
                <div className="tech-clip border border-white/10 bg-[#111] p-8 transition-colors hover:border-red-500/50">
                    <PackageOpen className="mb-6 h-10 w-10 text-red-500" />
                    <h3 className="mb-4 text-xl font-black uppercase text-white">1. Мінімальне замовлення</h3>
                    <p className="text-sm font-bold leading-relaxed text-gray-400">
                        Ми працюємо виключно оптом. Мінімальне замовлення складає <span className="text-white">1 ящик (ростовку)</span>.
                        Кількість пар у ящику та доступні розміри вказані в картці кожного товару.
                    </p>
                </div>

                {/* Оплата */}
                <div className="tech-clip border border-white/10 bg-[#111] p-8 transition-colors hover:border-red-500/50">
                    <CreditCard className="mb-6 h-10 w-10 text-red-500" />
                    <h3 className="mb-4 text-xl font-black uppercase text-white">2. Оплата</h3>
                    <ul className="space-y-3 text-sm font-bold text-gray-400">
                        <li className="flex items-start gap-2"><span className="text-red-500">■</span> Оплата на розрахунковий рахунок ФОП.</li>
                        <li className="flex items-start gap-2"><span className="text-red-500">■</span> Накладений платіж (із мінімальною передоплатою за доставку).</li>
                    </ul>
                </div>

                {/* Доставка */}
                <div className="tech-clip border border-white/10 bg-[#111] p-8 transition-colors hover:border-red-500/50">
                    <Truck className="mb-6 h-10 w-10 text-red-500" />
                    <h3 className="mb-4 text-xl font-black uppercase text-white">3. Доставка</h3>
                    <p className="text-sm font-bold leading-relaxed text-gray-400">
                        Відправляємо замовлення транспортною компанією <span className="text-white">Нова Пошта</span> по всій території України. Доставку оплачує отримувач за тарифами перевізника.
                    </p>
                </div>

                {/* Графік відправок */}
                <div className="tech-clip border border-white/10 bg-[#111] p-8 transition-colors hover:border-red-500/50">
                    <Clock className="mb-6 h-10 w-10 text-red-500" />
                    <h3 className="mb-4 text-xl font-black uppercase text-white">4. Графік відправок</h3>
                    <p className="text-sm font-bold leading-relaxed text-gray-400">
                        Замовлення, оформлені та підтверджені <span className="text-white">до 14:00</span>, відправляються в той самий день.
                        Замовлення після 14:00 їдуть на наступний робочий день. Неділя — вихідний.
                    </p>
                </div>

            </div>
        </PageLayout>
    );
}