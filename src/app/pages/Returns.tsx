import * as React from "react";
import { Camera, Mail, RefreshCcw } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import {
    getPartnerContactInfo,
    getSetting,
    getSettingList,
} from "../lib/siteContent";
import { PageLayout } from "./PageLayout";

export function Returns() {
    const { settings } = useSiteSettings();
    const partnerContact = getPartnerContactInfo(settings);
    const requirements = getSettingList(settings, "returns_requirements_list", [
        "Номер замовлення або накладної",
        "Фото або відео проблемної позиції",
        "Короткий опис ситуації та кількість одиниць",
        "Контактні дані відповідальної особи",
    ]);

    return (
        <PageLayout
            title={getSetting(settings, "returns_page_title", "Рекламації та повернення")}
            subtitle={getSetting(
                settings,
                "returns_page_subtitle",
                "Що робити, якщо з товаром або доставкою виникла проблема."
            )}
        >
            <div className="mx-auto max-w-4xl space-y-10">
                <div className="tech-clip border border-white/10 bg-[#111] p-8 text-center sm:text-left">
                    <RefreshCcw className="mb-4 h-10 w-10 text-red-500 mx-auto sm:mx-0" />
                    <p className="text-sm font-bold leading-relaxed text-gray-300">
                        {getSetting(
                            settings,
                            "returns_intro",
                            "Ми розглядаємо звернення, якщо товар прийшов не той, є виробничий дефект або сталася помилка під час комплектації. Кожну ситуацію перевіряємо окремо для швидкого вирішення."
                        )}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="tech-clip premium-panel border border-white/10 bg-black/40 p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <Camera className="h-6 w-6 text-[#e39c5e]" />
                            <h2 className="text-lg font-black uppercase text-white">
                                {getSetting(settings, "returns_requirements_title", "Що потрібно для звернення")}
                            </h2>
                        </div>
                        <ul className="space-y-3 mt-6">
                            {requirements.map((text) => (
                                <li key={text} className="flex items-start gap-3 text-xs font-bold text-gray-400">
                                    <span className="text-red-500">■</span> {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="tech-clip premium-panel border border-red-500/20 bg-[#111] p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <Mail className="h-6 w-6 text-red-500" />
                            <h2 className="text-lg font-black uppercase text-white">
                                {getSetting(settings, "returns_process_title", "Порядок роботи")}
                            </h2>
                        </div>
                        <p className="mt-6 text-sm font-bold leading-relaxed text-gray-400">
                            {getSetting(
                                settings,
                                "returns_process_text_1",
                                "Напишіть нам на електронну пошту і вкажіть номер поставки, назву товару та суть питання."
                            )}
                        </p>
                        <p className="my-2">
                            <a
                                href={partnerContact.emailHref}
                                className="inline-block text-lg text-white transition-colors hover:text-red-500"
                            >
                                {partnerContact.email}
                            </a>
                        </p>
                        <p className="text-xs font-bold text-gray-500">
                            {getSetting(
                                settings,
                                "returns_process_text_2",
                                "Після перевірки ми запропонуємо заміну, компенсацію або інше взаємовигідне рішення."
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
