import * as React from "react";
// Додаємо іконку Eye для красивого ефекту наведення на фото
import { Heart, ShoppingCart, Eye } from "lucide-react";
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

    const productUrl = `#product/${product.slug}`;

    // Функція додавання в кошик зі зупинкою спливання події (event propagation)
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Блокуємо клік, щоб не перейти на сторінку товару
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

    // Оновлена функція перемикання обраного зі зупинкою спливання
    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Блокуємо клік
        onToggleWishlist(product.slug);
    };

    return (
        <article className="group tech-clip premium-panel relative border border-white/5 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-2 hover:border-red-500/30 hover:shadow-[0_40px_80px_rgba(220,38,38,0.2)]">

            {/* --- СЕКЦІЯ ФОТОГРАФІЇ (Загорнута в посилання) --- */}
            {/* z-20 гарантує, що ця секція буде клікабельною, а z-40 на кнопці 'серце' дозволить натискати саме на неї */}
            <a href={productUrl} className="block relative z-20 aspect-[4/5] overflow-hidden bg-black">
                {/* Градієнт для глибини */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50 z-20 opacity-90 transition-opacity group-hover:opacity-60" />

                {/* Бейджі */}
                {product.badge && (
                    <span className="absolute left-3 top-3 z-30 tech-clip bg-red-600 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-red-600/30 sm:left-4 sm:top-4 sm:text-[10px]">
                        {product.badge}
                    </span>
                )}

                {!product.inStock && (
                    <span className="absolute bottom-3 left-3 z-30 tech-clip border border-white/20 bg-black/80 backdrop-blur-md px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-white sm:bottom-4 sm:left-4 sm:text-[10px]">
                        Під запит
                    </span>
                )}

                {/* Кнопка "Обране" (z-40 гарантує клікабельність, stop propagation вже оброблено) */}
                <button
                    type="button"
                    onClick={handleToggleWishlist}
                    className={`absolute right-3 top-3 z-40 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 sm:right-4 sm:top-4 sm:h-11 sm:w-11 ${
                        isInWishlist ? "border-red-500 bg-red-500 text-white scale-110 shadow-lg shadow-red-500/50" : "border-white/10 bg-black/60 backdrop-blur-md text-white/70 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500"
                    }`}
                >
                    <Heart className={`h-4 w-4 ${isInWishlist ? "fill-white text-white" : ""}`} />
                </button>

                {/* Ефект 'Eye' та посилення градієнту при наведенні (z-25) */}
                <div className="absolute inset-0 z-25 flex items-center justify-center bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col items-center gap-2 p-4 text-center text-white tech-clip border border-red-500/30 bg-black/60 backdrop-blur-sm shadow-xl">
                        <Eye className="h-7 w-7 text-red-500" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Відкрити модель</span>
                    </div>
                </div>

                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Матриця розмірів (з'являється при наведенні, z-25) */}
                <div className="absolute bottom-0 left-0 right-0 z-25 p-4 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
                    <div className="flex flex-wrap gap-1.5 justify-center">
                        {product.sizes.map((size) => (
                            <span key={size} className="bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-bold text-white uppercase shadow-inner">
                                {size}
                            </span>
                        ))}
                    </div>
                </div>
            </a> {/* End of photo link */}

            {/* --- ІНФОРМАЦІЙНА СЕКЦІЯ ТА КНОПКИ --- */}
            <div className="relative z-20 bg-[#0c0c0c] p-4 sm:p-5 border-t border-white/5">
                <div className="mb-4 flex flex-col gap-2">
                    <p className="text-[8px] font-black uppercase tracking-[0.25em] text-red-500 sm:text-[9px]">
                        {product.type}
                    </p>
                    {/* Назва (також посилання) */}
                    <h3 className="line-clamp-2 min-h-[36px] text-[16px] font-black uppercase leading-[1.15] tracking-tight text-white transition-colors group-hover:text-red-500 sm:text-[18px]">
                        <a href={productUrl} className="relative z-30">
                            {product.name}
                        </a>
                    </h3>
                </div>

                {/* MOQ блок */}
                <div className="mb-5 tech-clip border border-white/5 bg-black/40 p-3 text-[9px] uppercase tracking-[0.18em] text-gray-400 sm:p-4 sm:text-[10px]">
                    <span className="mb-1 block text-white font-bold">MOQ: {defaultPack.minPacks} уп. ({defaultPack.unitsPerPack} пар)</span>
                    Матриця: <span className="text-gray-200">{defaultPack.label} • {defaultPack.sizeLabel}</span>
                </div>

                {/* Ціна та кнопка кошика */}
                <div className="flex items-end justify-between gap-2 border-t border-white/5 pt-4 sm:gap-3 sm:pt-5">
                    <div className="flex flex-col">
                        <span className="mb-1 text-[9px] uppercase tracking-[0.14em] text-gray-500 sm:text-[11px] sm:tracking-widest">Опт від:</span>
                        {/* Мідний колір для ціни (copper-text) */}
                        <span className="font-mono text-xl font-black text-[#e39c5e] copper-text copper-shadow-lg sm:text-2xl leading-none">
                            {formatPrice(profile.priceTiers[0].unitPrice)}
                        </span>
                    </div>

                    {/* Кнопка Кошика (z-40 гарантує клікабельність, stop propagation handled) */}
                    <div className="flex gap-2 relative z-40">
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white transition-all hover:bg-red-500 sm:h-11 sm:w-11 shadow-[0_5px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.6)]"
                            title="Додати в заявку"
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}