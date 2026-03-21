import * as React from "react";
import { useState } from "react";
import { PageLayout } from "./PageLayout";
import { formatPrice, getProductBySlug } from "../data/products";
import { useShop } from "../store/useShop";
import { toast } from "sonner";

export function CheckoutPage() {
    const { cart, clearCart } = useShop();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        city: "",
        branch: "",
        email: "",
        comment: "",
    });

    const cartItems = cart
        .map((item) => {
            const product = getProductBySlug(item.slug);
            if (!product) return null;
            return { ...item, product, total: product.price * item.quantity };
        })
        .filter(Boolean);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item?.total ?? 0), 0);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.phone || !form.city || !form.branch) {
            toast.error("Заповни обов’язкові поля");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Кошик порожній");
            return;
        }

        clearCart();
        toast.success("Замовлення оформлено");
        window.location.hash = "#order-success";
    };

    return (
        <PageLayout title="Оформлення замовлення" subtitle="Введи дані для доставки та підтвердження.">
            <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ім’я та прізвище *"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Телефон *"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="Місто *"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                        <input
                            name="branch"
                            value={form.branch}
                            onChange={handleChange}
                            placeholder="Відділення Нової пошти *"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                    </div>

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                    />

                    <textarea
                        name="comment"
                        value={form.comment}
                        onChange={handleChange}
                        placeholder="Коментар до замовлення"
                        rows={5}
                        className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                    />

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                    >
                        Підтвердити замовлення
                    </button>
                </form>

                <aside className="h-fit rounded-2xl border border-white/10 bg-black/20 p-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Ваше замовлення
                    </p>

                    <div className="space-y-3">
                        {cartItems.map((item) => {
                            if (!item) return null;
                            return (
                                <div
                                    key={`${item.slug}-${item.size}`}
                                    className="border-b border-white/10 pb-3 text-sm text-gray-300"
                                >
                                    <p className="font-bold text-white">{item.product.name}</p>
                                    <p>Розмір: {item.size}</p>
                                    <p>Кількість: {item.quantity}</p>
                                    <p>{formatPrice(item.total)}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex items-center justify-between text-white">
                        <span>Разом</span>
                        <span className="text-xl font-black">{formatPrice(totalPrice)}</span>
                    </div>
                </aside>
            </section>
        </PageLayout>
    );
}