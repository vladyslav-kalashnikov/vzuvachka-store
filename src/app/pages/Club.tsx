import * as React from "react";
import { PageLayout } from "./PageLayout";

const perks = [
    "Пріоритетний доступ до складських лотів і тестових матриць",
    "Ранній перегляд нових SKU перед сезоном",
    "Комерційні пропозиції для швидкого запуску категорії",
    "Окремі умови на догрузки для активних партнерів",
    "Прямий контакт із менеджером по асортименту",
    "Менше шуму, більше конкретики по продажах і запуску",
];

export function Club() {
    return (
        <PageLayout
            title="Партнерська програма"
            subtitle="Формат для тих, хто хоче працювати з ВЗУВАЧКА глибше й отримувати нові можливості раніше."
        >
            <section>
                <p>
                    Це окремий партнерський контур для активних дилерів і команд, які регулярно
                    працюють із брендом, тестують нові SKU і хочуть швидко заходити в сезонні
                    можливості.
                </p>
            </section>

            <section>
                <h2>Що входить у програму</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {perks.map((item) => (
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
                <h2>Як приєднатися</h2>
                <p>
                    Напишіть коротко про свій канал продажу, географію та обсяги на{" "}
                    <a href="mailto:b2b@vzuvachka.ua">b2b@vzuvachka.ua</a>.
                </p>
            </section>
        </PageLayout>
    );
}
