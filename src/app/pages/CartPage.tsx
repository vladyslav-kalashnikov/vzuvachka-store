import * as React from "react";
import { Minus, Plus, Trash2, PackageOpen, ArrowRight } from "lucide-react";
import { formatPrice, getProductBySlug } from "../data/products";
import { useShop } from "../store/useShop";
import { PageLayout } from "./PageLayout";

export function CartPage() {
    const { cart, removeFromCart, updateCartItemQuantity } = useShop();

    const cartItems = cart.map((item) => {
        const product = getProductBySlug(item.slug);
        if (!product) return null;
        return {
            ...item,
            product,
            total: item.packPrice * item.quantity,
            totalUnits: item.unitsPerPack * item.quantity,
            listTotal: product.price * item.unitsPerPack * item.quantity,
        };
    }).filter((item): item is NonNullable<typeof item> => Boolean(item));

    const totalPrice = cartItems.reduce((sum, item) => sum + (item?.total ?? 0), 0);
    const totalPacks = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalUnits = cartItems.reduce((sum, item) => sum + item.totalUnits, 0);

    return (
        <PageLayout title="ПОТОЧНА ЗАЯВКА" subtitle="Перевірте матрицю товарів перед формуванням накладної.">
            {cartItems.length === 0 ? (
                <section className="tech-clip premium-panel border border-white/10 bg-[#111] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-600/10 text-red-500 red-shadow">
                        <PackageOpen className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-black uppercase text-white mb-3">ЗАЯВКА ПОРОЖНЯ</h2>
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8 max-w-md">
                        Додайте ящики з каталогу, щоб сформувати попередній рахунок.
                    </p>
                    <a href="#categories" className="tech-clip group flex items-center justify-center gap-3 bg-red-600 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                        ВІДКРИТИ КАТАЛОГ
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </section>
            ) : (
                <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <article key={`${item.slug}-${item.packId}-${item.color}`} className="tech-clip grid gap-5 border border-white/10 bg-[#111] p-5 md:grid-cols-[140px_1fr] transition-colors hover:border-white/30">
                                <div className="relative border border-white/5 bg-black h-[140px]">
                                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover opacity-80" />
                                </div>
                                <div className="flex flex-col justify-between gap-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <a href={`#product/${item.product.slug}`}>
                                                <h3 className="text-lg font-black uppercase text-white hover:text-red-500 transition-colors">
                                                    {item.product.name}
                                                </h3>
                                            </a>
                                            <div className="mt-2 flex flex-wrap gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                                                <span className="border border-white/10 px-2 py-1">{item.packLabel}</span>
                                                <span className="border border-white/10 px-2 py-1">{item.packSizeLabel}</span>
                                            </div>
                                            <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                                В ящику: <span className="text-white">{item.unitsPerPack} пар</span>
                                            </p>
                                        </div>
                                        <button type="button" onClick={() => removeFromCart(item.slug, item.packId, item.color)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-400 transition hover:bg-red-600 hover:text-white">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-4">
                                        <div className="flex items-center border border-white/20 bg-black">
                                            <button type="button" onClick={() => updateCartItemQuantity(item.slug, item.packId, item.quantity - 1, item.color)} className="px-4 py-2 text-white hover:text-red-500 transition-colors"><Minus className="h-4 w-4" /></button>
                                            <span className="min-w-[40px] text-center font-black text-white">{item.quantity}</span>
                                            <button type="button" onClick={() => updateCartItemQuantity(item.slug, item.packId, item.quantity + 1, item.color)} className="px-4 py-2 text-white hover:text-red-500 transition-colors"><Plus className="h-4 w-4" /></button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Разом за SKU</p>
                                            <p className="font-mono text-xl font-black text-[#e39c5e] copper-shadow">{formatPrice(item.total)}</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <aside className="tech-clip premium-panel h-fit border border-red-500/30 bg-gradient-to-br from-red-950/20 to-[#111] p-6 sm:p-8 shadow-[0_0_30px_rgba(220,38,38,0.1)] lg:sticky lg:top-28">
                        <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                            B2B ІНВОЙС
                        </p>
                        <div className="space-y-4 border-b border-white/10 pb-6 text-xs font-bold uppercase tracking-widest text-gray-300">
                            <div className="flex items-center justify-between">
                                <span>SKU у заявці</span>
                                <span className="font-black text-white">{cartItems.length} позицій</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Загальний об'єм</span>
                                <span className="font-black text-white">{totalPacks} ящ.</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Кількість пар</span>
                                <span className="font-black text-white">{totalUnits} пар</span>
                            </div>
                        </div>

                        <div className="mb-8 mt-6 flex flex-col gap-2 text-white">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Попередня сума до сплати</span>
                            <span className="font-mono text-4xl font-black copper-text text-[#e39c5e] copper-shadow-lg">{formatPrice(totalPrice)}</span>
                        </div>

                        <a href="#checkout" className="tech-clip flex w-full items-center justify-center bg-red-600 px-6 py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                            Оформити заявку
                        </a>
                        <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-widest text-gray-500">
                            Без онлайн оплати. Тільки фіксація наявності.
                        </p>
                    </aside>
                </section>
            )}
        </PageLayout>
    );
}