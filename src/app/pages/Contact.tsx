import * as React from "react";
import { partnerContact } from "../data/b2bContent";
import { PageLayout } from "./PageLayout";

const contactCards = [
    {
        title: "Email",
        value: partnerContact.email,
        href: partnerContact.emailHref,
        note: "Пишіть сюди, якщо хочете дізнатися ціни, наявність або умови.",
    },
    {
        title: "Телефон / месенджери",
        value: partnerContact.phone,
        href: partnerContact.phoneHref,
        note: "Швидкий зв'язок із менеджером по замовленнях і доставці.",
    },
    {
        title: "Адреса",
        value: partnerContact.address,
        href: "https://maps.google.com/?q=Хмельницький,+Водопровідна+75/1",
        note: "Контакти для документів, логістики та організаційних питань.",
    },
];

export function Contact() {
    return (
        <PageLayout
            title="Контакти"
            subtitle="Напишіть або зателефонуйте нам, якщо хочете дізнатися умови чи зробити замовлення."
        >
            <section>
                <p>
                    Якщо вам потрібні ціни, наявність, допомога з вибором або консультація по
                    замовленню, звертайтеся напряму. Відповідаємо просто і по суті.
                </p>
            </section>

            <section>
                <h2>Канали зв'язку</h2>
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
                        <li>Підібрати товари для вашого магазину</li>
                        <li>Підказати ціни і наявність</li>
                        <li>Пояснити умови доставки і повторних замовлень</li>
                        <li>Рекламації, документи та робота зі складом</li>
                    </ul>
                </div>

                <div>
                    <h2>Режим відповіді</h2>
                    <p>{partnerContact.hours}</p>
                    <p>
                        Прямий контакт для заявок:{" "}
                        <a href={partnerContact.emailHref}>{partnerContact.email}</a>
                    </p>
                </div>
            </section>
        </PageLayout>
    );
}
