import * as React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageLayout } from "./PageLayout";
import { formatPrice, getProductBySlug } from "../data/products";
import { useShop } from "../store/useShop";

export function CartPage() {
    const { cart, removeFromCart, updateCartItemQuantity } = useShop();

    const cartItems = cart
        .map((item) => {
            const product = getProductBySlug(item.slug);
            if (!product) return null;

            return {
                ...item,
                product,
                total: product.price * item.quantity,
            };
        })
        .filter(Boolean);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item?.total ?? 0), 0);

    return (
        <PageLayout title="Кошик" subtitle="Перевір товари перед оформленням замовлення.">
            {cartItems.length === 0 ? (
                <section className="space-y-5">
                    <p>У кошику поки немає товарів.</p>
                    <a
                        href="#page/men"
                        className="inline-flex border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white hover:border-red-500 hover:text-red-500"
                    >
                        Перейти в каталог
                    </a>
                </section>
            ) : (
                <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-4">
                        {cartItems.map((item) => {
                            if (!item) return null;

                            return (
                                <article
                                    key={`${item.slug}-${item.size}`}
                                    className="grid gap-5 rounded-2xl border border-white/10 bg-black/20 p-5 md:grid-cols-[140px_1fr]"
                                >
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="h-[140px] w-full object-cover"
                                    />

                                    <div className="flex flex-col justify-between gap-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <a href={`#product/${item.product.slug}`}>
                                                    <h3 className="text-xl font-black uppercase text-white hover:text-red-500">
                                                        {item.product.name}
                                                    </h3>
                                                </a>
                                                <p className="mt-2 text-sm text-gray-400">{item.product.type}</p>
                                                <p className="mt-1 text-sm text-gray-400">Розмір: {item.size}</p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.slug, item.size)}
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
                                                        updateCartItemQuantity(item.slug, item.size, item.quantity - 1)
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
                                                        updateCartItemQuantity(item.slug, item.size, item.quantity + 1)
                                                    }
                                                    className="px-4 py-3 text-white hover:text-red-500"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm text-gray-400">
                                                    {formatPrice(item.product.price)} x {item.quantity}
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
                            Підсумок
                        </p>
                        <div className="mb-6 flex items-center justify-between text-white">
                            <span>Загальна сума</span>
                            <span className="text-2xl font-black">{formatPrice(totalPrice)}</span>
                        </div>

                        <a
                            href="#checkout"
                            className="inline-flex w-full items-center justify-center bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                        >
                            Оформити замовлення
                        </a>
                    </aside>
                </section>
            )}
        </PageLayout>
    );
}