import * as React from "react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import {
    getPartnerContactInfo,
    getSetting,
    getSettingList,
} from "../lib/siteContent";
import { PageLayout } from "./PageLayout";

export function Contact() {
    const { settings } = useSiteSettings();
    const partnerContact = getPartnerContactInfo(settings);
    const contactCards = [
        {
            title: getSetting(settings, "contact_email_card_title", "Email"),
            value: partnerContact.email,
            href: partnerContact.emailHref,
            note: getSetting(
                settings,
                "contact_email_card_note",
                "Пишіть сюди, якщо хочете дізнатися ціни, наявність або умови."
            ),
        },
        {
            title: getSetting(settings, "contact_phone_card_title", "Телефон / месенджери"),
            value: partnerContact.phone,
            href: partnerContact.phoneHref,
            note: getSetting(
                settings,
                "contact_phone_card_note",
                "Швидкий зв'язок із менеджером по замовленнях і доставці."
            ),
        },
        {
            title: getSetting(settings, "contact_address_card_title", "Адреса"),
            value: partnerContact.address,
            href: partnerContact.mapUrl,
            note: getSetting(
                settings,
                "contact_address_card_note",
                "Контакти для документів, логістики та організаційних питань."
            ),
        },
    ];
    const helpItems = getSettingList(settings, "contact_help_list", [
        "Підібрати товари для вашого магазину",
        "Підказати ціни і наявність",
        "Пояснити умови доставки і повторних замовлень",
        "Рекламації, документи та робота зі складом",
    ]);

    return (
        <PageLayout
            title={getSetting(settings, "contact_page_title", "Контакти")}
            subtitle={getSetting(
                settings,
                "contact_page_subtitle",
                "Напишіть або зателефонуйте нам, якщо хочете дізнатися умови чи зробити замовлення."
            )}
        >
            <section>
                <p>
                    {getSetting(
                        settings,
                        "contact_page_intro",
                        "Якщо вам потрібні ціни, наявність, допомога з вибором або консультація по замовленню, звертайтеся напряму. Відповідаємо просто і по суті."
                    )}
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
                    <h2>{getSetting(settings, "contact_help_title", "Чим можемо допомогти")}</h2>
                    <ul>
                        {helpItems.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>{getSetting(settings, "contact_response_title", "Режим відповіді")}</h2>
                    <p>
                        {getSetting(
                            settings,
                            "contact_response_text",
                            partnerContact.hours
                        )}
                    </p>
                    <p>
                        {getSetting(
                            settings,
                            "contact_response_direct_label",
                            "Прямий контакт для заявок:"
                        )}{" "}
                        <a href={partnerContact.emailHref}>{partnerContact.email}</a>
                    </p>
                </div>
            </section>
        </PageLayout>
    );
}
