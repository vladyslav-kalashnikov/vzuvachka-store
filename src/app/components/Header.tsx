import {
    Search,
    ShoppingBag,
    MapPin,
    ChevronDown,
    Heart,
} from "lucide-react";
import * as React from "react";
import { useShop } from "../store/useShop";
import { MobileMenu } from "./MobileMenu";

export function Header() {
    const { cartCount, wishlistCount } = useShop();

    return (
        <>
            <div className="bg-[#222222] px-4 py-2 text-center text-white">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
          <span className="mr-2 text-red-500">PROMO</span>
          Безкоштовна доставка замовлень від 2500 ₴
        </span>
            </div>

            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-[1600px] px-6">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <MobileMenu />

                            <a
                                href="#home"
                                className="flex shrink-0 items-center gap-2 text-2xl font-black uppercase tracking-tighter text-black sm:text-3xl"
                            >
                                <div
                                    className="flex h-8 w-8 items-center justify-center bg-red-600 text-sm text-white"
                                    style={{
                                        clipPath:
                                            "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                                    }}
                                >
                                    В/Ч
                                </div>
                                ВЗУВАЧКА
                            </a>
                        </div>

                        <nav className="hidden h-full items-center gap-8 text-[14px] font-extrabold uppercase tracking-wide text-gray-900 lg:flex">
                            <a
                                href="#page/sale"
                                className="text-red-600 transition hover:text-red-800"
                            >
                                Розпродаж
                            </a>

                            <div className="group flex h-full cursor-pointer items-center">
                <span className="flex items-center gap-1 transition hover:text-gray-500">
                  Жінкам
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </span>

                                <div className="invisible absolute left-0 top-20 z-50 w-full translate-y-2 border-t border-gray-100 bg-white opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="mx-auto flex max-w-[1600px] gap-16 px-6 py-10">
                                        <div className="grid flex-1 grid-cols-3 gap-8">
                                            <div>
                                                <p className="mb-4 text-[10px] tracking-widest text-gray-400">
                                                    ТИП ВЗУТТЯ
                                                </p>
                                                <ul className="space-y-3 text-sm font-medium tracking-normal text-gray-800 normal-case">
                                                    <li>
                                                        <a
                                                            href="#catalog/women/miski-kaloshi"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Міські калоші
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/women/sabo-ta-kroksy"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Сабо та крокси
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/women/domashni-tapochky"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Домашні тапочки
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/women/plazhni-shlopantsi"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Пляжні шльопанці
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/women/utepleni-modeli"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Утеплені моделі
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="mb-4 text-[10px] tracking-widest text-gray-400">
                                                    КОЛЕКЦІЇ
                                                </p>
                                                <ul className="space-y-3 text-sm font-medium tracking-normal text-gray-800 normal-case">
                                                    <li>
                                                        <a
                                                            href="#page/women"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Літо 2026
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/women/utepleni-modeli"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Утеплені моделі (Зима)
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#page/women"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Еко-лінійка (Recycled)
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#page/women"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Для саду та дачі
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="mb-4 text-[10px] tracking-widest text-gray-400">
                                                    ПОПУЛЯРНЕ
                                                </p>
                                                <div className="border border-gray-100 bg-gray-50 p-4">
                                                    <p className="mb-2 text-xs font-bold">
                                                        Бестселер сезону
                                                    </p>
                                                    <p className="mb-3 text-xs font-normal text-gray-500">
                                                        Калоші Urban Armor у кольорі "Графіт"
                                                    </p>
                                                    <a
                                                        href="#product/urban-armor"
                                                        className="border-b border-red-600 pb-0.5 text-[10px] font-extrabold uppercase tracking-widest text-red-600"
                                                    >
                                                        Дивитись
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative w-[300px] shrink-0 overflow-hidden bg-gray-100">
                                            <img
                                                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop"
                                                alt="Жіноча колекція"
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                                <p className="mb-1 text-xl font-black">ОНОВЛЕННЯ</p>
                                                <p className="text-xs font-medium opacity-80">
                                                    Весняні кольори вже тут.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="group flex h-full cursor-pointer items-center">
                <span className="flex items-center gap-1 transition hover:text-gray-500">
                  Чоловікам
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </span>

                                <div className="invisible absolute left-0 top-20 z-50 w-full translate-y-2 border-t border-gray-100 bg-white opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="mx-auto flex max-w-[1600px] gap-16 px-6 py-10">
                                        <div className="grid flex-1 grid-cols-3 gap-8">
                                            <div>
                                                <p className="mb-4 text-[10px] tracking-widest text-gray-400">
                                                    ТИП ВЗУТТЯ
                                                </p>
                                                <ul className="space-y-3 text-sm font-medium tracking-normal text-gray-800 normal-case">
                                                    <li>
                                                        <a
                                                            href="#catalog/men/rybalski-choboty"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Рибальські чоботи
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/men/taktychni-kaloshi"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Тактичні калоші
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/men/domashni-tapochky"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Домашні тапочки
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/men/vietnamky"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            В'єтнамки
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/men/utepleni-modeli"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Утеплені моделі
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="mb-4 text-[10px] tracking-widest text-gray-400">
                                                    ПРИЗНАЧЕННЯ
                                                </p>
                                                <ul className="space-y-3 text-sm font-medium tracking-normal text-gray-800 normal-case">
                                                    <li>
                                                        <a
                                                            href="#catalog/men/rybalski-choboty"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Риболовля та Полювання
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/men/taktychni-kaloshi"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Для міста та двору
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#catalog/men/vietnamky"
                                                            className="transition hover:text-red-600"
                                                        >
                                                            Басейн / Тренування
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="mb-4 text-[10px] tracking-widest text-gray-400">
                                                    ПОПУЛЯРНЕ
                                                </p>
                                                <div className="border border-gray-100 bg-gray-50 p-4">
                                                    <p className="mb-2 text-xs font-bold">PRO-ANGLER</p>
                                                    <p className="mb-3 text-xs font-normal text-gray-500">
                                                        Нові заброди для екстриму.
                                                    </p>
                                                    <a
                                                        href="#product/pro-angler-500"
                                                        className="border-b border-red-600 pb-0.5 text-[10px] font-extrabold uppercase tracking-widest text-red-600"
                                                    >
                                                        Дивитись
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative w-[300px] shrink-0 overflow-hidden bg-gray-100">
                                            <img
                                                src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop"
                                                alt="Чоловіча колекція"
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                                <p className="mb-1 text-xl font-black">PRO-ANGLER</p>
                                                <p className="text-xs font-medium opacity-80">
                                                    Нові заброди для екстриму.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a href="#page/kids" className="transition hover:text-gray-500">
                                Дітям
                            </a>

                            <a
                                href="#page/accessories"
                                className="transition hover:text-gray-500"
                            >
                                Устілки & Аксесуари
                            </a>

                            <a href="#page/work" className="flex items-center gap-1">
                                ВЗУВАЧКА
                                <span className="relative -top-1 rounded-sm bg-[#222222] px-1.5 py-0.5 text-[9px] text-white">
                  PRO™
                </span>
                            </a>
                        </nav>

                        <div className="flex shrink-0 items-center gap-4 text-black sm:gap-6">
                            <button className="hidden transition hover:text-red-600 sm:inline-flex">
                                <MapPin className="h-6 w-6 stroke-[1.5]" />
                            </button>

                            <a href="#search" className="transition hover:text-red-600">
                                <Search className="h-6 w-6 stroke-[1.5]" />
                            </a>

                            <a href="#wishlist" className="relative transition hover:text-red-600">
                                <Heart className="h-6 w-6 stroke-[1.5]" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                                )}
                            </a>

                            <a
                                href="#cart"
                                className="relative flex items-center gap-2 transition hover:text-red-600"
                            >
                                <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
                                <span className="hidden font-mono text-[13px] font-bold sm:inline">
                  ({cartCount})
                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}