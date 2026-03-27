import * as React from "react";
import {
    ArrowRight,
    ChevronDown,
    Mail,
    MapPin,
    Phone,
    ShoppingBag,
} from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import {
    getManagedCategorySections,
    getPartnerContactInfo,
    getSetting,
    getSettingList,
} from "../lib/siteContent";

type FooterSection = {
    title: string;
    links: Array<{
        label: string;
        href: string;
    }>;
};

function cx(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(" ");
}

function FooterAccordion({
    section,
    defaultOpen = false,
}: {
    section: FooterSection;
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <div className="border-b border-white/8 md:border-none">
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left md:pointer-events-none md:py-0"
            >
                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white/85">
                    {section.title}
                </span>
                <ChevronDown
                    className={cx(
                        "h-4 w-4 shrink-0 text-white/60 transition-transform md:hidden",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            <div
                className={cx(
                    "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 md:grid-rows-[1fr] md:opacity-100",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"
                )}
            >
                <div className="min-h-0 overflow-hidden">
                    <ul className="space-y-3 pb-5 md:pt-5 md:pb-0">
                        {section.links.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400 transition-colors hover:text-white"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function SupportItem({
    icon,
    href,
    children,
    accent = false,
}: {
    icon: React.ReactNode;
    href?: string;
    children: React.ReactNode;
    accent?: boolean;
}) {
    const content = (
        <div
            className={cx(
                "flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 transition-colors",
                accent
                    ? "text-white hover:border-red-500/60 hover:bg-red-500/10"
                    : "text-gray-300 hover:border-white/15 hover:text-white"
            )}
        >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 text-red-500">
                {icon}
            </div>
            <div className="min-w-0 text-sm font-medium leading-6">{children}</div>
        </div>
    );

    if (!href) {
        return content;
    }

    return <a href={href}>{content}</a>;
}

export function Footer() {
    const { settings } = useSiteSettings();
    const partnerContact = getPartnerContactInfo(settings);
    const categorySections = getManagedCategorySections(settings);
    const footerSections: FooterSection[] = [
        {
            title: "Каталог",
            links: [
                ...categorySections.map((section) => ({
                    label: section.shortLabel,
                    href: section.href,
                })),
                { label: "Складські лоти", href: getSetting(settings, "category_sale_link", "#page/sale") },
            ],
        },
        {
            title: "Партнерам",
            links: [
                { label: "Оптовий портал", href: "#page/wholesale" },
                { label: "Доставка та оплата", href: "#page/delivery" },
                { label: "Умови поставки", href: "#page/shipping" },
                { label: "Повернення", href: "#page/returns" },
                { label: "FAQ", href: "#page/faq" },
            ],
        },
        {
            title: "Компанія",
            links: [
                { label: "Про нас", href: "#page/about" },
                { label: "Вакансії", href: "#page/careers" },
                { label: "Контакти B2B", href: "#page/contact" },
                { label: "Мапа сайту", href: "#page/sitemap" },
                { label: "Політика даних", href: "#page/privacy" },
            ],
        },
    ];
    const highlightTags = getSettingList(settings, "footer_tags", [
        "Опт",
        "Швидкий старт",
        "Повторні замовлення",
    ]);
    const brandSubtitle = getSetting(settings, "footer_brand_subtitle", "B2B supply platform");
    const description = getSetting(
        settings,
        "footer_description",
        "Платформа для wholesale-замовлень без зайвої плутанини: актуальний каталог, швидкий зв'язок, підбір товарів і підтримка повторних закупівель."
    );
    const primaryButtonText = getSetting(settings, "footer_primary_button_text", "Оптовий портал");
    const primaryButtonLink = getSetting(settings, "footer_primary_button_link", "#page/wholesale");
    const secondaryButtonText = getSetting(settings, "footer_secondary_button_text", "Написати менеджеру");
    const secondaryButtonLink = getSetting(settings, "footer_secondary_button_link", "#page/contact");
    const supportTitle = getSetting(settings, "footer_support_title", "B2B Підтримка");
    const phoneLabel = getSetting(settings, "footer_phone_label", "Телефон");
    const emailLabel = getSetting(settings, "footer_email_label", "Email");
    const addressLabel = getSetting(settings, "footer_address_label", "Відправка");
    const hoursTitle = getSetting(settings, "footer_hours_title", "Графік роботи");
    const hoursText = getSetting(
        settings,
        "footer_hours_text",
        `${partnerContact.hours}. Після заявки менеджер підтвердить наявність, матрицю та умови відправки.`
    );
    const legalText = getSetting(
        settings,
        "footer_legal_text",
        `© ${new Date().getFullYear()} ВЗУВАЧКА B2B. Всі права захищено.`
    );

    return (
        <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-[#080808] text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(220,38,38,0.10),transparent_24%),radial-gradient(circle_at_85%_10%,rgba(249,115,22,0.10),transparent_22%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:auto,auto,44px_44px,44px_44px]" />

            <div className="relative mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)_minmax(300px,0.95fr)] lg:gap-14">
                    <div className="min-w-0 space-y-8">
                        <a href="#home" className="inline-flex items-center gap-3">
                            <span className="tech-clip flex h-11 w-11 items-center justify-center bg-red-600 text-sm font-black text-white">
                                В/Ч
                            </span>
                            <span className="min-w-0">
                                <span className="block text-2xl font-black uppercase tracking-tight text-white">
                                    ВЗУВАЧКА
                                </span>
                                <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">
                                    {brandSubtitle}
                                </span>
                            </span>
                        </a>

                        <p className="max-w-md text-sm leading-7 text-gray-300">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {highlightTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/75"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <a
                                href={primaryButtonLink}
                                className="tech-clip inline-flex items-center justify-between gap-3 bg-white px-5 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-black transition-colors hover:bg-red-600 hover:text-white"
                            >
                                {primaryButtonText}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href={secondaryButtonLink}
                                className="tech-clip inline-flex items-center justify-between gap-3 border border-white/10 bg-white/[0.03] px-5 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:border-red-500 hover:text-red-400"
                            >
                                {secondaryButtonText}
                                <Mail className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div className="grid gap-2 md:grid-cols-3 md:gap-8">
                        {footerSections.map((section, index) => (
                            <FooterAccordion
                                key={section.title}
                                section={section}
                                defaultOpen={index === 0}
                            />
                        ))}
                    </div>

                    <div className="tech-clip border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-6">
                        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-red-500">
                            {supportTitle}
                        </p>

                        <div className="space-y-3">
                            <SupportItem icon={<Phone className="h-4 w-4" />} href={partnerContact.phoneHref} accent>
                                <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                                    {phoneLabel}
                                </span>
                                <span className="block break-words text-base font-black text-white">
                                    {partnerContact.phone}
                                </span>
                            </SupportItem>

                            <SupportItem icon={<Mail className="h-4 w-4" />} href={partnerContact.emailHref}>
                                <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                                    {emailLabel}
                                </span>
                                <span className="block break-all text-sm font-bold text-white">
                                    {partnerContact.email}
                                </span>
                            </SupportItem>

                            <SupportItem icon={<MapPin className="h-4 w-4" />}>
                                <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                                    {addressLabel}
                                </span>
                                <span className="block text-sm font-bold text-white">
                                    {partnerContact.address}
                                </span>
                            </SupportItem>
                        </div>

                        <div className="mt-5 rounded-2xl border border-white/8 bg-black/30 px-4 py-4">
                            <div className="mb-2 flex items-center gap-2 text-white">
                                <ShoppingBag className="h-4 w-4 text-red-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                                    {hoursTitle}
                                </span>
                            </div>
                            <p className="text-sm font-medium leading-6 text-gray-300">
                                {hoursText}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-5 border-t border-white/8 pt-8 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 sm:mt-16 md:flex-row md:items-center md:justify-between">
                    <div>
                        {legalText}
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                        <a className="transition-colors hover:text-white" href="#page/privacy">
                            Політика приватності
                        </a>
                        <a className="transition-colors hover:text-white" href="#page/terms">
                            Умови платформи
                        </a>
                        <a className="transition-colors hover:text-white" href="#page/sitemap">
                            Мапа сайту
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
