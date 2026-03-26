import * as React from "react";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function HeroSection() {
    const { settings } = useSiteSettings();

    const heroImage =
        settings.hero_image ||
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2000&auto=format&fit=crop";

    const badge = settings.hero_badge || "Просто замовити, легко продавати";
    const titleLine1 = settings.hero_title_line_1 || "Взуття";
    const titleLine2 = settings.hero_title_line_2 || "для вашого магазину.";
    const description =
        settings.hero_description ||
        "Ми допоможемо вибрати товари, підкажемо по наявності, узгодимо умови і швидко підготуємо замовлення.";
    const metrics = [
        { value: "48h", label: "щоб підготувати першу пропозицію" },
        { value: "5", label: "основних категорій товарів" },
        { value: "1", label: "менеджер для ваших замовлень" },
    ];
    const capabilityLine = [
        "Наявність",
        "Ціни",
        "Каталог",
        "Швидка відправка",
        "Допомога з вибором",
        "Аксесуари",
    ];
    const stackedBadges = [
        "Для магазинів",
        "Для онлайн-продажів",
        "Для великих замовлень",
    ];

    return (
        <section
            id="hero"
            className="mesh-dark relative overflow-hidden px-6 pb-24 pt-28 text-white"
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />

            <div className="absolute left-6 top-28 hidden text-[10px] font-mono tracking-widest text-white/55 md:block">
                <p>Швидкий старт</p>
                <p>Зрозумілі умови</p>
                <p>Підтримка на кожному етапі</p>
            </div>

            <div className="relative z-10 mx-auto max-w-[1600px]">
                <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
                    <div className="fade-up pb-2">
                        <div className="tech-clip mb-5 inline-flex items-center gap-3 border border-white/10 bg-white/8 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.32em] text-white backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            {badge}
                        </div>

                        <h1 className="mb-6 max-w-[980px] text-6xl font-black uppercase leading-[0.82] tracking-[-0.08em] text-white md:text-[92px] lg:text-[132px]">
                            {titleLine1}
                            <br />
                            <span className="copper-text">{titleLine2}</span>
                        </h1>

                        <p className="mb-10 max-w-2xl border-l-2 border-red-600 pl-4 text-sm font-medium leading-7 text-gray-300 md:text-lg">
                            {description}
                        </p>

                        <div className="mb-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                            <a
                                href="#page/wholesale"
                                className="tech-clip flex items-center justify-center gap-3 bg-white px-10 py-5 text-xs font-extrabold uppercase tracking-widest text-black transition-colors hover:bg-red-600 hover:text-white"
                            >
                                Дізнатися умови
                                <ArrowRight className="h-4 w-4" />
                            </a>

                            <a
                                href="#categories"
                                className="tech-clip flex items-center justify-center gap-3 border border-white/20 bg-black/20 px-10 py-5 text-xs font-extrabold uppercase tracking-widest text-white transition-colors hover:border-red-600 hover:text-red-400"
                            >
                                Переглянути категорії
                            </a>
                        </div>

                        <div className="mb-10 grid gap-4 md:grid-cols-3">
                            {metrics.map((item) => (
                                <div key={item.value} className="premium-panel tech-clip px-5 py-5">
                                    <p className="mb-2 text-3xl font-black uppercase text-white md:text-4xl">
                                        {item.value}
                                    </p>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-300">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {stackedBadges.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="relative fade-up lg:pl-6" style={{ animationDelay: "0.15s" }}>
                        <div className="tech-clip premium-panel relative min-h-[600px] overflow-hidden border border-white/10 p-3">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('${heroImage}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/0" />

                            <div className="relative flex min-h-[570px] flex-col justify-between p-5">
                                <div className="flex justify-end">
                                    <div className="tech-clip border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-xl">
                                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-400">
                                            Launch Kit
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-white/80">
                                            Прайс, матриця, рекомендовані SKU та стартовий план продажу.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                                    <div className="tech-clip border border-white/12 bg-black/55 px-5 py-5 backdrop-blur-xl">
                                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-red-400">
                                            Що важливо
                                        </p>
                                        <div className="grid gap-3 text-sm text-white/85">
                                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                                <span>Популярні товари</span>
                                                <span className="font-black text-white">актуальна наявність</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                                <span>Повторне замовлення</span>
                                                <span className="font-black text-white">швидке погодження</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Категорії</span>
                                                <span className="font-black text-white">5 напрямів</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tech-clip border border-white/12 bg-[#f5efe7] px-5 py-5 text-black shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
                                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-red-600">
                                            Як це працює
                                        </p>
                                        <p className="text-3xl font-black uppercase leading-none">заявка</p>
                                        <p className="text-3xl font-black uppercase leading-none text-red-600">відправка</p>
                                        <p className="mt-4 text-sm leading-6 text-black/70">
                                            Короткий і зрозумілий шлях від першого звернення до готового замовлення.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 overflow-hidden border-y border-white/10 bg-white/[0.03] py-4">
                    <div className="marquee-track flex items-center gap-4">
                        {[...capabilityLine, ...capabilityLine, ...capabilityLine].map((item, index) => (
                            <React.Fragment key={`${item}-${index}`}>
                                <span className="rounded-full border border-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-white/75">
                                    {item}
                                </span>
                                <span className="text-red-500">/</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
