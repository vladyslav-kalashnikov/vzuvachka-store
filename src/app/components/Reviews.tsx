import * as React from "react";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function Reviews() {
    const { settings } = useSiteSettings();
    const trustStats = [
        { value: "3 дні", label: "щоб узгодити перше замовлення" },
        { value: "Швидко", label: "повторюємо замовлення по популярних товарах" },
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
        <section id="reviews" className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white sm:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.12),transparent_22%)]" />
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
                <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-red-600">
                            {settings.reviews_badge || "Відгуки"}
                        </p>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
                            Люди повертаються,
                            <br />
                            <span className="copper-text">бо з нами просто</span>
                        </h2>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        {trustStats.map((item) => (
                            <div key={item.label} className="premium-panel tech-clip px-5 py-4">
                                <p className="text-2xl font-black uppercase text-white">{item.value}</p>
                                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-400">
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
                            className="premium-panel tech-clip fade-up p-8"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        >
                            <span className="mb-4 block text-6xl leading-none text-white/10">"</span>
                            <p className="mb-8 text-xl font-black uppercase leading-tight tracking-tight text-white sm:text-2xl md:text-4xl md:tracking-tighter">
                                {review.text}
                            </p>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                // {review.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
