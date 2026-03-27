import * as React from "react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getSetting } from "../lib/siteContent";

export function Reviews() {
    const { settings } = useSiteSettings();
    const trustStats = [
        {
            value: getSetting(settings, "reviews_stat_1_value", "3 дні"),
            label: getSetting(settings, "reviews_stat_1_label", "щоб узгодити перше замовлення"),
        },
        {
            value: getSetting(settings, "reviews_stat_2_value", "Швидко"),
            label: getSetting(settings, "reviews_stat_2_label", "повторюємо замовлення по популярних товарах"),
        },
    ];

    const reviews = [
        {
            text:
                settings.review_1_text ||
                "Ми швидко отримали список товарів для старту і без проблем зробили перше замовлення. Усе було зрозуміло з першого разу.",
            author: settings.review_1_author || "Магазин, Львів",
        },
        {
            text:
                settings.review_2_text ||
                "Подобається, що можна швидко дізнатися про наявність, поставити питання і дозамовити те, що добре продається.",
            author: settings.review_2_author || "Онлайн-магазин, Київ",
        },
    ];

    return (
        <section id="reviews" className="relative overflow-hidden border-t border-white/5 bg-[#0a0a0a] py-20 text-white sm:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.05),transparent_25%)]" />
            <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6">

                {/* ВИПРАВЛЕНИЙ БЛОК: Використовуємо flex + min-w-0 замість grid, щоб текст не ламався */}
                <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <p className="mb-4 inline-block rounded-full border border-red-500/20 bg-red-600/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-red-500">
                            {getSetting(settings, "reviews_badge", "Відгуки")}
                        </p>
                        <h2 className="break-words text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
                            {getSetting(settings, "reviews_title", "Люди повертаються,")}
                            <br />
                            <span className="copper-text text-[#e39c5e] copper-shadow-lg">
                                {getSetting(settings, "reviews_title_accent", "бо з нами просто")}
                            </span>
                        </h2>
                    </div>

                    <div className="grid w-full shrink-0 gap-3 sm:grid-cols-2 lg:w-auto">
                        {trustStats.map((item) => (
                            <div key={item.label} className="premium-panel tech-clip border border-white/10 bg-[#111] px-6 py-5">
                                <p className="copper-text text-2xl font-black uppercase text-[#e39c5e]">{item.value}</p>
                                <p className="mt-1 max-w-[140px] text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {reviews.map((review, i) => (
                        <div
                            key={review.author}
                            className="premium-panel tech-clip border border-white/10 bg-black/40 p-8 transition-colors hover:border-white/30"
                        >
                            <span className="mb-4 block text-6xl leading-none text-red-600/30">"</span>
                            <p className="mb-8 text-lg font-black uppercase leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
                                {review.text}
                            </p>
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                                <span className="mr-2 text-red-500">/</span> {review.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
