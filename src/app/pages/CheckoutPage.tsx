import * as React from "react";
import { useShop } from "../store/useShop";
import { PageLayout } from "./PageLayout";
import { toast } from "sonner";
import { formatPrice } from "../data/products";

export function CheckoutPage() {
    const { cart, clearCart } = useShop();
    const [loading, setLoading] = React.useState(false);

    // Тільки 4 найважливіші поля
    const [form, setForm] = React.useState({
        name: "",
        phone: "",
        city: "",
        branch: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Тут згодом підключите відправку в Telegram або CRM
        setTimeout(() => {
            setLoading(false);
            toast.success("Замовлення успішно оформлено! Ми вам зателефонуємо.");
            clearCart();
            window.location.hash = "#page/order-success";
        }, 1000);
    };

    const totalPrice = cart.reduce((sum, item) => sum + (item.packPrice * item.quantity), 0);
    const totalPacks = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <PageLayout title="Оформлення замовлення" subtitle="Залиште дані для доставки, і ми зателефонуємо для підтвердження.">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

                {/* Форма */}
                <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="mb-6 text-xl font-black uppercase text-gray-900">Ваші контакти</h2>
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-gray-500">Ім'я / Назва магазину *</label>
                            <input required name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-gray-900 outline-none focus:border-red-600 focus:bg-white transition" placeholder="Наприклад: ФОП Іванов" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-gray-500">Телефон *</label>
                            <input required name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-gray-900 outline-none focus:border-red-600 focus:bg-white transition" placeholder="+380" />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase text-gray-500">Місто *</label>
                                <input required name="city" value={form.city} onChange={handleChange} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-gray-900 outline-none focus:border-red-600 focus:bg-white transition" placeholder="Київ" />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase text-gray-500">Відділення Нової Пошти *</label>
                                <input required name="branch" value={form.branch} onChange={handleChange} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-gray-900 outline-none focus:border-red-600 focus:bg-white transition" placeholder="№1" />
                            </div>
                        </div>
                        <button type="submit" disabled={loading || cart.length === 0} className="mt-4 w-full rounded-xl bg-red-600 px-6 py-5 text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-red-700 disabled:opacity-50">
                            {loading ? "Відправка..." : "Підтвердити замовлення"}
                        </button>
                    </div>
                </form>

                {/* Підсумок */}
                <div className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
                    <h2 className="mb-6 text-xl font-black uppercase text-gray-900">Ваша заявка</h2>
                    <div className="space-y-4 mb-6">
                        {cart.map((item, i) => (
                            <div key={i} className="flex justify-between border-b border-gray-200 pb-3 text-sm">
                                <span className="font-medium text-gray-700">Товар #{item.slug} <span className="text-gray-400 block mt-1">({item.quantity} ящ.)</span></span>
                                <span className="font-bold text-gray-900">{formatPrice(item.packPrice * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-4">
                        <span className="text-sm font-bold uppercase text-gray-500">Разом ({totalPacks} ящ.):</span>
                        <span className="text-2xl font-black text-red-600">{formatPrice(totalPrice)}</span>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}