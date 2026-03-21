import * as React from "react";
import { PageLayout } from "./PageLayout";

const mainLinks = [
  { href: "#home", label: "Головна" },
  { href: "#categories", label: "Категорії" },
  { href: "#bestsellers", label: "Бестселери" },
  { href: "#collab", label: "Колаборації" },
  { href: "#reviews", label: "Відгуки" },
];

const catalogLinks = [
  { href: "#page/sale", label: "Архів / Розпродаж" },
  { href: "#page/women", label: "Жіноча колекція" },
  { href: "#page/men", label: "Чоловіча колекція" },
  { href: "#page/kids", label: "Дитяче взуття" },
  { href: "#page/work", label: "ВЗУВАЧКА PRO™" },
];

const infoLinks = [
  { href: "#page/about", label: "Про ВЗУВАЧКУ" },
  { href: "#page/shipping", label: "Доставка та строки" },
  { href: "#page/returns", label: "Повернення" },
  { href: "#page/faq", label: "Питання та відповіді" },
  { href: "#page/contact", label: "Контакти" },
  { href: "#page/club", label: "A/D CLUB" },
  { href: "#page/careers", label: "Кар’єра" },
  { href: "#page/privacy", label: "Політика приватності" },
  { href: "#page/terms", label: "Умови користування" },
];

export function Sitemap() {
  return (
      <PageLayout title="Мапа сайту" subtitle="Повна структура навігації сайту.">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h2>Основні секції</h2>
            <ul>
              {mainLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h2>Каталог</h2>
            <ul>
              {catalogLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h2>Інформація</h2>
            <ul>
              {infoLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
              ))}
            </ul>
          </div>
        </section>
      </PageLayout>
  );
}