import * as React from "react";
import { Heart, ArrowUpRight } from "lucide-react";
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
    return (
        <article className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#111] transition-all hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/4.3] overflow-hidden bg-black">
                {product.badge && (
                    <span className="absolute left-4 top-4 z-10 bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {product.badge}
          </span>
                )}

                {!product.inStock && (
                    <span className="absolute bottom-4 left-4 z-10 border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            Немає в наявності
          </span>
                )}

                <button
                    type="button"
                    onClick={() => onToggleWishlist(product.slug)}
                    className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border transition ${
                        isInWishlist
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-white/10 bg-black/60 text-white hover:border-red-500 hover:text-red-400"
                    }`}
                    aria-label="Додати в wishlist"
                >
                    <Heart className="h-4 w-4" />
                </button>

                <a href={`#product/${product.slug}`} className="block h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </a>
            </div>

            <div className="space-y-4 p-5">
                <div>
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">
                        {product.type}
                    </p>

                    <a href={`#product/${product.slug}`}>
                        <h3 className="line-clamp-2 text-xl font-black uppercase tracking-[-0.03em] text-white transition-colors hover:text-red-500">
                            {product.name}
                        </h3>
                    </a>
                </div>

                <p className="line-clamp-2 text-sm leading-6 text-gray-400">
                    {product.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {product.sizes.slice(0, 5).map((size) => (
                        <span
                            key={size}
                            className="border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-bold text-gray-300"
                        >
              {size}
            </span>
                    ))}
                    {product.sizes.length > 5 && (
                        <span className="border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-bold text-gray-500">
              +{product.sizes.length - 5}
            </span>
                    )}
                </div>

                <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
                    <div className="flex items-end gap-3">
            <span className="font-mono text-lg font-bold text-white">
              {formatPrice(product.price)}
            </span>

                        {product.oldPrice && (
                            <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
                        )}
                    </div>

                    <a
                        href={`#product/${product.slug}`}
                        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:text-red-500"
                    >
                        Деталі
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </article>
    );
}