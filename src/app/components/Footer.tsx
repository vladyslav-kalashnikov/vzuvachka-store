import * as React from "react";
import { categorySections, infoLinks, partnerContact } from "../data/b2bContent";

function cx(...cls: Array<string | false | null | undefined>) {
    return cls.filter(Boolean).join(" ");
}

export function Footer() {
    return (
        <footer className="mt-20 border-t border-white/10 bg-[#0a0a0a] font-sans text-white">
            <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-24">
                <div className="grid gap-16 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="tech-clip flex h-10 w-10 items-center justify-center bg-red-600 text-sm font-black text-white">
                                В/Ч
                            </div>
                            <div>
                                <div className="text-xl font-black uppercase tracking-tight text-white sm:text-2xl sm:tracking-tighter">
                                    ВЗУВАЧКА
                                </div>
                                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 sm:tracking-[0.3em]">
                                    взуття для магазинів і замовлень
                                </div>
                            </div>
                        </div>

                        <p className="max-w-md text-sm leading-7 text-gray-400">
                            Допомагаємо магазинам і компаніям замовляти взуття без зайвих
                            складнощів: підказуємо по товарах, наявності, доставці та повторних
                            замовленнях.
                        </p>

                        <div className="mt-10 space-y-3 text-[13px] font-bold uppercase tracking-widest text-gray-400">
                            <div>
                                Телефон:
                                <a
                                    className="ml-2 text-white transition-colors hover:text-red-500"
                                    href={partnerContact.phoneHref}
                                >
                                    {partnerContact.phone}
                                </a>
                            </div>
                            <div>
                                Email:
                                <a
                                    className="ml-2 break-all text-white transition-colors hover:text-red-500"
                                    href={partnerContact.emailHref}
                                >
                                    {partnerContact.email}
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 space-y-2 border-t border-white/10 pt-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            <p className="mb-3 text-red-600">Контакти</p>
                            <p>Команда продажів: ВЗУВАЧКА</p>
                            <p>Реквізити надаємо після узгодження замовлення</p>
                            <p className="leading-relaxed">{partnerContact.address}</p>
                            <p>{partnerContact.hours}</p>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                            <FooterCol title="Каталоги">
                                {categorySections.map((section) => (
                                    <FooterLink key={section.key} to={section.href}>
                                        {section.shortLabel}
                                    </FooterLink>
                                ))}
                                <FooterLink to="#page/sale">Складські лоти</FooterLink>
                            </FooterCol>

                            <FooterCol title="Корисне">
                                <FooterLink to="#page/wholesale">Умови співпраці</FooterLink>
                                <FooterLink to="#wishlist">Обране</FooterLink>
                                <FooterLink to="#cart">Заявка</FooterLink>
                                <FooterLink to="#search">Пошук товарів</FooterLink>
                                <FooterLink to="#page/register">Мій акаунт</FooterLink>
                            </FooterCol>

                            <FooterCol title="Інформація">
                                {infoLinks.map((item) => (
                                    <FooterLink key={item.href} to={item.href}>
                                        {item.label}
                                    </FooterLink>
                                ))}
                                <FooterLink to="#page/privacy">Політика даних</FooterLink>
                                <FooterLink to="#page/terms">Умови платформи</FooterLink>
                            </FooterCol>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="tech-clip border border-white/10 bg-[#111] p-6 sm:p-8">
                            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                                Допомога
                            </p>
                            <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-white">
                                Маєте питання?
                            </h3>
                            <p className="mb-8 text-[12px] font-medium uppercase leading-relaxed tracking-[0.1em] text-gray-400 sm:tracking-[0.16em]">
                                Пояснимо умови, підкажемо по товарах і допоможемо з першим
                                замовленням.
                            </p>

                            <div className="grid gap-3">
                                <a
                                    href="#page/wholesale"
                                    className="tech-clip w-full bg-white px-6 py-4 text-center text-[11px] font-black uppercase tracking-widest text-black transition-colors hover:bg-red-600 hover:text-white"
                                >
                                    Дізнатися умови
                                </a>
                                <a
                                    href="#page/contact"
                                    className="tech-clip w-full border border-white/10 px-6 py-4 text-center text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:border-red-600 hover:text-red-500"
                                >
                                    Написати менеджеру
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:tracking-[0.2em]">
                    <div>© 2026 ВЗУВАЧКА. Всі права захищено.</div>

                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                        <a className="transition-colors hover:text-white" href="#page/terms">
                            Умови співпраці
                        </a>
                        <a className="transition-colors hover:text-white" href="#page/privacy">
                            Політика приватності
                        </a>
                        <a className="transition-colors hover:text-white" href="#page/size-guide">
                            Розмірні матриці
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterCol({
    title,
    children,
    className,
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cx("min-w-0", className)}>
            <div className="mb-6 inline-block border-b border-white/10 pb-2 text-[11px] font-black uppercase tracking-widest text-white">
                {title}
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

function FooterLink({
    to,
    children,
    className,
}: {
    to: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <a
            href={to}
            className={cx(
                "block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 transition-colors hover:text-white sm:tracking-widest",
                className
            )}
        >
            {children}
        </a>
    );
}
