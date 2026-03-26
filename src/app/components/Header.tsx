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
            <div className="bg-[#111] px-3 py-2 text-center text-white sm:px-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.22em]">
                    <span className="mr-2 text-red-500">VZUVACHKA</span>
                    зрозумілі умови, актуальна наявність і швидке замовлення
                </span>
            </div>

            <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
                    <div className="flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-4">
                        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                            <MobileMenu />

                            <a
                                href="#home"
                                className="flex min-w-0 shrink items-center gap-2 text-xl font-black uppercase tracking-tight text-black sm:shrink-0 sm:text-3xl"
                            >
                                <span
                                    className="flex h-8 w-8 shrink-0 items-center justify-center bg-red-600 text-sm text-white"
                                    style={{
                                        clipPath:
                                            "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                                    }}
                                >
                                    В/Ч
                                </span>
                                <span className="truncate">ВЗУВАЧКА</span>
                            </a>
                        </div>

                        <nav className="hidden h-full items-center gap-8 text-[13px] font-extrabold uppercase tracking-[0.18em] text-gray-900 lg:flex">
                            <div className="group relative flex h-full items-center">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1 transition hover:text-red-600"
                                >
                                    Каталоги
                                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                                </button>

                                <div className="invisible absolute left-1/2 top-20 z-50 w-[980px] -translate-x-1/2 translate-y-2 border border-black/10 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
                                        {categorySections.map((section) => (
                                            <div
                                                key={section.key}
                                                className="rounded-3xl border border-black/10 bg-[#fafafa] p-5"
                                            >
                                                <a href={section.href} className="block">
                                                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-red-600">
                                                        {section.badge}
                                                    </p>
                                                    <h3 className="text-lg font-black uppercase tracking-tight text-black transition hover:text-red-600">
                                                        {section.label}
                                                    </h3>
                                                </a>

                                                <p className="mt-3 text-xs leading-6 text-gray-600">
                                                    {section.description}
                                                </p>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {section.subcategories.map((item) => (
                                                        <a
                                                            key={item.slug}
                                                            href={`#catalog/${section.key}/${item.slug}`}
                                                            className="rounded-full border border-black/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-700 transition hover:border-red-600 hover:text-red-600"
                                                        >
                                                            {item.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 bg-[#111] px-6 py-4 text-white">
                                        <div className="flex flex-wrap items-center gap-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                                            <a href="#page/sale" className="transition hover:text-white">
                                                Складські лоти
                                            </a>
                                            <a href="#page/wholesale" className="transition hover:text-white">
                                                Умови співпраці
                                            </a>
                                            <a href="#page/contact" className="transition hover:text-white">
                                                Написати нам
                                            </a>
                                        </div>

                                        <a
                                            href="#page/wholesale"
                                            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-red-500 transition hover:text-red-400"
                                        >
                                            Перейти до умов співпраці
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <a href="#page/wholesale" className="transition hover:text-red-600">
                                Умови
                            </a>
                            <a href="#page/faq" className="transition hover:text-red-600">
                                FAQ
                            </a>
                            <a href="#page/contact" className="transition hover:text-red-600">
                                Контакти
                            </a>
                        </nav>

                        <div className="flex shrink-0 items-center gap-2 text-black sm:gap-3">
                            {isAdmin && (
                                <div className="group relative hidden lg:flex">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition hover:border-red-600 hover:text-red-600"
                                    >
                                        <Shield className="h-4 w-4" />
                                        Backoffice
                                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                                    </button>

                                    <div className="invisible absolute right-0 top-14 z-50 w-72 translate-y-2 rounded-[24px] border border-black/10 bg-white p-3 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                        <p className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-gray-500">
                                            Адмін-панелі
                                        </p>
                                        <div className="space-y-2">
                                            {adminLinks.map((item) => (
                                                <a
                                                    key={item.href}
                                                    href={item.href}
                                                    className="flex items-center justify-between rounded-2xl border border-black/10 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:border-red-600 hover:text-red-600"
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        <Shield className="h-4 w-4" />
                                                        {item.label}
                                                    </span>
                                                    <ArrowRight className="h-4 w-4" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!user ? (
                                <div className="hidden items-center gap-2 lg:flex">
                                    <a
                                        href="#page/login"
                                        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition hover:border-red-600 hover:text-red-600"
                                        title="Вхід"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        Вхід
                                    </a>
                                    <a
                                        href="#page/register"
                                        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition hover:border-red-600 hover:text-red-600"
                                        title="Реєстрація"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                        Реєстрація
                                    </a>
                                </div>
                            ) : (
                                <div className="hidden items-center gap-2 lg:flex">
                                    <div className="inline-flex items-center rounded-full border border-black/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-gray-600">
                                        {user.email || "Мій акаунт"}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition hover:border-red-600 hover:text-red-600"
                                        title="Вийти"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Вийти
                                    </button>
                                </div>
                            )}

                            <a
                                href="#search"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-red-600 hover:text-red-600 sm:h-11 sm:w-11"
                                title="Пошук товарів"
                            >
                                <Search className="h-5 w-5" />
                            </a>

                            <a
                                href="#wishlist"
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-red-600 hover:text-red-600 sm:h-11 sm:w-11"
                                title="Обране"
                            >
                                <Heart className="h-5 w-5" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-black text-white">
                                        {wishlistCount}
                                    </span>
                                )}
                            </a>

                            <a
                                href="#cart"
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-red-600 hover:text-red-600 sm:h-11 sm:w-11"
                                title="Заявка"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-black px-1.5 py-0.5 text-[10px] font-black text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </a>

                            <a
                                href={infoLinks[0].href}
                                className="hidden items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 xl:inline-flex"
                            >
                                <BriefcaseBusiness className="h-4 w-4" />
                                Дізнатися умови
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
