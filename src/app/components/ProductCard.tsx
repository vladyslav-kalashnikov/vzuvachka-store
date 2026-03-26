import * as React from "react";
// Додаємо імпорт ShoppingCart
import { ArrowUpRight, Heart, ShoppingCart } from "lucide-react";
import { getB2BProductProfile, getDefaultPackOption } from "../lib/b2b";
import { Product, formatPrice } from "../data/products";
import { useShop } from "../store/useShop";
import { toast } from "sonner";

type ProductCardProps = {
    product: Product;
    isInWishlist: boolean;
    onToggleWishlist: (slug: string) => void;
};

export function ProductCard({ product, isInWishlist, onToggleWishlist }: ProductCardProps) {
    const profile = getB2BProductProfile(product);
    const defaultPack = getDefaultPackOption(product);
    const { addToCart } = useShop();

    // Функція додавання в кошик без переходу на сторінку
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({
            slug: product.slug,
            packId: defaultPack.id,
            packLabel: defaultPack.label,
            packSizeLabel: defaultPack.sizeLabel,
            unitsPerPack: defaultPack.unitsPerPack,
            unitLabel: defaultPack.unitLabel,
            minPacks: defaultPack.minPacks,
            tierLabel: profile.priceTiers[0].label,
            unitPrice: profile.priceTiers[0].unitPrice,
            packPrice: profile.priceTiers[0].unitPrice * defaultPack.unitsPerPack,
            quantity: defaultPack.minPacks,
        });
        toast.success(`Товар додано в заявку (${defaultPack.minPacks} уп.)`);
    };

    return (
        <article className="group tech-clip relative overflow-hidden border border-white/5 bg-[#111] transition-all duration-500 hover:-translate-y-2 hover:border-red-500/30 hover:shadow-[0_30px_60px_rgba(220,38,38,0.15)]">
            {/* ТУТ ВАШ ІСНУЮЧИЙ КОД ФОТОГРАФІЇ ТА БЕЙДЖІВ - НЕ ЗМІНЮЄТЬСЯ */}
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 opacity-60 transition-opacity group-hover:opacity-40" />
                {product.badge && (
                    <span className="absolute left-2.5 top-2.5 z-20 tech-clip bg-red-600 px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-red-600/20 sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.2em]">
                        {product.badge}
                    </span>
                )}
                {!product.inStock && (
                    <span className="absolute bottom-2.5 left-2.5 z-20 tech-clip border border-white/20 bg-black/80 backdrop-blur-md px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-white sm:bottom-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.2em]">
                        Під запит
                    </span>
                )}
                <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); onToggleWishlist(product.slug); }}
                    className={`absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10 ${
                        isInWishlist ? "border-red-500 bg-red-500 text-white scale-110 shadow-lg shadow-red-500/30" : "border-white/10 bg-black/40 backdrop-blur-md text-white hover:border-red-500 hover:bg-red-500 hover:text-white"
                    }`}
                >
                    <Heart className={`h-4 w-4 ${isInWishlist ? "fill-white" : ""}`} />
                </button>
                <a href={`#product/${product.slug}`} className="block h-full w-full">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
                </a>
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

            {/* ІНФОРМАЦІЯ ПРО ТОВАР ТА НОВІ КНОПКИ */}
            <div className="relative z-20 bg-[#111] p-3 sm:p-5">
                <div className="mb-3 flex items-start justify-between gap-3 sm:gap-4">
                    <div>
                        <p className="mb-1 text-[8px] font-black uppercase tracking-[0.18em] text-red-500 sm:text-[9px] sm:tracking-[0.25em]">
                            {product.type}
                        </p>
                        <a href={`#product/${product.slug}`}>
                            <h3 className="line-clamp-2 text-[15px] font-black uppercase leading-tight tracking-tight text-white transition-colors hover:text-red-500 sm:text-lg">
                                {product.name}
                            </h3>
                        </a>
                    </div>
                </div>

                <div className="mb-4 rounded-xl border border-white/5 bg-white/5 p-2.5 text-[9px] uppercase tracking-[0.12em] text-gray-400 sm:mb-5 sm:p-3 sm:text-[10px] sm:tracking-[0.18em]">
                    <span className="mb-1 block text-white font-bold">MOQ: {defaultPack.minPacks} уп.</span>
                    {defaultPack.unitsPerPack} {defaultPack.unitLabel}/уп.
                </div>

                <div className="flex items-end justify-between gap-2 border-t border-white/10 pt-3 sm:gap-3 sm:pt-4">
                    <div className="flex flex-col">
                        <span className="mb-1 text-[8px] uppercase tracking-[0.14em] text-gray-500 sm:text-[10px] sm:tracking-widest">Опт від:</span>
                        <span className="font-mono text-lg font-black text-white copper-text sm:text-xl">
                            {formatPrice(profile.priceTiers[0].unitPrice)}
                        </span>
                    </div>

                    {/* ДОДАНО КНОПКУ КОШИКА */}
                    <div className="flex gap-2">
                        <a
                            href={`#product/${product.slug}`}
                            className="group/btn flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#111] text-white transition-all hover:border-white hover:bg-white hover:text-black sm:h-10 sm:w-10"
                            title="Детальніше"
                        >
                            <ArrowUpRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                        <button
                            onClick={handleAddToCart}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white transition-all hover:bg-red-500 sm:h-10 sm:w-10 shadow-[0_5px_15px_rgba(220,38,38,0.3)]"
                            title="Додати в заявку"
                        >
                            <ShoppingCart className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}