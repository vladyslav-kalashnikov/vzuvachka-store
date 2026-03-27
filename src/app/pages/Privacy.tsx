import * as React from "react";
import { PageLayout } from "./PageLayout";
import { ShieldCheck, Database } from "lucide-react";

export function Privacy() {
    return (
        <PageLayout
            title="Політика приватності"
            subtitle="Як ми працюємо з даними B2B-партнерів і представників компаній."
        >
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="tech-clip border border-white/10 bg-[#111] p-8 flex gap-6 items-start">
                    <ShieldCheck className="h-8 w-8 text-red-500 shrink-0 hidden sm:block" />
                    <p className="text-sm font-bold leading-relaxed text-gray-300">
                        Ми використовуємо контактні та комерційні дані лише в межах, потрібних для опрацювання заявок, погодження поставок, логістики, сервісних звернень і подальшої роботи з партнером.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="tech-clip border border-white/10 bg-black/40 p-8">
                        <Database className="h-6 w-6 text-gray-500 mb-4" />
                        <h2 className="mb-6 text-lg font-black uppercase text-white">Які дані збираємо</h2>
                        <ul className="space-y-3">
                            <li className="flex gap-2 text-sm text-gray-400 font-bold"><span className="text-red-500">■</span> Назву компанії, ПІБ контактної особи, телефон та email</li>
                            <li className="flex gap-2 text-sm text-gray-400 font-bold"><span className="text-red-500">■</span> Адресу доставки, регіон, формат продажу та сайт партнера</li>
                            <li className="flex gap-2 text-sm text-gray-400 font-bold"><span className="text-red-500">■</span> Історію заявок, поставок, рекламацій і сервісних звернень</li>
                        </ul>
                    </div>

                    <div className="tech-clip border border-white/10 bg-black/40 p-8">
                        <ShieldCheck className="h-6 w-6 text-gray-500 mb-4" />
                        <h2 className="mb-6 text-lg font-black uppercase text-white">Для чого це потрібно</h2>
                        <ul className="space-y-3">
                            <li className="flex gap-2 text-sm text-gray-400 font-bold"><span className="text-red-500">■</span> Підготовка прайсів і комерційних пропозицій</li>
                            <li className="flex gap-2 text-sm text-gray-400 font-bold"><span className="text-red-500">■</span> Відвантаження, документообіг і сервісна підтримка</li>
                            <li className="flex gap-2 text-sm text-gray-400 font-bold"><span className="text-red-500">■</span> Планування догрузок, комунікація та покращення сервісу</li>
                        </ul>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}