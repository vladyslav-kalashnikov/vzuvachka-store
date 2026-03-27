import * as React from "react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getSetting, getSettingList } from "../lib/siteContent";

export function CollabSection() {
    const { settings } = useSiteSettings();
    const tags = getSettingList(settings, "collab_tags", [
        "Магазин",
        "Онлайн",
        "Маркетплейс",
        "Компанія",
        "Опт",
    ]);
    const onboardingSteps = getSettingList(settings, "collab_steps", [
        "З'ясовуємо, які товари вам потрібні і для кого ви продаєте",
        "Допомагаємо вибрати моделі, розміри, кольори й супутні товари",
        "Погоджуємо умови, оплату, доставку і наступні замовлення",
    ]);
    const badge = getSetting(settings, "collab_badge", "Як почати співпрацю");
    const title1 = getSetting(settings, "collab_title_line_1", "ПОЯСНЮЄМО");
    const title2 = getSetting(settings, "collab_title_line_2", "ВСЕ ПРОСТО.");
    const description = getSetting(
        settings,
        "collab_description",
        "Ми не ускладнюємо процес. Спочатку розуміємо ваш запит, потім пропонуємо товари і далі супроводжуємо замовлення."
    );
    const buttonText = getSetting(settings, "collab_button_text", "Зв'язатися з нами");
    const buttonLink = getSetting(settings, "collab_button_link", "#page/contact");
    const image = getSetting(
        settings,
        "collab_image",
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
    );
    const card1Badge = getSetting(settings, "collab_card_1_badge", "Простий старт");
    const card1Title = getSetting(
        settings,
        "collab_card_1_title",
        "Від першого повідомлення до першого замовлення без зайвих кроків."
    );
    const card2Badge = getSetting(settings, "collab_card_2_badge", "Зрозуміло");
    const card2Text = getSetting(
        settings,
        "collab_card_2_text",
        "Ми допомагаємо не лише купити товар, а й спокійно почати роботу з ним."
    );

    return (
        <section id="collab" className="relative overflow-hidden bg-[#120d0b] py-16 text-white sm:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(249,115,22,0.2),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(239,68,68,0.15),transparent_18%)]" />
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
                <div className="grid grid-cols-1 items-center gap-10 sm:gap-16 md:grid-cols-2">
                    <div className="order-2 fade-up md:order-1">
                        <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-red-600 sm:tracking-[0.4em]">
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
                        <h2 className="mb-8 text-[clamp(2.75rem,13vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tight sm:tracking-tighter md:text-7xl">
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
                                    className="premium-panel tech-clip grid grid-cols-[40px_1fr] items-start gap-4 px-4 py-4 text-sm text-gray-300 sm:grid-cols-[44px_1fr]"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-black text-white sm:h-11 sm:w-11">
                                        0{index + 1}
                                    </div>
                                    <div className="pt-1">{item}</div>
                                </div>
                            ))}
                        </div>

                        <a
                            href={buttonLink}
                            className="tech-clip inline-flex w-full items-center justify-center bg-white px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-black transition-colors hover:bg-red-600 hover:text-white sm:w-auto sm:px-10 sm:py-5 sm:text-xs sm:tracking-widest"
                        >
                            {buttonText}
                        </a>
                    </div>

                    <div className="order-1 fade-up md:order-2" style={{ animationDelay: "0.2s" }}>
                        <div className="relative space-y-4 md:space-y-0">
                            <img
                                src={image}
                                alt="Співпраця з клієнтами"
                                className="tech-clip aspect-[4/4.9] w-full object-cover grayscale transition-all duration-[2s] hover:grayscale-0 sm:aspect-[4/5]"
                            />
                            <div className="tech-clip premium-panel relative max-w-full px-5 py-5 md:absolute md:-bottom-6 md:left-0 md:max-w-[270px]">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">
                                    {card1Badge}
                                </p>
                                <p className="mt-3 text-base font-black uppercase text-white sm:text-lg">
                                    {card1Title}
                                </p>
                            </div>
                            <div className="tech-clip border border-white/10 bg-[#f4ece2] px-5 py-4 text-black shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:absolute md:-right-2 md:top-10 md:w-[220px]">
                                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-red-600">
                                    {card2Badge}
                                </p>
                                <p className="mt-2 text-sm leading-6 text-black/70">
                                    {card2Text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
