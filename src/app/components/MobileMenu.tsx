"use client";

import * as React from "react";
import { Menu, Search, Heart, ShoppingBag, ChevronRight } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { useShop } from "../store/useShop";

export function MobileMenu() {
    const { cartCount, wishlistCount } = useShop();

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
                            href="#search"
                            className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:text-red-600"
                        >
              <span className="inline-flex items-center gap-3">
                <Search className="h-5 w-5" />
                Пошук
              </span>
                            <ChevronRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="border-b border-black/10 px-5 py-4">
                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href="#wishlist"
                                className="flex items-center justify-between border border-black/10 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:border-red-600 hover:text-red-600"
                            >
                <span className="inline-flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </span>
                                <span>({wishlistCount})</span>
                            </a>

                            <a
                                href="#cart"
                                className="flex items-center justify-between border border-black/10 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:border-red-600 hover:text-red-600"
                            >
                <span className="inline-flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Кошик
                </span>
                                <span>({cartCount})</span>
                            </a>
                        </div>
                    </div>

                    <div className="px-5 py-2">
                        <Accordion type="multiple" className="w-full">
                            <AccordionItem value="sale">
                                <a
                                    href="#page/sale"
                                    className="flex items-center justify-between py-4 text-sm font-black uppercase tracking-[0.18em] text-red-600"
                                >
                                    Розпродаж
                                    <ChevronRight className="h-4 w-4" />
                                </a>
                            </AccordionItem>

                            <AccordionItem value="women">
                                <AccordionTrigger className="py-4 text-sm font-black uppercase tracking-[0.18em] text-black hover:no-underline">
                                    Жінкам
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pb-2 pl-1">
                                        <a href="#page/women" className="block text-sm font-semibold text-black hover:text-red-600">
                                            Уся категорія
                                        </a>
                                        <a href="#catalog/women/miski-kaloshi" className="block text-sm text-gray-700 hover:text-red-600">
                                            Міські калоші
                                        </a>
                                        <a href="#catalog/women/sabo-ta-kroksy" className="block text-sm text-gray-700 hover:text-red-600">
                                            Сабо та крокси
                                        </a>
                                        <a href="#catalog/women/domashni-tapochky" className="block text-sm text-gray-700 hover:text-red-600">
                                            Домашні тапочки
                                        </a>
                                        <a href="#catalog/women/plazhni-shlopantsi" className="block text-sm text-gray-700 hover:text-red-600">
                                            Пляжні шльопанці
                                        </a>
                                        <a href="#catalog/women/utepleni-modeli" className="block text-sm text-gray-700 hover:text-red-600">
                                            Утеплені моделі
                                        </a>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="men">
                                <AccordionTrigger className="py-4 text-sm font-black uppercase tracking-[0.18em] text-black hover:no-underline">
                                    Чоловікам
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pb-2 pl-1">
                                        <a href="#page/men" className="block text-sm font-semibold text-black hover:text-red-600">
                                            Уся категорія
                                        </a>
                                        <a href="#catalog/men/miski-kaloshi" className="block text-sm text-gray-700 hover:text-red-600">
                                            Міські калоші
                                        </a>
                                        <a href="#catalog/men/klasychni-gumovi-choboty" className="block text-sm text-gray-700 hover:text-red-600">
                                            Класичні гумові чоботи
                                        </a>
                                        <a href="#catalog/men/rybalski-choboty" className="block text-sm text-gray-700 hover:text-red-600">
                                            Рибальські чоботи
                                        </a>
                                        <a href="#catalog/men/domashni-tapochky" className="block text-sm text-gray-700 hover:text-red-600">
                                            Домашні тапочки
                                        </a>
                                        <a href="#catalog/men/plazhni-shlopantsi" className="block text-sm text-gray-700 hover:text-red-600">
                                            Пляжні шльопанці
                                        </a>
                                        <a href="#catalog/men/utepleni-modeli" className="block text-sm text-gray-700 hover:text-red-600">
                                            Утеплені моделі
                                        </a>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="kids">
                                <AccordionTrigger className="py-4 text-sm font-black uppercase tracking-[0.18em] text-black hover:no-underline">
                                    Дітям
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pb-2 pl-1">
                                        <a href="#page/kids" className="block text-sm font-semibold text-black hover:text-red-600">
                                            Уся категорія
                                        </a>
                                        <a href="#catalog/kids/dytiachi-cherevyky" className="block text-sm text-gray-700 hover:text-red-600">
                                            Дитячі черевики
                                        </a>
                                        <a href="#catalog/kids/domashni-tapochky" className="block text-sm text-gray-700 hover:text-red-600">
                                            Домашні тапочки
                                        </a>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="work">
                                <AccordionTrigger className="py-4 text-sm font-black uppercase tracking-[0.18em] text-black hover:no-underline">
                                    ВЗУВАЧКА PRO™
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pb-2 pl-1">
                                        <a href="#page/work" className="block text-sm font-semibold text-black hover:text-red-600">
                                            Уся категорія
                                        </a>
                                        <a href="#catalog/work/robochi-modeli" className="block text-sm text-gray-700 hover:text-red-600">
                                            Робочі моделі
                                        </a>
                                        <a href="#catalog/work/klasychni-gumovi-choboty" className="block text-sm text-gray-700 hover:text-red-600">
                                            Класичні гумові чоботи
                                        </a>
                                        <a href="#catalog/work/rybalski-choboty" className="block text-sm text-gray-700 hover:text-red-600">
                                            Рибальські чоботи
                                        </a>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="other">
                                <AccordionTrigger className="py-4 text-sm font-black uppercase tracking-[0.18em] text-black hover:no-underline">
                                    Додатково
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pb-2 pl-1">
                                        <a href="#page/accessories" className="block text-sm text-gray-700 hover:text-red-600">
                                            Устілки & Аксесуари
                                        </a>
                                        <a href="#page/size-guide" className="block text-sm text-gray-700 hover:text-red-600">
                                            Розмірна сітка
                                        </a>
                                        <a href="#page/shipping" className="block text-sm text-gray-700 hover:text-red-600">
                                            Доставка та оплата
                                        </a>
                                        <a href="#page/returns" className="block text-sm text-gray-700 hover:text-red-600">
                                            Обмін і повернення
                                        </a>
                                        <a href="#page/faq" className="block text-sm text-gray-700 hover:text-red-600">
                                            Часті питання
                                        </a>
                                        <a href="#page/contact" className="block text-sm text-gray-700 hover:text-red-600">
                                            Контакти
                                        </a>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div className="mt-auto border-t border-black/10 px-5 py-5">
                        <a
                            href="mailto:hello@vzuvachka.ua"
                            className="block text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-red-600"
                        >
                            hello@vzuvachka.ua
                        </a>
                        <a
                            href="tel:+380939753837"
                            className="mt-3 block text-sm font-bold text-black hover:text-red-600"
                        >
                            +38 (093) 975-38-37
                        </a>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}