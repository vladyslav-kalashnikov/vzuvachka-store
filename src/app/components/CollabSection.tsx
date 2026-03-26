import * as React from "react";
import { useSiteSettings } from "../hooks/useSiteSettings";

const onboardingSteps = [
    "З'ясовуємо, які товари вам потрібні і для кого ви продаєте",
    "Допомагаємо вибрати моделі, розміри, кольори й супутні товари",
    "Погоджуємо умови, оплату, доставку і наступні замовлення",
];

export function CollabSection() {
    const { settings } = useSiteSettings();
    const tags = ["Магазин", "Онлайн", "Маркетплейс", "Компанія", "Опт"];

    const badge = settings.collab_badge || "Як почати співпрацю";
    const title1 = settings.collab_title_line_1 || "ПОЯСНЮЄМО";
    const title2 = settings.collab_title_line_2 || "ВСЕ ПРОСТО.";
    const description =
        settings.collab_description ||
        "Ми не ускладнюємо процес. Спочатку розуміємо ваш запит, потім пропонуємо товари і далі супроводжуємо замовлення.";
    const buttonText = settings.collab_button_text || "Зв'язатися з нами";
    const buttonLink = settings.collab_button_link || "#page/contact";
    const image =
        settings.collab_image ||
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop";

    return (
        <section id="collab" className="relative overflow-hidden bg-[#120d0b] py-24 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(249,115,22,0.2),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(239,68,68,0.15),transparent_18%)]" />
            <div className="mx-auto max-w-[1600px] px-6">
                <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
                    <div className="order-2 fade-up md:order-1">
                        <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-red-600">
                            {badge}
                        </p>
                        <div className="mb-5 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white/70"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="mb-8 text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
                            {title1}
                            <br />
                            <span
                                className="copper-text"
                            >
                                {title2}
                            </span>
                        </h2>
                        <p className="mb-8 max-w-xl border-l-2 border-red-600 pl-4 text-sm font-medium leading-relaxed text-gray-400">
                            {description}
                        </p>

                        <div className="mb-10 grid gap-3">
                            {onboardingSteps.map((item, index) => (
                                <div
                                    key={item}
                                    className="premium-panel tech-clip grid grid-cols-[44px_1fr] items-start gap-4 px-4 py-4 text-sm text-gray-300"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-black text-white">
                                        0{index + 1}
                                    </div>
                                    <div className="pt-1">{item}</div>
                                </div>
                            ))}
                        </div>

                        <a
                            href={buttonLink}
                            className="tech-clip inline-block bg-white px-10 py-5 text-xs font-extrabold uppercase tracking-widest text-black transition-colors hover:bg-red-600 hover:text-white"
                        >
                            {buttonText}
                        </a>
                    </div>

                    <div className="order-1 fade-up md:order-2" style={{ animationDelay: "0.2s" }}>
                        <div className="relative">
                            <img
                                src={image}
                                alt="Співпраця з клієнтами"
                                className="tech-clip aspect-[4/5] w-full object-cover grayscale transition-all duration-[2s] hover:grayscale-0"
                            />
                            <div className="tech-clip premium-panel float-slow absolute -bottom-6 left-0 max-w-[270px] px-5 py-5">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">
                                    Простий старт
                                </p>
                                <p className="mt-3 text-lg font-black uppercase text-white">
                                    Від першого повідомлення до першого замовлення без зайвих кроків.
                                </p>
                            </div>
                            <div className="tech-clip border border-white/10 bg-[#f4ece2] px-5 py-4 text-black shadow-[0_24px_70px_rgba(0,0,0,0.28)] float-soft absolute -right-2 top-10 w-[220px]">
                                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-red-600">
                                    Зрозуміло
                                </p>
                                <p className="mt-2 text-sm leading-6 text-black/70">
                                    Ми допомагаємо не лише купити товар, а й спокійно почати роботу з ним.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
