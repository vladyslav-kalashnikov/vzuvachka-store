import * as React from "react";
import { useMemo, useState } from "react";
import {
    Heart,
    ShoppingBag,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    Ruler,
    ShieldCheck,
    Truck,
    Star,
} from "lucide-react";
import { formatPrice, getProductBySlug } from "../data/products";
import { useShop } from "../store/useShop";
import { toast } from "sonner";

type ProductPageProps = {
    slug: string;
};

export function ProductPage({ slug }: ProductPageProps) {
    const product = useMemo(() => getProductBySlug(slug), [slug]);
    const { isInWishlist, toggleWishlist, addToCart } = useShop();

    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const gallery = product?.gallery?.length ? product.gallery : product ? [product.image] : [];
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const touchStartX = React.useRef<number | null>(null);
    const touchEndX = React.useRef<number | null>(null);

    React.useEffect(() => {
        setActiveImageIndex(0);
        setSelectedSize("");
        setSelectedQuantity(1);
    }, [product]);

    if (!product) {
        return (
            <section className="min-h-screen border-t border-white/5 bg-[#0a0a0a] px-6 py-24 text-white">
                <div className="mx-auto max-w-[1200px]">
                    <a
                        href="#page/men"
                        className="inline-flex border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:text-red-500"
                    >
                        До каталогу
                    </a>
                </div>
            </section>
        );
    }

    const activeImage = gallery[activeImageIndex] ?? product.image;

    const goToPrevImage = () => {
        setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
    };

    const goToNextImage = () => {
        setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.changedTouches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;

        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 40;

        if (distance > minSwipeDistance) goToNextImage();
        if (distance < -minSwipeDistance) goToPrevImage();

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Оберіть розмір");
            return;
        }

        addToCart(product.slug, selectedSize, selectedQuantity);
        toast.success(`Додано в кошик: ${product.name}`);
    };

    return (
        <section className="relative min-h-screen overflow-hidden border-t border-white/5 bg-[#0a0a0a] pb-24 pt-16 font-sans text-white">
            <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[800px] w-[800px] rounded-full bg-red-600/5 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-[1500px] px-6">
                <div className="mb-6 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
                    <a
                        href="javascript:history.back()"
                        className="inline-flex items-center gap-2 transition hover:text-red-500"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Назад
                    </a>
                    <span>/</span>
                    <a
                        href={`#page/${product.category[0] ?? "men"}`}
                        className="transition hover:text-white"
                    >
                        Каталог
                    </a>
                    <span>/</span>
                    <span className="text-gray-400">{product.name}</span>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,820px)_420px]">
                    <div className="rounded-[28px] border border-white/10 bg-black/25 p-4 md:p-5">
                        <div className="grid gap-4 lg:grid-cols-[110px_1fr]">
                            <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
                                {gallery.map((image, index) => {
                                    const isActive = activeImageIndex === index;

                                    return (
                                        <button
                                            key={`${image}-${index}`}
                                            type="button"
                                            onClick={() => setActiveImageIndex(index)}
                                            className={`shrink-0 overflow-hidden rounded-xl border transition ${
                                                isActive
                                                    ? "border-red-500"
                                                    : "border-white/10 hover:border-white/25"
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                className="h-24 w-24 object-cover lg:h-28 lg:w-full"
                                            />
                                        </button>
                                    );
                                })}
                            </div>

                            <div
                                className="order-1 relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0d0d0d] lg:order-2"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleWishlist(product.slug)}
                                    className={`absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border transition ${
                                        isInWishlist(product.slug)
                                            ? "border-red-500 bg-red-500 text-white"
                                            : "border-white/10 bg-black/60 text-white hover:border-red-500 hover:text-red-400"
                                    }`}
                                >
                                    <Heart className="h-5 w-5" />
                                </button>

                                {product.badge && (
                                    <div className="absolute left-4 top-4 z-20 border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                                        {product.badge}
                                    </div>
                                )}

                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    className="h-[400px] w-full select-none object-cover md:h-[680px]"
                                    draggable={false}
                                />

                                {gallery.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={goToPrevImage}
                                            className="absolute left-4 top-1/2 hidden -translate-y-1/2 border border-white/10 bg-black/60 p-2.5 text-white transition hover:border-red-500 hover:text-red-400 md:inline-flex"
                                            aria-label="Попереднє фото"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={goToNextImage}
                                            className="absolute right-4 top-1/2 hidden -translate-y-1/2 border border-white/10 bg-black/60 p-2.5 text-white transition hover:border-red-500 hover:text-red-400 md:inline-flex"
                                            aria-label="Наступне фото"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>

                                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2">
                                            {gallery.map((_, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => setActiveImageIndex(index)}
                                                    className={`h-2.5 w-2.5 rounded-full transition ${
                                                        activeImageIndex === index ? "bg-red-500" : "bg-white/25"
                                                    }`}
                                                />
                                            ))}
                                        </div>

                                        <div className="absolute right-4 top-16 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white md:hidden">
                                            Swipe
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.02] p-6">
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <h2 className="text-2xl font-black uppercase text-white">
                                    Опис
                                </h2>

                                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-red-600">
                  Product info
                </span>
                            </div>

                            <p className="text-base leading-8 text-gray-300">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <aside className="h-fit rounded-[28px] border border-white/10 bg-black/25 p-6 md:p-7 xl:sticky xl:top-28">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-red-600">
                                    ВЗУВАЧКА // PRODUCT
                                </p>
                                <h1 className="text-3xl font-black uppercase tracking-[-0.04em] text-white">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="flex items-center gap-1 pt-1 text-red-500">
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current opacity-40" />
                            </div>
                        </div>

                        <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-gray-500">
                            {product.type}
                        </p>

                        <div className="mb-6 flex items-end gap-4">
              <span className="font-mono text-4xl font-bold text-white">
                {formatPrice(product.price)}
              </span>

                            {product.oldPrice && (
                                <span className="pb-1 text-lg text-gray-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                            )}
                        </div>

                        <div className="mb-6 grid gap-3">
                            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                                <div className="border border-white/10 bg-white/[0.02] p-4">
                                    <div className="mb-2 flex items-center gap-2 text-red-500">
                                        <Truck className="h-4 w-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Доставка
                    </span>
                                    </div>
                                    <p className="text-sm text-gray-300">1–3 дні по Україні</p>
                                </div>

                                <div className="border border-white/10 bg-white/[0.02] p-4">
                                    <div className="mb-2 flex items-center gap-2 text-red-500">
                                        <ShieldCheck className="h-4 w-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Повернення
                    </span>
                                    </div>
                                    <p className="text-sm text-gray-300">
                                        14 днів на обмін / повернення
                                    </p>
                                </div>

                                <div className="border border-white/10 bg-white/[0.02] p-4">
                                    <div className="mb-2 flex items-center gap-2 text-red-500">
                                        <Ruler className="h-4 w-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Розмір
                    </span>
                                    </div>
                                    <a
                                        href={`#page/size-guide?from=${product.slug}`}
                                        className="text-sm text-white underline decoration-white/20 underline-offset-4 transition hover:text-red-400"
                                    >
                                        Подивитися розмірну сітку
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mb-7">
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <h2 className="text-sm font-black uppercase tracking-[0.22em] text-white">
                                    Оберіть розмір
                                </h2>
                                <a
                                    href={`#page/size-guide?from=${product.slug}`}
                                    className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500 transition hover:text-red-400"
                                >
                                    Size guide
                                </a>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => {
                                    const active = selectedSize === size;

                                    return (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[58px] border px-4 py-3 text-sm font-bold transition ${
                                                active
                                                    ? "border-red-500 bg-red-500 text-white"
                                                    : "border-white/10 bg-[#111] text-white hover:border-red-500"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {product.colors && (
                            <div className="mb-7">
                                <h2 className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-white">
                                    Кольори
                                </h2>

                                <div className="flex flex-wrap gap-3">
                                    {product.colors.map((color) => (
                                        <span
                                            key={color}
                                            className="border border-white/10 bg-[#111] px-4 py-3 text-sm text-gray-300"
                                        >
                      {color}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-7">
                            <h2 className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-white">
                                Кількість
                            </h2>

                            <div className="inline-flex items-center border border-white/10 bg-[#111]">
                                <button
                                    type="button"
                                    onClick={() => setSelectedQuantity((prev) => Math.max(1, prev - 1))}
                                    className="px-5 py-4 text-white transition hover:text-red-500"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>

                                <span className="min-w-[64px] text-center font-bold text-white">
                  {selectedQuantity}
                </span>

                                <button
                                    type="button"
                                    onClick={() => setSelectedQuantity((prev) => prev + 1)}
                                    className="px-5 py-4 text-white transition hover:text-red-500"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="mb-4 inline-flex min-h-[64px] w-full items-center justify-center gap-3 bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-red-500"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Додати в кошик
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                toggleWishlist(product.slug);
                                toast.success("Wishlist оновлено");
                            }}
                            className={`inline-flex min-h-[60px] w-full items-center justify-center gap-3 border px-6 py-4 text-sm font-black uppercase tracking-[0.22em] transition ${
                                isInWishlist(product.slug)
                                    ? "border-red-500 text-red-500"
                                    : "border-white/10 text-white hover:border-red-500 hover:text-red-500"
                            }`}
                        >
                            <Heart className="h-4 w-4" />
                            {isInWishlist(product.slug) ? "У wishlist" : "До wishlist"}
                        </button>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <h2 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-white">
                                Характеристики
                            </h2>

                            <ul className="space-y-3">
                                {product.details.map((detail) => (
                                    <li
                                        key={detail}
                                        className="border-l-2 border-red-600 pl-4 text-sm leading-7 text-gray-300"
                                    >
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}