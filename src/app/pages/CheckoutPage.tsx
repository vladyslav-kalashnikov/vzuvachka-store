import * as React from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { createOrder } from "../../lib/api/orders";
import { formatPrice, getProductBySlug } from "../data/products";
import { useShop } from "../store/useShop";
import { PageLayout } from "./PageLayout";

export function CheckoutPage() {
    const { cart, clearCart } = useShop();

    const [form, setForm] = useState({
        company: "",
        contactPerson: "",
        phone: "",
        email: "",
        city: "",
        branch: "",
        channel: "",
        website: "",
        comment: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const cartItems = useMemo(
        () =>
            cart
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
                .filter((item): item is NonNullable<typeof item> => Boolean(item)),
        [cart]
    );

    const totalPrice = cartItems.reduce((sum, item) => sum + (item?.total ?? 0), 0);
    const totalPacks = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalUnits = cartItems.reduce((sum, item) => sum + item.totalUnits, 0);
    const totalSavings = cartItems.reduce(
        (sum, item) => sum + Math.max(0, item.listTotal - item.total),
        0
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.company.trim() || !form.phone.trim() || !form.city.trim() || !form.branch.trim()) {
            toast.error("Заповніть компанію, телефон, місто та адресу доставки");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Заявка порожня");
            return;
        }

        const extraContext = [
            form.contactPerson.trim() ? `Контактна особа: ${form.contactPerson.trim()}` : "",
            form.channel.trim() ? `Канал продажу: ${form.channel.trim()}` : "",
            form.website.trim() ? `Сайт / сторінка: ${form.website.trim()}` : "",
            `SKU у запиті: ${cartItems.length}`,
            `Упаковок: ${totalPacks}`,
            `Одиниць / пар: ${totalUnits}`,
            `Орієнтовна база: ${formatPrice(totalPrice)}`,
            totalSavings > 0 ? `Потенційна економія: ${formatPrice(totalSavings)}` : "",
            form.comment.trim() ? `Коментар: ${form.comment.trim()}` : "",
        ]
            .filter(Boolean)
            .join("\n");

        try {
            setIsSubmitting(true);

            const order = await createOrder({
                customer: {
                    customerName: form.contactPerson.trim()
                        ? `${form.company.trim()} (${form.contactPerson.trim()})`
                        : form.company.trim(),
                    phone: form.phone.trim(),
                    email: form.email.trim() || undefined,
                    city: form.city.trim(),
                    branch: form.branch.trim(),
                    comment: extraContext || undefined,
                },
                items: cartItems.map((item) => ({
                    productId: item.product.id,
                    productSlug: item.product.slug,
                    productName: item.product.name,
                    price: item.packPrice,
                    selectedSize: `${item.packLabel} • ${item.packSizeLabel} • ${item.unitsPerPack} ${item.unitLabel}/уп. • ${item.tierLabel}`,
                    selectedColor: item.color,
                    quantity: item.quantity,
                })),
            });

            localStorage.setItem(
                "vzuvachka-last-order",
                JSON.stringify({
                    orderNumber: order.order_number,
                    customerName: form.company.trim(),
                    total: totalPrice,
                    packs: totalPacks,
                    units: totalUnits,
                })
            );

            clearCart();
            toast.success(`B2B-запит відправлено: ${order.order_number}`);
            window.location.hash = "#order-success";
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося відправити заявку");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageLayout
            title="Відправка B2B-запиту"
            subtitle="Залиште контакти компанії, і менеджер підтвердить матрицю, ціну та умови поставки."
        >
            <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Назва компанії / ФОП *"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                        <input
                            name="contactPerson"
                            value={form.contactPerson}
                            onChange={handleChange}
                            placeholder="Контактна особа"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Телефон *"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
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
                            placeholder="Склад / відділення / адреса *"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            name="channel"
                            value={form.channel}
                            onChange={handleChange}
                            placeholder="Формат продажу: офлайн / online / маркетплейс"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                        <input
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            placeholder="Сайт або сторінка магазину"
                            className="border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                        />
                    </div>

                    <textarea
                        name="comment"
                        value={form.comment}
                        onChange={handleChange}
                        placeholder="Коментар: бажаний обсяг, сезон, ціновий сегмент, вимоги до брендування"
                        rows={5}
                        className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        {isSubmitting ? "Відправка..." : "Надіслати B2B-запит"}
                    </button>
                </form>

                <aside className="h-fit rounded-2xl border border-white/10 bg-black/20 p-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Ваша матриця
                    </p>

                    <div className="space-y-3">
                        {cartItems.length === 0 ? (
                            <p className="text-sm text-gray-400">Заявка порожня</p>
                        ) : (
                            cartItems.map((item) => {
                                return (
                                    <div
                                        key={`${item.slug}-${item.packId}-${item.color ?? "no-color"}`}
                                        className="border-b border-white/10 pb-3 text-sm text-gray-300"
                                    >
                                        <p className="font-bold text-white">{item.product.name}</p>
                                        <p>Пакування: {item.packLabel}</p>
                                        <p>Матриця: {item.packSizeLabel}</p>
                                        <p>Колір: {item.color || "—"}</p>
                                        <p>Упаковок: {item.quantity}</p>
                                        <p>
                                            Разом: {item.totalUnits} {item.unitLabel} • {formatPrice(item.total)}
                                        </p>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-2 text-white sm:flex-row sm:items-center sm:justify-between">
                        <span>Орієнтовна база</span>
                        <span className="text-xl font-black">{formatPrice(totalPrice)}</span>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-gray-300 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                Упаковок
                            </p>
                            <p className="mt-2 text-lg font-bold text-white">{totalPacks}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                Одиниць / пар
                            </p>
                            <p className="mt-2 text-lg font-bold text-white">{totalUnits}</p>
                        </div>
                    </div>

                    {totalSavings > 0 && (
                        <p className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                            Потенційна економія від обсягу: {formatPrice(totalSavings)}
                        </p>
                    )}

                    <p className="mt-4 text-sm leading-6 text-gray-400">
                        Після відправки запиту менеджер уточнить оптові ціни, залишки, строки та
                        можливі догрузки.
                    </p>
                </aside>
            </section>
        </PageLayout>
    );
}
