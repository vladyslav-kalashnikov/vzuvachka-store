import * as React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice, getProductBySlug } from "../data/products";
import { useShop } from "../store/useShop";
import { PageLayout } from "./PageLayout";

export function CartPage() {
    const { cart, removeFromCart, updateCartItemQuantity } = useShop();

    const cartItems = cart
        .map((item) => {
            const product = getProductBySlug(item.slug);
            if (!product) return null;

            return {
                ...item,
                product,
                total: item.packPrice * item.quantity,
                totalUnits: item.unitsPerPack * item.quantity,
                listTotal: product.price * item.unitsPerPack * item.quantity,
            };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

    const totalPrice = cartItems.reduce((sum, item) => sum + (item?.total ?? 0), 0);
    const totalPacks = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalUnits = cartItems.reduce((sum, item) => sum + item.totalUnits, 0);
    const totalSavings = cartItems.reduce(
        (sum, item) => sum + Math.max(0, item.listTotal - item.total),
        0
    );

    return (
        <PageLayout
            title="Заявка"
            subtitle="Перевірте вибрані товари, кількість упаковок і надішліть запит."
        >
            {cartItems.length === 0 ? (
                <section className="space-y-5">
                    <p>У заявці поки немає товарів. Додайте їх із каталогу або зі сторінки товару.</p>
                    <a
                        href="#page/wholesale"
                        className="inline-flex w-full justify-center border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white hover:border-red-500 hover:text-red-500 sm:w-auto"
                    >
                        Перейти до умов
                    </a>
                </section>
            ) : (
                <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-4">
                        {cartItems.map((item) => {
                            return (
                                <article
                                    key={`${item.slug}-${item.packId}-${item.color ?? "no-color"}`}
                                    className="grid gap-5 rounded-2xl border border-white/10 bg-black/20 p-5 md:grid-cols-[140px_1fr]"
                                >
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="h-[140px] w-full object-cover"
                                    />

                                    <div className="flex flex-col justify-between gap-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <a href={`#product/${item.product.slug}`}>
                                                    <h3 className="text-xl font-black uppercase text-white hover:text-red-500">
                                                        {item.product.name}
                                                    </h3>
                                                </a>

                                                <p className="mt-2 text-sm text-gray-400">{item.product.type}</p>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    Пакування: {item.packLabel}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    Матриця: {item.packSizeLabel}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    1 уп. = {item.unitsPerPack} {item.unitLabel}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-400">Колір: {item.color || "—"}</p>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    Рівень ціни: {item.tierLabel}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFromCart(item.slug, item.packId, item.color)
                                                }
                                                className="text-gray-400 transition hover:text-red-500"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center border border-white/10">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateCartItemQuantity(
                                                            item.slug,
                                                            item.packId,
                                                            item.quantity - 1,
                                                            item.color
                                                        )
                                                    }
                                                    className="px-4 py-3 text-white hover:text-red-500"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>

                                                <span className="min-w-[56px] text-center font-bold text-white">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateCartItemQuantity(
                                                            item.slug,
                                                            item.packId,
                                                            item.quantity + 1,
                                                            item.color
                                                        )
                                                    }
                                                    className="px-4 py-3 text-white hover:text-red-500"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="text-left sm:text-right">
                                                <p className="text-sm text-gray-400">
                                                    {formatPrice(item.packPrice)} / уп. x {item.quantity}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {item.totalUnits} {item.unitLabel} • MOQ {item.minPacks} уп.
                                                </p>
                                                <p className="text-lg font-bold text-white">
                                                    {formatPrice(item.total)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <aside className="h-fit rounded-2xl border border-white/10 bg-black/20 p-6">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                            Підсумок заявки
                        </p>

                        <div className="space-y-3 border-b border-white/10 pb-4 text-sm text-gray-300">
                            <div className="flex items-center justify-between">
                                <span>Товарів у заявці</span>
                                <span className="font-bold text-white">{cartItems.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Упаковок</span>
                                <span className="font-bold text-white">{totalPacks}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Одиниць / пар</span>
                                <span className="font-bold text-white">{totalUnits}</span>
                            </div>
                        </div>

                        <div className="mb-4 mt-4 flex flex-col gap-2 text-white sm:flex-row sm:items-center sm:justify-between">
                            <span>Орієнтовна сума</span>
                            <span className="text-2xl font-black">{formatPrice(totalPrice)}</span>
                        </div>

                        <p className="mb-6 text-sm leading-6 text-gray-400">
                            Менеджер підтвердить наявність, ціну, розміри і підкаже по відправці.
                        </p>

                        {totalSavings > 0 && (
                            <p className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                                Потенційна економія від обсягу: {formatPrice(totalSavings)}
                            </p>
                        )}

                        <a
                            href="#checkout"
                            className="inline-flex w-full items-center justify-center bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                        >
                            Надіслати запит
                        </a>
                    </aside>
                </section>
            )}
        </PageLayout>
    );
}
