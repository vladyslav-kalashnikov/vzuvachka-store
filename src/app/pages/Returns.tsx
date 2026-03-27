import * as React from "react";
import { PageLayout } from "./PageLayout";
import { RefreshCcw, Camera, Mail } from "lucide-react";

export function Returns() {
    return (
        <PageLayout
            title="Рекламації та повернення"
            subtitle="Що робити, якщо з товаром або доставкою виникла проблема."
        >
            <div className="mx-auto max-w-4xl space-y-10">
                <div className="tech-clip border border-white/10 bg-[#111] p-8 text-center sm:text-left">
                    <RefreshCcw className="h-10 w-10 text-red-500 mb-4 mx-auto sm:mx-0" />
                    <p className="text-sm font-bold leading-relaxed text-gray-300">
                        Ми розглядаємо звернення, якщо товар прийшов не той, є виробничий дефект або сталася помилка під час комплектації. Кожну ситуацію перевіряємо окремо для швидкого вирішення.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="tech-clip premium-panel border border-white/10 bg-black/40 p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <Camera className="h-6 w-6 text-[#e39c5e]" />
                            <h2 className="text-lg font-black uppercase text-white">Що потрібно для звернення</h2>
                        </div>
                        <ul className="space-y-3 mt-6">
                            {[
                                "Номер замовлення або накладної",
                                "Фото або відео проблемної позиції",
                                "Короткий опис ситуації та кількість одиниць",
                                "Контактні дані відповідальної особи"
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3 text-xs font-bold text-gray-400">
                                    <span className="text-red-500">■</span> {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="tech-clip premium-panel border border-red-500/20 bg-[#111] p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <Mail className="h-6 w-6 text-red-500" />
                            <h2 className="text-lg font-black uppercase text-white">Порядок роботи</h2>
                        </div>
                        <p className="mt-6 text-sm font-bold leading-relaxed text-gray-400">
                            Напишіть нам на електронну пошту <br/>
                            <a href="mailto:opt@vzuvachka.com" className="text-white hover:text-red-500 transition-colors my-2 inline-block text-lg">opt@vzuvachka.com</a> <br/>
                            і вкажіть номер поставки, назву товару та суть питання.
                        </p>
                        <p className="mt-4 text-xs font-bold text-gray-500">
                            Після перевірки ми запропонуємо заміну, компенсацію або інше взаємовигідне рішення.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}