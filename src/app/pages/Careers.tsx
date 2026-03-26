import * as React from "react";
import { PageLayout } from "./PageLayout";

const roles = [
    {
        title: "Менеджер з продажу",
        type: "Full-time / Hybrid",
        text: "Робота з клієнтами, допомога з вибором товарів і супровід замовлень.",
    },
    {
        title: "Координатор поставок",
        type: "Full-time / On-site",
        text: "Контроль наявності, відправок, поставок і роботи зі складом.",
    },
    {
        title: "Аналітик категорій",
        type: "Contract / Remote",
        text: "Аналіз попиту, сезонності й підказки, які товари варто додавати в асортимент.",
    },
];

export function Careers() {
    return (
        <PageLayout
            title="Команда та вакансії"
            subtitle="Шукаємо людей, які допоможуть розвивати продажі, сервіс і доставку."
        >
            <section>
                <p>
                    Ми розвиваємо продажі, сервіс і поставки, тому шукаємо людей, які люблять
                    порядок у роботі, поважають клієнтів і вміють доводити справу до результату.
                </p>
            </section>

            <section>
                <h2>Відкриті ролі</h2>
                <div className="grid gap-4">
                    {roles.map((role) => (
                        <article
                            key={role.title}
                            className="rounded-2xl border border-white/10 bg-black/20 p-5"
                        >
                            <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                <h3>{role.title}</h3>
                                <span className="text-xs uppercase tracking-[0.22em] text-red-500">
                                    {role.type}
                                </span>
                            </div>
                            <p>{role.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section>
                <h2>Як подати заявку</h2>
                <p>
                    Надішліть резюме або короткий опис свого досвіду на{" "}
                    <a href="mailto:hr@vzuvachka.ua">hr@vzuvachka.ua</a>.
                </p>
            </section>
        </PageLayout>
    );
}
