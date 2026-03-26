import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { PageLayout } from "./PageLayout";

const faqItems = [
    {
        question: "Яке мінімальне замовлення?",
        answer:
            "Зазвичай можна почати з невеликого замовлення. Точну кількість підкажемо залежно від товару.",
    },
    {
        question: "Чи можна дізнатися ціни без замовлення?",
        answer:
            "Так. Ви можете спочатку дізнатися ціни, умови і наявність, а вже потім вирішити щодо замовлення.",
    },
    {
        question: "Чи допоможете вибрати товари?",
        answer:
            "Так. Ми підкажемо, які моделі, розміри і супутні товари краще підійдуть для старту.",
    },
    {
        question: "Чи можна робити повторні замовлення?",
        answer:
            "Так. Після першого замовлення можна легко дозамовляти популярні товари.",
    },
    {
        question: "Чи працюєте з компаніями та великими замовленнями?",
        answer:
            "Так. Ми працюємо і з магазинами, і з компаніями, яким потрібні більші обсяги.",
    },
];

export function Faq() {
    return (
        <PageLayout
            title="Поширені питання"
            subtitle="Короткі відповіді про замовлення, ціни, доставку і співпрацю."
        >
            <section>
                <p>
                    Тут зібрані короткі відповіді на найчастіші запитання. Якщо потрібна допомога
                    саме під ваш запит, просто напишіть нам.
                </p>
            </section>

            <section>
                <h2>База відповідей</h2>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-5">
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem
                                key={item.question}
                                value={`item-${index}`}
                                className="border-white/10"
                            >
                                <AccordionTrigger className="py-5 text-base font-bold text-white hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>

                                <AccordionContent className="pb-5 pr-8 text-sm leading-7 text-gray-300">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            <section>
                <h2>Потрібен швидкий контакт?</h2>
                <p>
                    Напишіть на <a href="mailto:b2b@vzuvachka.ua">b2b@vzuvachka.ua</a> або залиште
                    заявку через сайт.
                </p>
            </section>
        </PageLayout>
    );
}
