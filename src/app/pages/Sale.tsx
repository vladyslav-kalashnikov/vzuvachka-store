import * as React from "react";
import { PageLayout } from "./PageLayout";

const saleNotes = [
    "Останні розміри",
    "Лімітовані залишки",
    "Архівні моделі",
    "Швидке оновлення доступності",
];

export function Sale() {
    return (
        <PageLayout
            title="Архів / Розпродаж"
            subtitle="Лімітовані пропозиції та останні розміри зі знижками."
        >
            <section>
                <p>
                    У цьому розділі з’являються архівні релізи, залишки розмірів та
                    окремі пропозиції зі знижками. Доступність змінюється швидко, тому
                    частина позицій може зникати майже миттєво.
                </p>
            </section>

            <section>
                <h2>Що тут буде</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {saleNotes.map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-white/10 bg-black/20 p-5"
                        >
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Статус розділу</h2>
                <p>
                    Система оновлює доступні моделі. Слідкуйте за дропами та архівними
                    оновленнями — екіпірування розкуповується швидко.
                </p>
            </section>
        </PageLayout>
    );
}