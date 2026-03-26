import * as React from "react";
import { ArrowRight } from "lucide-react";
import { products, formatPrice } from "../data/products";
import {
    getB2BProductProfile,
    getB2BQuote,
    getDefaultPackOption,
} from "../lib/b2b";

export function WholesaleOrderTable() {
    const wholesaleProducts = products.slice(0, 5);
    const matrixMeta = [
        { value: "Старт", label: "товари для першого замовлення" },
        { value: "Вибір", label: "різні категорії в одному місці" },
        { value: "Повтор", label: "зручно замовляти ще раз" },
    ];

    return (
        <section id="b2b-matrix" className="relative overflow-hidden bg-[#111] py-16 text-white sm:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_24%)]" />
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
                <div className="mb-12 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
                            Приклад <span className="text-red-600">замовлення</span>
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">
                            Це приклад того, як може виглядати перше замовлення. Остаточний список
                            товарів ми допоможемо підібрати під ваш магазин.
                        </p>
                    </div>

                    <a
                        href="#cart"
                        className="tech-clip inline-flex w-full items-center justify-center gap-2 bg-red-600 px-6 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-500 md:w-auto md:px-8 md:tracking-widest"
                    >
                        Залишити запит
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    {matrixMeta.map((item, index) => (
                        <div
                            key={item.label}
                            className="premium-panel tech-clip fade-up px-5 py-5"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <p className="text-2xl font-black uppercase text-white">{item.value}</p>
                            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-gray-400">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="tech-clip premium-panel overflow-x-auto border border-white/10 p-2">
                    <table className="min-w-[900px] w-full text-left text-sm text-gray-400">
                        <thead className="border-b border-white/10 bg-black/50 text-[10px] font-black uppercase tracking-widest text-white">
                            <tr>
                                <th className="p-4">Товар</th>
                                <th className="p-4">Код</th>
                                <th className="p-4">Стартовий набір</th>
                                <th className="p-4">Мінімум / ціна</th>
                                <th className="p-4">Більше замовлення</th>
                                <th className="p-4">Кому підійде</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {wholesaleProducts.map((product) => {
                                const profile = getB2BProductProfile(product);
                                const pack = getDefaultPackOption(product);
                                const starterQuote = getB2BQuote(product, pack.id, pack.minPacks);
                                const volumeTier =
                                    profile.priceTiers[profile.priceTiers.length - 1];
                                const volumeQuote = getB2BQuote(
                                    product,
                                    pack.id,
                                    volumeTier.minPacks
                                );

                                return (
                                    <tr key={product.id} className="transition-colors hover:bg-white/5">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 flex-shrink-0 border border-white/10 bg-black p-2">
                                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="text-[9px] font-bold uppercase tracking-widest text-red-500">
                                                        {product.type}
                                                    </div>
                                                    <a href={`#product/${product.slug}`} className="font-bold uppercase text-white hover:text-red-400">
                                                        {product.name}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-[11px]">
                                            ART-{product.id.toString().padStart(4, "0")}
                                        </td>
                                        <td className="p-4 text-[11px]">
                                            <p className="font-bold text-white">{pack.label}</p>
                                            <p className="mt-1 text-gray-400">
                                                {pack.sizeLabel} • {pack.unitsPerPack} {pack.unitLabel}/уп.
                                            </p>
                                        </td>
                                        <td className="p-4 text-[11px]">
                                            <p className="font-bold text-white">
                                                Мінімум {pack.minPacks} уп. • {formatPrice(starterQuote.packPrice)} / уп.
                                            </p>
                                            <p className="mt-1 text-gray-400">
                                                {formatPrice(starterQuote.unitPrice)} / {pack.unitLabel}
                                            </p>
                                        </td>
                                        <td className="p-4 text-[11px]">
                                            <p className="font-bold text-white">
                                                {volumeTier.label} від {volumeTier.minPacks} уп.
                                            </p>
                                            <p className="mt-1 text-gray-400">
                                                {formatPrice(volumeQuote.unitPrice)} / {pack.unitLabel}
                                            </p>
                                        </td>
                                        <td className="p-4 text-[11px] text-gray-300">
                                            {profile.channels.join(" / ")}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
