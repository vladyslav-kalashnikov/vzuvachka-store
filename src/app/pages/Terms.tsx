import * as React from "react";
import { PageLayout } from "./PageLayout";
import { FileText, AlertCircle } from "lucide-react";

export function Terms() {
    return (
        <PageLayout
            title="Умови користування B2B-платформою"
            subtitle="Коротко про правила взаємодії з сайтом і комерційною інформацією."
        >
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="tech-clip border border-white/10 bg-[#111] p-8 flex gap-6 items-start">
                    <FileText className="h-8 w-8 text-[#e39c5e] shrink-0 hidden sm:block" />
                    <p className="text-sm font-bold leading-relaxed text-gray-300">
                        Користуючись сайтом ВЗУВАЧКА B2B, ви погоджуєтесь із тим, що контент, прайси, описи товарів і комерційні матеріали використовуються для ознайомлення та підготовки до співпраці, а не як автоматична публічна оферта.
                    </p>
                </div>

                <div className="tech-clip border border-red-500/20 bg-black/40 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertCircle className="h-6 w-6 text-red-500" />
                        <h2 className="text-lg font-black uppercase text-white">Основні положення</h2>
                    </div>
                    <ul className="space-y-4">
                        {[
                            "Актуальні ціни й залишки підтверджуються менеджером у момент погодження заявки.",
                            "Ми можемо оновлювати асортимент, умови поставки та інформацію про SKU без попереднього анонсу.",
                            "Використання матеріалів сайту допускається лише в межах узгодженої співпраці."
                        ].map((text, i) => (
                            <li key={i} className="flex gap-3 text-sm font-bold text-gray-400 bg-[#111] p-4 border border-white/5">
                                <span className="text-red-500 font-black">0{i+1}</span>
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </PageLayout>
    );
}