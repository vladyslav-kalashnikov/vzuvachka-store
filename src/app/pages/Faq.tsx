import * as React from "react";
import { PageLayout } from "./PageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqItems = [
  {
    question: "Як підібрати правильний розмір?",
    answer:
        "Орієнтуйтесь на таблицю розмірів на сторінці товару. Якщо сумніваєтесь між двома варіантами — напишіть нам, і ми допоможемо з підбором.",
  },
  {
    question: "Скільки триває доставка?",
    answer:
        "Зазвичай відправлення по Україні займає 1–3 дні через Нову пошту. У пікові періоди строки можуть трохи змінюватися.",
  },
  {
    question: "Чи можна повернути або обміняти товар?",
    answer:
        "Так. Ви можете оформити повернення або обмін протягом 14 днів, якщо товар новий, без слідів носіння і збережено повний комплект.",
  },
  {
    question: "Чи є передзамовлення на лімітовані дропи?",
    answer:
        "Для окремих релізів ми відкриваємо ранній доступ або передзамовлення. Найчастіше це доступно через клуб або анонсується окремо.",
  },
  {
    question: "Як зв’язатися з підтримкою?",
    answer:
        "Напишіть на hello@vzuvachka.ua або зверніться через Telegram / Viber. Ми допоможемо з розміром, доставкою, поверненням і статусом замовлення.",
  },
];

export function Faq() {
  return (
      <PageLayout
          title="Питання та відповіді"
          subtitle="Відповіді на найпоширеніші запитання."
      >
        <section>
          <p>
            Тут зібрані базові відповіді щодо замовлення, доставки, повернення та
            підбору моделей. Якщо не знайшли потрібну інформацію — напишіть нам.
          </p>
        </section>

        <section>
          <h2>FAQ / База відповідей</h2>

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
          <h2>Потрібна жива відповідь?</h2>
          <p>
            Контакти підтримки:{" "}
            <a href="mailto:hello@vzuvachka.ua">hello@vzuvachka.ua</a>
          </p>
        </section>
      </PageLayout>
  );
}