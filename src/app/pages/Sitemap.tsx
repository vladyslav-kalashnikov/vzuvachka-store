import * as React from "react";
import { categorySections, infoLinks } from "../data/b2bContent";
import { PageLayout } from "./PageLayout";

const mainLinks = [
    { href: "#home", label: "Головна" },
    { href: "#categories", label: "Категорії товарів" },
    { href: "#bestsellers", label: "Популярні товари" },
    { href: "#collab", label: "Як почати співпрацю" },
    { href: "#reviews", label: "Відгуки" },
];

export function Sitemap() {
    return (
        <PageLayout title="Мапа сайту" subtitle="Усі основні сторінки сайту в одному місці.">
            <section className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <h2>Головна</h2>
                    <ul>
                        {mainLinks.map((item) => (
                            <li key={item.href}>
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <h2>Каталоги</h2>
                    <ul>
                        {categorySections.map((item) => (
                            <li key={item.key}>
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                        <li>
                            <a href="#page/sale">Складські лоти</a>
                        </li>
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
                        <li><a href="#search">Пошук товарів</a></li>
                        <li><a href="#wishlist">Обране</a></li>
                        <li><a href="#cart">Заявка</a></li>
                    </ul>
                </div>
            </section>
        </PageLayout>
    );
}
