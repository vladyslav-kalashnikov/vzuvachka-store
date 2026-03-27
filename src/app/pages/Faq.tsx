import * as React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getPartnerContactInfo, getSetting } from "../lib/siteContent";
import { PageLayout } from "./PageLayout";

export function Faq() {
    const { settings } = useSiteSettings();
    const partnerContact = getPartnerContactInfo(settings);
    const faqItems = [
        {
            question: getSetting(settings, "faq_question_1", "Яке мінімальне замовлення?"),
            answer: getSetting(
                settings,
                "faq_answer_1",
                "Зазвичай можна почати з невеликого замовлення. Точну кількість підкажемо залежно від товару."
            ),
        },
        {
            question: getSetting(settings, "faq_question_2", "Чи можна дізнатися ціни без замовлення?"),
            answer: getSetting(
                settings,
                "faq_answer_2",
                "Так. Ви можете спочатку дізнатися ціни, умови і наявність, а вже потім вирішити щодо замовлення."
            ),
        },
        {
            question: getSetting(settings, "faq_question_3", "Чи допоможете вибрати товари?"),
            answer: getSetting(
                settings,
                "faq_answer_3",
                "Так. Ми підкажемо, які моделі, розміри і супутні товари краще підійдуть для старту."
            ),
        },
        {
            question: getSetting(settings, "faq_question_4", "Чи можна робити повторні замовлення?"),
            answer: getSetting(
                settings,
                "faq_answer_4",
                "Так. Після першого замовлення можна легко дозамовляти популярні товари."
            ),
        },
        {
            question: getSetting(settings, "faq_question_5", "Чи працюєте з компаніями та великими замовленнями?"),
            answer: getSetting(
                settings,
                "faq_answer_5",
                "Так. Ми працюємо і з магазинами, і з компаніями, яким потрібні більші обсяги."
            ),
        },
    ];

    return (
        <PageLayout
            title={getSetting(settings, "faq_page_title", "Поширені питання")}
            subtitle={getSetting(
                settings,
                "faq_page_subtitle",
                "Короткі відповіді про замовлення, ціни, доставку і співпрацю."
            )}
        >
            <section>
                <p>
                    {getSetting(
                        settings,
                        "faq_intro",
                        "Тут зібрані короткі відповіді на найчастіші запитання. Якщо потрібна допомога саме під ваш запит, просто напишіть нам."
                    )}
                </p>
            </section>

            <section>
                <h2>{getSetting(settings, "faq_section_title", "База відповідей")}</h2>

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
                <h2>{getSetting(settings, "faq_contact_title", "Потрібен швидкий контакт?")}</h2>
                <p>
                    {getSetting(
                        settings,
                        "faq_contact_text",
                        "Напишіть нам напряму або залиште заявку через сайт."
                    )}{" "}
                    <a href={partnerContact.emailHref}>{partnerContact.email}</a>
                </p>
            </section>
        </PageLayout>
    );
}
