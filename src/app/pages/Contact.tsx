import * as React from "react";
import { PageLayout } from "./PageLayout";

const contactCards = [
    {
        title: "Електронна пошта",
        value: "hello@vzuvachka.ua",
        href: "mailto:hello@vzuvachka.ua",
        note: "Для запитань, замовлень, співпраці та сервісу.",
    },
    {
        title: "Телефон / месенджери",
        value: "+380 (93) 975 38 37",
        href: "tel:+380939753837",
        note: "Telegram / Viber / швидкий зв'язок з підтримкою.",
    },
    {
        title: "Головна база",
        value: "м. Хмельницький, вул. Водопровідна 75/1, оф. 205",
        href: "https://maps.google.com/?q=Хмельницький,+Водопровідна+75/1",
        note: "Операційний вузол, обробка заявок та координація сервісу.",
    },
];

export function Contact() {
    return (
        <PageLayout
            title="Контактний центр"
            subtitle="Система підтримки клієнтів працює 24/7."
        >
            <section>
                <p>
                    Потрібна допомога із замовленням, підбором моделі, поверненням або
                    доставкою — напишіть нам будь-яким зручним способом. Ми відповідаємо
                    швидко й без зайвої бюрократії.
                </p>
            </section>

            <section>
                <h2>Канали зв’язку</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    {contactCards.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-white/10 bg-black/20 p-5"
                        >
                            <h3>{item.title}</h3>
                            <p className="mt-2">
                                <a href={item.href} target="_blank" rel="noreferrer">
                                    {item.value}
                                </a>
                            </p>
                            <p className="mt-3 text-sm text-gray-400">{item.note}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <div>
                    <h2>Чим можемо допомогти</h2>
                    <ul>
                        <li>Підбір моделі та розміру</li>
                        <li>Статус замовлення</li>
                        <li>Умови доставки та повернення</li>
                        <li>Питання щодо колаборацій та партнерства</li>
                    </ul>
                </div>

                <div>
                    <h2>Режим відповіді</h2>
                    <p>
                        Підтримка працює без вихідних. Найшвидший спосіб зв’язку —
                        електронна пошта або месенджери.
                    </p>
                    <p>
                        Для заявок:{" "}
                        <a href="mailto:hello@vzuvachka.ua">hello@vzuvachka.ua</a>
                    </p>
                </div>
            </section>
        </PageLayout>
    );
}