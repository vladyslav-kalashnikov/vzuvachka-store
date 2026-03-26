import * as React from "react";
import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { getB2BProductProfile, getDefaultPackOption } from "../lib/b2b";
import { Product, formatPrice } from "../data/products";

type ProductCardProps = {
    product: Product;
    isInWishlist: boolean;
    onToggleWishlist: (slug: string) => void;
};

export function ProductCard({
                                product,
                                isInWishlist,
                                onToggleWishlist,
                            }: ProductCardProps) {
    const profile = getB2BProductProfile(product);
    const defaultPack = getDefaultPackOption(product);
    const volumeTier = profile.priceTiers[profile.priceTiers.length - 1];

    return (
        <article className="group tech-clip relative overflow-hidden bg-[#111] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(220,38,38,0.15)] border border-white/5 hover:border-red-500/30">

            {/* Блок із фото */}
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
                {/* Градієнт для читабельності бейджів */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 opacity-60 transition-opacity group-hover:opacity-40" />

                {product.badge && (
                    <span className="absolute left-3 top-3 z-20 tech-clip bg-red-600 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-red-600/20 sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.2em]">
                        {product.badge}
                    </span>
                )}

                {!product.inStock && (
                    <span className="absolute bottom-3 left-3 z-20 tech-clip border border-white/20 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white sm:bottom-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.2em]">
                        Під запит
                    </span>
                )}

                <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); onToggleWishlist(product.slug); }}
                    className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10 ${
                        isInWishlist
                            ? "border-red-500 bg-red-500 text-white scale-110 shadow-lg shadow-red-500/30"
                            : "border-white/10 bg-black/40 backdrop-blur-md text-white hover:border-red-500 hover:bg-red-500 hover:text-white"
                    }`}
                >
                    <Heart className={`h-4 w-4 ${isInWishlist ? "fill-white" : ""}`} />
                </button>

                <a href={`#product/${product.slug}`} className="block h-full w-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                </a>

                {/* Розміри (З'являються при наведенні) */}
                <div className="absolute bottom-0 left-0 right-0 z-20 hidden p-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
                    <div className="flex flex-wrap gap-1.5 justify-center">
                        {product.sizes.map((size) => (
                            <span key={size} className="bg-black/60 backdrop-blur-md border border-white/20 px-2 py-1 text-[10px] font-bold text-white uppercase">
                                {size}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Інформаційний блок */}
            <div className="relative z-20 bg-[#111] p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                        <p className="mb-1 text-[9px] font-black uppercase tracking-[0.25em] text-red-500">
                            {product.type}
                        </p>
                        <a href={`#product/${product.slug}`}>
                            <h3 className="line-clamp-2 text-lg font-black uppercase tracking-tight text-white transition-colors hover:text-red-500">
                                {product.name}
                            </h3>
                        </a>
                    </div>
                </div>

                <div className="mb-5 rounded-xl border border-white/5 bg-white/5 p-3 text-[10px] uppercase tracking-[0.18em] text-gray-400">
                    <span className="text-white font-bold block mb-1">MOQ: {defaultPack.minPacks} уп.</span>
                    {defaultPack.unitsPerPack} {defaultPack.unitLabel}/уп.
                </div>

                <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Опт від:</span>
                        <span className="font-mono text-xl font-black text-white copper-text">
                            {formatPrice(profile.priceTiers[0].unitPrice)}
                        </span>
                    </div>

                    <a
                        href={`#product/${product.slug}`}
                        className="flex h-10 w-10 items-center justify-center bg-white text-black transition-all hover:bg-red-600 hover:text-white rounded-full group/btn"
                    >
                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </article>
    );
}
