import * as React from "react";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

type PageLayoutProps = {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
};

export function PageLayout({
                               title,
                               subtitle,
                               children,
                           }: PageLayoutProps) {
    return (
        <section className="relative min-h-screen overflow-hidden border-t border-white/5 bg-[#0a0a0a] pb-24 pt-24 font-sans">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.08),transparent_24%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:44px_44px]" />

            <div className="relative z-10 mx-auto max-w-[1200px] px-6">
                <div className="mb-10">
                    <a
                        href="#home"
                        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-gray-500 transition-colors hover:text-red-500"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        На базу
                    </a>
                </div>

                <header className="mb-10 rounded-[28px] border border-white/10 bg-white/[0.02] px-6 py-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm md:px-8 md:py-10">
                    <p className="mb-4 text-[10px] font-black uppercase tracking-[0.42em] text-red-600">
                        ВЗУВАЧКА // DATA NODE
                    </p>

                    <h1 className="max-w-4xl text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-6xl">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="mt-5 max-w-3xl border-l-2 border-red-600 pl-4 text-sm font-medium uppercase tracking-[0.14em] text-gray-400 md:text-base">
                            {subtitle}
                        </p>
                    )}
                </header>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8">
                        <div className="space-y-8 text-sm leading-7 text-gray-300 md:text-base [&_a]:border-b [&_a]:border-red-500/30 [&_a]:text-red-500 [&_a]:transition-colors hover:[&_a]:border-red-500 hover:[&_a]:text-red-400 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-[-0.03em] [&_h2]:text-white [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_li]:text-gray-300 [&_p]:text-gray-300 [&_section]:space-y-4 [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:marker:text-red-600">
                            {children}
                        </div>
                    </div>

                    <aside className="h-fit rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-gray-500">
                            SUPPORT / INFO
                        </p>

                        <div className="space-y-5">
                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                <div className="mb-2 flex items-center gap-2 text-white">
                                    <Mail className="h-4 w-4 text-red-500" />
                                    <span className="text-sm font-bold uppercase tracking-wide">
                    Контакт
                  </span>
                                </div>
                                <a
                                    href="mailto:hello@vzuvachka.ua"
                                    className="text-sm font-medium text-gray-300 transition-colors hover:text-red-400"
                                >
                                    hello@vzuvachka.ua
                                </a>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                <div className="mb-2 flex items-center gap-2 text-white">
                                    <ShieldCheck className="h-4 w-4 text-red-500" />
                                    <span className="text-sm font-bold uppercase tracking-wide">
                    Режим
                  </span>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Підтримка 24/7.
                                    <br />
                                    Обробка замовлень щодня.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-white">
                                    Навігація
                                </p>
                                <div className="flex flex-col gap-2 text-sm">
                                    <a href="#page/shipping">Доставка</a>
                                    <a href="#page/returns">Повернення</a>
                                    <a href="#page/faq">FAQ</a>
                                    <a href="#page/contact">Контакти</a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}