import * as React from "react";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getSetting, getSettingList } from "../lib/siteContent";

export function HeroSection() {
    const { settings } = useSiteSettings();

    const heroImage = getSetting(
        settings,
        "hero_image",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2000&auto=format&fit=crop"
    );
    const badge = getSetting(settings, "hero_badge", "B2B Платформа / Оптовий склад");
    const titleLine1 = getSetting(settings, "hero_title_line_1", "Взуття оптом");
    const titleLine2 = getSetting(settings, "hero_title_line_2", "від виробника.");
    const description = getSetting(
        settings,
        "hero_description",
        "Прямі поставки взуття без посередників. Мінімальне замовлення — 1 ящик (ростовка). Відправка в день оформлення заявки."
    );
    const primaryButtonText = getSetting(settings, "hero_primary_button_text", "Умови співпраці");
    const primaryButtonLink = getSetting(settings, "hero_primary_button_link", "#page/wholesale");
    const secondaryButtonText = getSetting(settings, "hero_secondary_button_text", "Перейти в каталог");
    const secondaryButtonLink = getSetting(settings, "hero_secondary_button_link", "#categories");
    const metrics = [
        {
            value: getSetting(settings, "hero_metric_1_value", "1 ящ"),
            label: getSetting(settings, "hero_metric_1_label", "Мінімальне замовлення"),
        },
        {
            value: getSetting(settings, "hero_metric_2_value", "24h"),
            label: getSetting(settings, "hero_metric_2_label", "Відправка після оплати"),
        },
        {
            value: getSetting(settings, "hero_metric_3_value", "100%"),
            label: getSetting(settings, "hero_metric_3_label", "Актуальна наявність"),
        },
    ];
    const capabilityLine = getSettingList(settings, "hero_capability_list", [
        "Опт",
        "Ростовки",
        "Дропшипінг",
        "Швидка відправка",
        "Прямі поставки",
        "B2B",
    ]);
    const stackedBadges = getSettingList(settings, "hero_badges_list", [
        "Для магазинів",
        "Для ринків",
        "Для онлайн-продажів",
    ]);
    const sideNotes = getSettingList(settings, "hero_side_notes", [
        "Швидкий старт",
        "Зрозумілі умови",
        "Постійна наявність",
    ]);
    const partnerBadge = getSetting(settings, "hero_partner_badge", "Умови опту");
    const partnerText = getSetting(
        settings,
        "hero_partner_text",
        "Відвантаження від 1 ящика. Регулярні оновлення асортименту."
    );
    const partnerRows = [
        {
            label: getSetting(settings, "hero_partner_label_1", "Ціноутворення"),
            value: getSetting(settings, "hero_partner_value_1", "Прямі ціни"),
        },
        {
            label: getSetting(settings, "hero_partner_label_2", "Способи оплати"),
            value: getSetting(settings, "hero_partner_value_2", "ФОП / Накладка"),
        },
        {
            label: getSetting(settings, "hero_partner_label_3", "Доставка"),
            value: getSetting(settings, "hero_partner_value_3", "Нова Пошта"),
        },
    ];
    const processBadge = getSetting(settings, "hero_process_badge", "Як це працює");
    const processTitleLine1 = getSetting(settings, "hero_process_title_line_1", "Заявка");
    const processTitleLine2 = getSetting(settings, "hero_process_title_line_2", "Відправка");
    const processDescription = getSetting(
        settings,
        "hero_process_description",
        "Обираєте товар, залишаєте контакт — ми телефонуємо і пакуємо ящики."
    );

    return (
        <section
            id="hero"
            className="mesh-dark relative overflow-hidden px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-28"
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />

            <div className="absolute left-6 top-28 hidden text-[10px] font-mono tracking-widest text-white/55 md:block">
                {sideNotes.map((item) => (
                    <p key={item}>{item}</p>
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-[1600px]">
                <div className="grid items-end gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">

                    {/* ЛІВА ЧАСТИНА (ТЕКСТ) */}
                    <div className="fade-up pb-2">
                        <div className="tech-clip mb-5 inline-flex max-w-full items-center gap-3 border border-white/10 bg-white/8 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:text-[10px] sm:tracking-[0.32em]">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            {badge}
                        </div>

                        <h1 className="mb-6 max-w-[980px] text-[clamp(3rem,16vw,8.25rem)] font-black uppercase leading-[0.86] tracking-[-0.06em] text-white sm:leading-[0.82] sm:tracking-[-0.08em]">
                            {titleLine1}
                            <br />
                            <span className="copper-text">{titleLine2}</span>
                        </h1>

                        <p className="mb-8 max-w-2xl border-l-2 border-red-600 pl-4 text-sm font-medium leading-7 text-gray-300 md:mb-10 md:text-lg">
                            {description}
                        </p>

                        <div className="mb-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                            <a
                                href={primaryButtonLink}
                                className="tech-clip flex w-full items-center justify-center gap-3 bg-white px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-black transition-colors hover:bg-red-600 hover:text-white sm:w-auto sm:px-10 sm:py-5 sm:text-xs sm:tracking-widest"
                            >
                                {primaryButtonText}
                                <ArrowRight className="h-4 w-4" />
                            </a>

                            <a
                                href={secondaryButtonLink}
                                className="tech-clip flex w-full items-center justify-center gap-3 border border-white/20 bg-black/20 px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:border-red-600 hover:text-red-400 sm:w-auto sm:px-10 sm:py-5 sm:text-xs sm:tracking-widest"
                            >
                                {secondaryButtonText}
                            </a>
                        </div>

                        <div className="mb-10 grid gap-4 md:grid-cols-3">
                            {metrics.map((item) => (
                                <div key={item.value} className="premium-panel tech-clip px-5 py-5">
                                    <p className="mb-2 text-3xl font-black uppercase text-white md:text-4xl">
                                        {item.value}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-bold">
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

                    {/* ПРАВА ЧАСТИНА (ФОТО + КАРТКИ) */}
                    <div className="relative fade-up lg:pl-6" style={{ animationDelay: "0.15s" }}>
                        <div className="tech-clip premium-panel relative min-h-[460px] overflow-hidden border border-white/10 p-3 sm:min-h-[600px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('${heroImage}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/0" />

                            <div className="relative flex min-h-[430px] flex-col justify-between p-4 sm:min-h-[570px] sm:p-5">
                                <div className="flex justify-start sm:justify-end">
                                    <div className="tech-clip border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-xl max-w-[250px]">
                                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-500">
                                            {partnerBadge}
                                        </p>
                                        <p className="mt-2 text-xs font-medium leading-5 text-white/90">
                                            {partnerText}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                                    <div className="tech-clip border border-white/12 bg-black/60 px-5 py-5 backdrop-blur-xl">
                                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-red-500">
                                            {getSetting(settings, "hero_partner_badge", "Для партнерів")}
                                        </p>
                                        <div className="grid gap-3 text-sm text-white/90">
                                            {partnerRows.map((item, index) => (
                                                <div
                                                    key={item.label}
                                                    className={`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between ${
                                                        index < partnerRows.length - 1
                                                            ? "border-b border-white/10 pb-2"
                                                            : ""
                                                    }`}
                                                >
                                                    <span className="text-gray-400">{item.label}</span>
                                                    <span className="font-black text-white">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="tech-clip border border-white/12 bg-[#f5efe7] px-5 py-5 text-black shadow-[0_24px_70px_rgba(220,38,38,0.15)]">
                                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-red-600">
                                            {processBadge}
                                        </p>
                                        <p className="text-2xl font-black uppercase leading-none sm:text-3xl">{processTitleLine1}</p>
                                        <p className="text-2xl font-black uppercase leading-none text-red-600 sm:text-3xl">{processTitleLine2}</p>
                                        <p className="mt-4 text-xs font-bold leading-5 text-black/70">
                                            {processDescription}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* РЯДОК, ЩО БІЖИТЬ */}
                <div className="mt-12 overflow-hidden border-y border-white/10 bg-white/[0.03] py-4 sm:mt-16">
                    <div className="marquee-track flex items-center gap-4">
                        {[...capabilityLine, ...capabilityLine, ...capabilityLine, ...capabilityLine].map((item, index) => (
                            <React.Fragment key={`${item}-${index}`}>
                                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/75 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
                                    {item}
                                </span>
                                <span className="text-red-500 font-black">/</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
