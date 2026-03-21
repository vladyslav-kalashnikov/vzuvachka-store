import * as React from "react";
import { PageLayout } from "./PageLayout";

const accessoryItems = [
    {
        title: "Устілки",
        text: "Додатковий комфорт для щоденного використання, роботи та довгих маршрутів.",
    },
    {
        title: "Шкарпетки",
        text: "Базові та функціональні моделі для міста, тренувань і холодної погоди.",
    },
    {
        title: "Засоби догляду",
        text: "Очищення, захист і підтримка матеріалів у хорошому стані.",
    },
    {
        title: "Додаткові аксесуари",
        text: "Корисні дрібниці для зберігання, догляду та покращення користувацького досвіду.",
    },
];

export function Accessories() {
    return (
        <PageLayout
            title="Устілки & Аксесуари"
            subtitle="Додаткові елементи комфорту, догляду та щоденного використання."
        >
            <section>
                <p>
                    У цьому розділі зібрані товари, які доповнюють основні колекції
                    ВЗУВАЧКИ: устілки, шкарпетки, аксесуари для догляду та корисні
                    доповнення для щоденного використання.
                </p>
                <p>
                    Розділ поступово наповнюється. Незабаром тут з’являться окремі картки
                    товарів з описами, характеристиками та варіантами вибору.
                </p>
            </section>

            <section>
                <h2>Що тут буде</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {accessoryItems.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-white/10 bg-black/20 p-5"
                        >
                            <h3 className="mb-3 text-lg font-bold text-white">{item.title}</h3>
                            <p className="text-sm leading-7 text-gray-300">{item.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section>
                <h2>Статус розділу</h2>
                <p>
                    Каталог аксесуарів у процесі наповнення. Слідкуйте за оновленнями або
                    напишіть нам, якщо хочете дізнатись про майбутні позиції раніше.
                </p>
            </section>
        </PageLayout>
    );
}