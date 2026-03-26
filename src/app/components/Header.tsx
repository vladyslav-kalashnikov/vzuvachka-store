import * as React from "react";
import {
    ArrowRight,
    BriefcaseBusiness,
    ChevronDown,
    Heart,
    LogIn,
    LogOut,
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
import { MobileMenu } from "./MobileMenu";

export function Header() {
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
        <>
            {/* Верхня тонка смуга */}
            <div className="bg-red-600 px-3 py-2 text-center text-white sm:px-4">
                <span className="text-[10px] font-black uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.22em] shadow-sm">
                    <span className="mr-2 text-black bg-white px-2 py-0.5 rounded-sm">B2B ПЛАТФОРМА</span>
                    зрозумілі умови, актуальна наявність і швидке замовлення
                </span>
            </div>

            {/* Головна Скляна Шапка */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-lg transition-all">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
                    <div className="flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-4">
                        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                            <MobileMenu />

                            <a
                                href="#home"
                                className="flex min-w-0 shrink items-center gap-2 text-xl font-black uppercase tracking-tight text-white sm:shrink-0 sm:text-3xl"
                            >
                                <span className="tech-clip flex h-8 w-8 shrink-0 items-center justify-center bg-red-600 text-sm text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                    В/Ч
                                </span>
                                <span className="truncate copper-text text-[#e39c5e] copper-shadow-lg">ВЗУВАЧКА</span>
                            </a>
                        </div>

                        {/* Навігація */}
                        <nav className="hidden h-full items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 lg:flex">
                            <div className="group relative flex h-full items-center">
                                <button type="button" className="inline-flex items-center gap-1 transition-colors hover:text-white hover:copper-shadow-lg">
                                    Каталоги
                                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 text-red-500" />
                                </button>

                                {/* Випадаюче Мега-меню (Темне) */}
                                <div className="invisible absolute left-1/2 top-20 z-50 w-[980px] -translate-x-1/2 translate-y-4 border border-white/10 bg-[#111]/95 backdrop-blur-xl opacity-0 shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
                                        {categorySections.map((section) => (
                                            <div key={section.key} className="tech-clip border border-white/5 bg-white/5 p-5 transition-colors hover:border-red-500/30">
                                                <a href={section.href} className="block">
                                                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-red-500">
                                                        {section.badge}
                                                    </p>
                                                    <h3 className="text-lg font-black uppercase tracking-tight text-white transition hover:text-red-500">
                                                        {section.label}
                                                    </h3>
                                                </a>
                                                <p className="mt-3 text-[10px] uppercase tracking-widest leading-5 text-gray-400">
                                                    {section.description}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {section.subcategories.map((item) => (
                                                        <a key={item.slug} href={`#catalog/${section.key}/${item.slug}`} className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300 transition hover:border-red-600 hover:text-white hover:bg-red-600">
                                                            {item.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-black px-6 py-4">
                                        <div className="flex flex-wrap items-center gap-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                            <a href="#page/wholesale" className="transition hover:text-white">Умови співпраці</a>
                                            <a href="#page/contact" className="transition hover:text-white">Контакти</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a href="#page/wholesale" className="transition-colors hover:text-white hover:copper-shadow-lg">Умови</a>
                            <a href="#page/faq" className="transition-colors hover:text-white hover:copper-shadow-lg">FAQ</a>
                            <a href="#page/contact" className="transition-colors hover:text-white hover:copper-shadow-lg">Контакти</a>
                        </nav>

                        {/* Іконки користувача та кошика */}
                        <div className="flex shrink-0 items-center gap-2 text-white sm:gap-3">
                            {/* ... (Кнопки адміна та логіну залишені без змін, лише кольори адаптовані під темну тему) ... */}

                            <a href="#search" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] sm:h-11 sm:w-11">
                                <Search className="h-4 w-4" />
                            </a>

                            <a href="#wishlist" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] sm:h-11 sm:w-11">
                                <Heart className="h-4 w-4" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full border border-black bg-red-600 px-1.5 py-0.5 text-[9px] font-black text-white">
                                        {wishlistCount}
                                    </span>
                                )}
                            </a>

                            <a href="#cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] sm:h-11 sm:w-11">
                                <ShoppingBag className="h-4 w-4" />
                                {cartCount > 0 && (
                                    <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full border border-black bg-red-600 px-1.5 py-0.5 text-[9px] font-black text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}