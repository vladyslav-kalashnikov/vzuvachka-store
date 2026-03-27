import * as React from "react";
import { useShop } from "../store/useShop";
import { PageLayout } from "./PageLayout";
import { toast } from "sonner";
import { formatPrice } from "../data/products";
import { supabase } from "../../lib/supabase"; // ПІДКЛЮЧЕНО БАЗУ ДАНИХ

export function CheckoutPage() {
    const { cart, clearCart } = useShop();
    const [loading, setLoading] = React.useState(false);

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

        const totalPrice = cart.reduce((sum, item) => sum + (item.packPrice * item.quantity), 0);
        const totalPacks = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalUnits = cart.reduce((sum, item) => sum + ((item.unitsPerPack || 8) * item.quantity), 0);

        try {
            // 1. ЗБЕРІГАЄМО ЗАМОВЛЕННЯ В БАЗУ ДАНИХ (SUPABASE)
            const { data: orderData, error: orderError } = await supabase
                .from("orders")
                .insert([{
                    customer_name: form.name,
                    phone: form.phone,
                    city: form.city,
                    branch: form.branch,
                    total: totalPrice,
                    status: 'lead'
                }])
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. ЗБЕРІГАЄМО ТОВАРИ ЦЬОГО ЗАМОВЛЕННЯ
            const orderItems = cart.map(item => ({
                order_id: orderData.id,
                product_slug: item.slug,
                product_name: item.slug.replace(/-/g, ' ').toUpperCase(), // Тимчасова назва з slug
                pack_id: item.packId,
                color: item.color || null,
                quantity: item.quantity,
                price: item.packPrice
            }));

            const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
            if (itemsError) throw itemsError;

            // 3. ВІДПРАВЛЯЄМО В TELEGRAM
            const BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN;
            const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;
            let orderDetails = cart.map(item => `📦 ${item.slug} - ${item.quantity} уп.`).join("%0A");

            const message = `🔥 <b>НОВЕ ЗАМОВЛЕННЯ (ОПТ) #${orderData.order_number || orderData.id}</b>%0A%0A👤 <b>Клієнт:</b> ${form.name}%0A📞 <b>Телефон:</b> ${form.phone}%0A🏙 <b>Місто:</b> ${form.city}%0A📮 <b>Відділення:</b> ${form.branch}%0A%0A🛒 <b>Товари:</b>%0A${orderDetails}%0A%0A💰 <b>Сума:</b> ${formatPrice(totalPrice)}`;

            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}&parse_mode=HTML`);

            // 4. ФІНАЛІЗАЦІЯ
            localStorage.setItem(
                "vzuvachka-last-order",
                JSON.stringify({
                    orderNumber: orderData.order_number || `OPT-${orderData.id}`,
                    customerName: form.name,
                    total: totalPrice,
                    packs: totalPacks,
                    units: totalUnits
                })
            );

            toast.success("Замовлення успішно оформлено! Ми вам зателефонуємо.");
            clearCart();
            window.location.hash = "#order-success";

        } catch (error) {
            console.error("Помилка чекауту:", error);
            toast.error("Помилка при оформленні замовлення. Спробуйте ще раз.");
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = cart.reduce((sum, item) => sum + (item.packPrice * item.quantity), 0);
    const totalPacks = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <PageLayout title="Оформлення замовлення" subtitle="Залиште дані для доставки, і ми зателефонуємо для підтвердження деталей.">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

                {/* Форма */}
                <form onSubmit={handleSubmit} className="tech-clip border border-white/10 bg-[#111] p-6 shadow-2xl sm:p-8">
                    <h2 className="mb-6 text-xl font-black uppercase text-white">Контакти отримувача</h2>
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">Ім'я / ФОП *</label>
                            <input required name="name" value={form.name} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-4 text-white outline-none focus:border-red-600 transition" placeholder="Наприклад: Іванов Іван" />
                        </div>
                        <div>
                            <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">Телефон *</label>
                            <input required name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-4 text-white outline-none focus:border-red-600 transition" placeholder="+380" />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">Місто *</label>
                                <input required name="city" value={form.city} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-4 text-white outline-none focus:border-red-600 transition" placeholder="Київ" />
                            </div>
                            <div>
                                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">Відділення НП *</label>
                                <input required name="branch" value={form.branch} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-4 text-white outline-none focus:border-red-600 transition" placeholder="№1" />
                            </div>
                        </div>
                        <button type="submit" disabled={loading || cart.length === 0} className="mt-6 w-full bg-red-600 px-6 py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition hover:bg-red-500 disabled:opacity-50">
                            {loading ? "Відправка..." : "Підтвердити замовлення"}
                        </button>
                    </div>
                </form>

                {/* Підсумок */}
                <div className="h-fit tech-clip border border-white/10 bg-[#111] p-6 sm:p-8">
                    <h2 className="mb-6 text-xl font-black uppercase text-white">Ваша заявка</h2>
                    <div className="space-y-4 mb-6">
                        {cart.map((item, i) => (
                            <div key={i} className="flex justify-between border-b border-white/10 pb-3 text-sm">
                                <span className="font-bold text-gray-300">{item.slug} <span className="text-gray-500 block mt-1 text-xs">({item.quantity} уп.)</span></span>
                                <span className="font-black text-white">{formatPrice(item.packPrice * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between border-t border-white/20 pt-4">
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Разом ({totalPacks} уп.):</span>
                        <span className="text-2xl font-black text-red-500 copper-text">{formatPrice(totalPrice)}</span>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}