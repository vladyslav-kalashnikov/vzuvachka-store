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
                    className="inline-flex h-10 w-10 items-center justify-center text-white transition-all hover:text-red-500 hover:scale-110 lg:hidden"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </SheetTrigger>

            {/* Темний фон панелі */}
            <SheetContent
                side="left"
                className="w-[92%] max-w-full border-r border-white/10 bg-[#0a0a0a] p-0 text-white sm:max-w-sm shadow-[20px_0_50px_rgba(0,0,0,0.8)]"
            >
                <SheetHeader className="border-b border-white/10 bg-[#111] px-5 py-6">
                    <SheetTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight text-white sm:text-2xl">
                        <span className="tech-clip flex h-8 w-8 items-center justify-center bg-red-600 text-sm text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                            В/Ч
                        </span>
                        <span className="copper-text text-[#e39c5e] copper-shadow-lg">ВЗУВАЧКА</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="flex h-full flex-col overflow-y-auto pb-20">
                    {/* Головна кнопка (Умови) */}
                    <div className="border-b border-white/10 px-5 py-5">
                        <a
                            href="#page/wholesale"
                            className="tech-clip group flex items-center justify-between bg-red-600 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                        >
                            Умови співпраці
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>

                    {/* Швидкі посилання */}
                    <div className="border-b border-white/10 px-5 py-5">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <QuickLink href="#search" icon={<Search className="h-5 w-5" />} label="Пошук" />
                            <QuickLink
                                href="#wishlist"
                                icon={<Heart className="h-5 w-5" />}
                                label={`Обране (${wishlistCount})`}
                                highlight={wishlistCount > 0}
                            />
                            <QuickLink
                                href="#cart"
                                icon={<ShoppingBag className="h-5 w-5" />}
                                label={`Заявка (${cartCount})`}
                                highlight={cartCount > 0}
                            />
                        </div>
                    </div>

                    {/* Акаунт */}
                    <div className="border-b border-white/10 px-5 py-5">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-gray-500">
                            Акаунт
                        </p>
                        {!user ? (
                            <div className="grid gap-3">
                                <QuickAction href="#page/login" icon={<LogIn className="h-4 w-4" />} label="Вхід" />
                                <QuickAction href="#page/register" icon={<UserPlus className="h-4 w-4" />} label="Реєстрація" />
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                <div className="tech-clip border border-white/10 bg-[#111] px-4 py-4 text-white">
                                    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-500">
                                        Активна сесія
                                    </p>
                                    <p className="mt-1 text-xs font-bold break-all text-white">
                                        {user.email || "Мій акаунт"}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="tech-clip group flex items-center justify-between border border-white/10 bg-white/5 px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-gray-300 transition hover:border-red-500 hover:text-white"
                                >
                                    <span className="inline-flex items-center gap-3">
                                        <span className="text-white/40 group-hover:text-red-500"><LogOut className="h-4 w-4" /></span>
                                        Вийти
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Адмін */}
                    {isAdmin && (
                        <div className="border-b border-white/10 px-5 py-5">
                            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-red-500">
                                Адмін-панелі
                            </p>
                            <div className="grid gap-3">
                                {adminLinks.map((item) => (
                                    <QuickAction
                                        key={item.href}
                                        href={item.href}
                                        icon={<Shield className="h-4 w-4" />}
                                        label={item.label}
                                        isAdminLink
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Категорії (Акордеон) */}
                    <div className="border-b border-white/10 px-5 py-2">
                        <Accordion type="multiple" className="w-full">
                            {categorySections.map((section) => (
                                <AccordionItem key={section.key} value={section.key} className="border-white/10">
                                    <AccordionTrigger className="py-5 text-xs font-black uppercase tracking-[0.2em] text-white hover:text-red-500 hover:no-underline">
                                        {section.shortLabel}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4 pb-4 pl-2 border-l border-white/10 ml-2">
                                            <a
                                                href={section.href}
                                                className="block text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400"
                                            >
                                                Увесь сегмент
                                            </a>
                                            {section.subcategories.map((item) => (
                                                <a
                                                    key={item.slug}
                                                    href={`#catalog/${section.key}/${item.slug}`}
                                                    className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-white"
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

                    {/* Корисні сторінки */}
                    <div className="px-5 py-6">
                        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-gray-500">
                            Навігація
                        </p>
                        <div className="space-y-3">
                            {infoLinks.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="tech-clip flex items-center justify-between border border-white/5 bg-black/40 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-300 transition hover:border-white/20 hover:text-white"
                                >
                                    {item.label}
                                    <ChevronRight className="h-4 w-4 text-gray-600" />
                                </a>
                            ))}
                            <a
                                href="#page/sale"
                                className="tech-clip flex items-center justify-between border border-white/5 bg-black/40 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-300 transition hover:border-red-500/50 hover:text-red-400"
                            >
                                Складські лоти
                                <ChevronRight className="h-4 w-4 text-red-500" />
                            </a>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

// Допоміжні компоненти
function QuickLink({
                       href,
                       icon,
                       label,
                       highlight
                   }: {
    href: string;
    icon: React.ReactNode;
    label: string;
    highlight?: boolean;
}) {
    return (
        <a
            href={href}
            className={`tech-clip group flex min-h-[72px] flex-col justify-between border bg-[#111] px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.15em] transition-all sm:min-h-[84px] sm:text-xs ${
                highlight
                    ? "border-red-500/50 text-white shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:border-red-500 hover:bg-red-600/10"
                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
            }`}
        >
            <span className={`transition-colors ${highlight ? "text-red-500" : "text-gray-500 group-hover:text-white"}`}>
                {icon}
            </span>
            <span>{label}</span>
        </a>
    );
}

function QuickAction({
                         href,
                         icon,
                         label,
                         isAdminLink
                     }: {
    href: string;
    icon: React.ReactNode;
    label: string;
    isAdminLink?: boolean;
}) {
    return (
        <a
            href={href}
            className={`tech-clip group flex items-center justify-between gap-3 border px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.18em] transition-all sm:text-[11px] ${
                isAdminLink
                    ? "border-red-500/20 bg-red-600/5 text-gray-300 hover:border-red-500 hover:bg-red-600/20 hover:text-white"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-red-500 hover:text-white"
            }`}
        >
            <span className="inline-flex min-w-0 items-center gap-3">
                <span className={`transition-colors ${isAdminLink ? "text-red-500" : "text-white/40 group-hover:text-red-500"}`}>
                    {icon}
                </span>
                <span className="min-w-0">{label}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-white" />
        </a>
    );
}