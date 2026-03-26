"use client";

import * as React from "react";
import {
    ChevronRight,
    Heart,
    LogIn,
    LogOut,
    Menu,
    Search,
    Shield,
    ShoppingBag,
    UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { signOut } from "../../lib/api/auth";
import { adminLinks, categorySections, infoLinks } from "../data/b2bContent";
import { useAuthUser } from "../hooks/useAuthUser";
import { useShop } from "../store/useShop";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export function MobileMenu() {
    const { cartCount, wishlistCount } = useShop();
    const { user, isAdmin } = useAuthUser();

    const handleLogout = async () => {
        try {
            await signOut();
            toast.success("Ви вийшли з акаунта");
            window.location.hash = "#home";
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося завершити сесію");
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button
                    type="button"
                    aria-label="Відкрити меню"
                    className="inline-flex h-10 w-10 items-center justify-center text-black transition hover:text-red-600 lg:hidden"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </SheetTrigger>

            <SheetContent
                side="left"
                className="w-[88%] border-r border-black/10 bg-white p-0 text-black sm:max-w-sm"
            >
                <SheetHeader className="border-b border-black/10 px-5 py-5">
                    <SheetTitle className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight text-black">
                        <span
                            className="flex h-8 w-8 items-center justify-center bg-red-600 text-sm text-white"
                            style={{
                                clipPath:
                                    "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                            }}
                        >
                            В/Ч
                        </span>
                        ВЗУВАЧКА
                    </SheetTitle>
                </SheetHeader>

                <div className="flex h-full flex-col overflow-y-auto">
                    <div className="border-b border-black/10 px-5 py-4">
                        <a
                            href="#page/wholesale"
                            className="flex items-center justify-between rounded-2xl bg-[#111] px-4 py-4 text-xs font-black uppercase tracking-[0.2em] text-white"
                        >
                            Умови співпраці
                            <ChevronRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="border-b border-black/10 px-5 py-4">
                        <div className="grid grid-cols-3 gap-3">
                            <QuickLink href="#search" icon={<Search className="h-4 w-4" />} label="Пошук" />
                            <QuickLink
                                href="#wishlist"
                                icon={<Heart className="h-4 w-4" />}
                                label={`Обране (${wishlistCount})`}
                            />
                            <QuickLink
                                href="#cart"
                                icon={<ShoppingBag className="h-4 w-4" />}
                                label={`Заявка (${cartCount})`}
                            />
                        </div>
                    </div>

                    <div className="border-b border-black/10 px-5 py-4">
                        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-gray-500">
                            Акаунт
                        </p>
                        {!user ? (
                            <div className="grid gap-3">
                                <QuickAction href="#page/login" icon={<LogIn className="h-4 w-4" />} label="Вхід" />
                                <QuickAction href="#page/register" icon={<UserPlus className="h-4 w-4" />} label="Реєстрація" />
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                <div className="rounded-2xl border border-black/10 bg-[#111] px-4 py-4 text-white">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/50">
                                        Активна сесія
                                    </p>
                                    <p className="mt-2 text-sm font-bold break-all">
                                        {user.email || "Мій акаунт"}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center justify-between border border-black/10 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:border-red-600 hover:text-red-600"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <LogOut className="h-4 w-4" />
                                        Вийти
                                    </span>
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {isAdmin && (
                        <div className="border-b border-black/10 px-5 py-4">
                            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-gray-500">
                                Адмін-панелі
                            </p>
                            <div className="grid gap-3">
                                {adminLinks.map((item) => (
                                    <QuickAction
                                        key={item.href}
                                        href={item.href}
                                        icon={<Shield className="h-4 w-4" />}
                                        label={item.label}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="border-b border-black/10 px-5 py-2">
                        <Accordion type="multiple" className="w-full">
                            {categorySections.map((section) => (
                                <AccordionItem key={section.key} value={section.key}>
                                    <AccordionTrigger className="py-4 text-sm font-black uppercase tracking-[0.18em] text-black hover:no-underline">
                                        {section.shortLabel}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-3 pb-3 pl-1">
                                            <a
                                                href={section.href}
                                                className="block text-sm font-semibold text-black hover:text-red-600"
                                            >
                                                Увесь сегмент
                                            </a>
                                            {section.subcategories.map((item) => (
                                                <a
                                                    key={item.slug}
                                                    href={`#catalog/${section.key}/${item.slug}`}
                                                    className="block text-sm text-gray-700 hover:text-red-600"
                                                >
                                                    {item.label}
                                                </a>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="px-5 py-5">
                        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-gray-500">
                            Корисні сторінки
                        </p>
                        <div className="space-y-3">
                            {infoLinks.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center justify-between border border-black/10 px-4 py-3 text-sm font-semibold text-black transition hover:border-red-600 hover:text-red-600"
                                >
                                    {item.label}
                                    <ChevronRight className="h-4 w-4" />
                                </a>
                            ))}
                            <a
                                href="#page/sale"
                                className="flex items-center justify-between border border-black/10 px-4 py-3 text-sm font-semibold text-black transition hover:border-red-600 hover:text-red-600"
                            >
                                Складські лоти
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function QuickLink({
    href,
    icon,
    label,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <a
            href={href}
            className="flex min-h-[84px] flex-col justify-between border border-black/10 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:border-red-600 hover:text-red-600"
        >
            {icon}
            <span>{label}</span>
        </a>
    );
}

function QuickAction({
    href,
    icon,
    label,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <a
            href={href}
            className="flex items-center justify-between border border-black/10 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:border-red-600 hover:text-red-600"
        >
            <span className="inline-flex items-center gap-2">
                {icon}
                {label}
            </span>
            <ChevronRight className="h-4 w-4" />
        </a>
    );
}
