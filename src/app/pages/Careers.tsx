import * as React from "react";
import { PageLayout } from "./PageLayout";

const roles = [
    {
        title: "Frontend Developer",
        type: "Full-time / Remote",
        text: "Розробка інтерфейсів магазину, продуктових сторінок, адаптивних секцій, анімацій та внутрішніх інструментів.",
    },
    {
        title: "UI/UX Designer",
        type: "Contract / Remote",
        text: "Створення візуальних концепцій, сторінок продукту, дизайн-системи та покращення e-commerce UX.",
    },
    {
        title: "Product / Material Specialist",
        type: "Part-time / Hybrid",
        text: "Дослідження матеріалів, тестування комфорту, захисту, зносостійкості та конструктивних рішень.",
    },
];

export function Careers() {
    return (
        <PageLayout
            title="Кар’єра"
            subtitle="Станьте частиною команди, що змінює правила гри."
        >
            <section>
                <p>
                    У ВЗУВАЧЦІ ми будуємо не просто магазин взуття. Ми створюємо бренд з
                    чітким характером, сильним візуальним кодом та функціональним
                    продуктом для людей, які не готові йти на компроміси між стилем,
                    комфортом і захистом.
                </p>
                <p>
                    Ми шукаємо людей, які хочуть впливати на результат, пропонувати
                    сміливі рішення та працювати над продуктом, який виділяється на ринку.
                </p>
            </section>

            <section>
                <h2>Відкриті позиції</h2>
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
                    Надішліть своє резюме, портфоліо або посилання на проєкти. Нам
                    важливо побачити ваш стиль мислення, підхід до роботи та увагу до
                    деталей.
                </p>
                <p>
                    Email для заявок: <a href="mailto:hr@vzuvachka.ua">hr@vzuvachka.ua</a>
                </p>
            </section>
        </PageLayout>
    );
}