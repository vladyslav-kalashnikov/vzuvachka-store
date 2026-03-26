import * as React from "react";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Heart,
    Minus,
    PackageCheck,
    Plus,
    Ruler,
    ShieldCheck,
    Truck,
} from "lucide-react";
import { toast } from "sonner";
import { formatPrice, getProductBySlug } from "../data/products";
import {
    formatUnits,
    getB2BProductProfile,
    getB2BQuote,
    getDefaultPackOption,
} from "../lib/b2b";
import { useShop } from "../store/useShop";
import { PageLayout } from "./PageLayout";

type ProductPageProps = {
    slug: string;
};

export function ProductPage({ slug }: ProductPageProps) {
    const product = React.useMemo(() => getProductBySlug(slug), [slug]);
    const { isInWishlist, toggleWishlist, addToCart } = useShop();

    const [selectedPackId, setSelectedPackId] = React.useState("");
    const [selectedColor, setSelectedColor] = React.useState("");
    const [selectedQuantity, setSelectedQuantity] = React.useState(1);
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);
    const profile = React.useMemo(
        () => (product ? getB2BProductProfile(product) : null),
        [product]
    );
    const defaultPack = React.useMemo(
        () => (product ? getDefaultPackOption(product) : null),
        [product]
    );
    const quote = React.useMemo(
        () => (product ? getB2BQuote(product, selectedPackId, selectedQuantity) : null),
        [product, selectedPackId, selectedQuantity]
    );

    React.useEffect(() => {
        setActiveImageIndex(0);
        setSelectedPackId(defaultPack?.id ?? "");
        setSelectedColor(product?.colors?.length === 1 ? product.colors[0] : "");
        setSelectedQuantity(defaultPack?.minPacks ?? 1);
    }, [defaultPack, product]);

    if (!product || !profile || !defaultPack || !quote) {
        return (
            <PageLayout
                title="Товар не знайдено"
                subtitle="Схоже, цього товару зараз немає або посилання застаріло."
            >
                <section className="space-y-5 fade-up">
                    <p>Перевірте посилання або поверніться до каталогу.</p>
                    <a
                        href="#page/men"
                        className="tech-clip inline-flex border border-white/20 bg-white/5 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                    >
                        До каталогу
                    </a>
                </section>
            </PageLayout>
        );
    }

    const gallery = product.gallery?.length ? product.gallery : [product.image];
    const activeImage = gallery[activeImageIndex] ?? product.image;

    const handleAddToCart = () => {
        if (product.colors?.length && !selectedColor) {
            toast.error("Оберіть колір");
            return;
        }

        addToCart({
            slug: product.slug,
            packId: quote.pack.id,
            packLabel: quote.pack.label,
            packSizeLabel: quote.pack.sizeLabel,
            unitsPerPack: quote.pack.unitsPerPack,
            unitLabel: quote.pack.unitLabel,
            minPacks: quote.pack.minPacks,
            tierLabel: quote.tier.label,
            unitPrice: quote.unitPrice,
            packPrice: quote.packPrice,
            color: selectedColor || undefined,
            quantity: quote.packs,
        });
        toast.success(
            `${product.name} додано: ${quote.packs} уп. (${formatUnits(
                quote.totalUnits,
                quote.pack.unitLabel
            )})`
        );
    };

    const handleToggleWishlist = () => {
        toggleWishlist(product.slug);
        toast.success(isInWishlist(product.slug) ? "Товар прибрано з обраного" : "Товар додано в обране");
    };

    return (
        <PageLayout
            title={product.name}
            subtitle={`${product.type} • товар #${product.id} • від ${formatPrice(
                profile.priceTiers[0].unitPrice
            )} / ${profile.unitLabel}`}
        >
            <section className="space-y-8">
                <div className="flex flex-wrap gap-3 fade-up">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:bg-red-500/20"
                    >
                        <ArrowLeft className="h-3 w-3" />
                        Назад
                    </button>
                    <a
                        href={`#page/${product.category[0] ?? "men"}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:bg-red-500/20"
                    >
                        Увесь сегмент
                    </a>
                    <a
                        href={`#page/size-guide?from=${product.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:bg-red-500/20"
                    >
                        <Ruler className="h-3 w-3" />
                        Розмірні матриці
                    </a>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
                    <div className="space-y-6">
                        {/* ЗОБРАЖЕННЯ */}
                        <div className="premium-panel p-2 fade-up" style={{ animationDelay: '0.1s' }}>
                            <div className="tech-clip relative overflow-hidden bg-black">
                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    className="aspect-[4/4.5] w-full object-cover transition-transform duration-700 hover:scale-105"
                                />

                                {gallery.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))
                                            }
                                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md p-3 text-white transition hover:border-red-500 hover:bg-red-600"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md p-3 text-white transition hover:border-red-500 hover:bg-red-600"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {gallery.length > 1 && (
                                <div className="mt-2 grid grid-cols-4 sm:grid-cols-6 gap-2">
                                    {gallery.map((image, index) => (
                                        <button
                                            key={`${image}-${index}`}
                                            type="button"
                                            onClick={() => setActiveImageIndex(index)}
                                            className={`tech-clip overflow-hidden border-2 transition-all ${
                                                activeImageIndex === index
                                                    ? "border-red-500 opacity-100"
                                                    : "border-transparent opacity-50 hover:opacity-100"
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                className="aspect-square w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ОПИС */}
                        <div className="premium-panel p-6 sm:p-8 fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                                <h2 className="text-2xl font-black uppercase text-white tracking-tight">Опис товару</h2>
                                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-red-600 bg-red-600/10 px-3 py-1 rounded-full">
                                    Деталі
                                </span>
                            </div>

                            <p className="text-base leading-8 text-gray-300 font-light">{product.description}</p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {product.details.map((detail) => (
                                    <div
                                        key={detail}
                                        className="tech-clip border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4 text-sm font-medium text-gray-300"
                                    >
                                        <span className="text-red-500 mr-2">/</span> {detail}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ПРАВА ПАНЕЛЬ (КАЛЬКУЛЯТОР B2B) */}
                    <aside className="premium-panel h-fit p-6 sm:p-8 xl:sticky xl:top-28 fade-up" style={{ animationDelay: '0.3s' }}>
                        <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                            <div>
                                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                                    VZUVACHKA
                                </p>
                                <h1 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">
                                    {product.name}
                                </h1>
                                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
                                    {product.type}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleToggleWishlist}
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all shadow-lg ${
                                    isInWishlist(product.slug)
                                        ? "border-red-500 bg-red-500 text-white shadow-red-500/20"
                                        : "border-white/20 bg-black/40 text-white hover:border-red-500 hover:bg-red-500"
                                }`}
                                aria-label="Додати в обране"
                            >
                                <Heart className={`h-5 w-5 ${isInWishlist(product.slug) ? "fill-white" : ""}`} />
                            </button>
                        </div>

                        <div className="mb-8 flex items-end gap-4">
                            <span className="font-mono text-4xl font-black copper-text">
                                від {formatPrice(product.price)}
                            </span>
                            {product.oldPrice && (
                                <span className="pb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gray-500 line-through decoration-red-500/50">
                                    РРЦ {formatPrice(product.oldPrice)}
                                </span>
                            )}
                        </div>

                        <div className="mb-8 grid gap-3">
                            <InfoCard
                                icon={<Truck className="h-4 w-4" />}
                                title="Поставка"
                                text={`${profile.leadTimeLabel}. ${profile.reorderNote}`}
                            />
                            <InfoCard
                                icon={<PackageCheck className="h-4 w-4" />}
                                title="Старт"
                                text={`Мінімум ${defaultPack.minPacks} уп. • ${defaultPack.label} • ${defaultPack.sizeLabel}`}
                            />
                            <InfoCard
                                icon={<ShieldCheck className="h-4 w-4" />}
                                title="Де підійде"
                                text={`Підходить для ${profile.channels.join(" / ")}.`}
                            />
                        </div>

                        {/* ВАРІАНТИ ПАКУВАННЯ */}
                        <div className="mb-8 space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                Варіанти пакування
                            </label>
                            <div className="grid gap-3">
                                {profile.packOptions.map((pack) => {
                                    const preview = getB2BQuote(product, pack.id, Math.max(pack.minPacks, selectedQuantity));
                                    const isActive = quote.pack.id === pack.id;

                                    return (
                                        <button
                                            key={pack.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedPackId(pack.id);
                                                setSelectedQuantity((prev) => Math.max(pack.minPacks, prev));
                                            }}
                                            className={`tech-clip border p-5 text-left transition-all duration-300 relative overflow-hidden ${
                                                isActive
                                                    ? "border-red-500 bg-red-600/10 text-white shadow-[0_0_20px_rgba(220,38,38,0.15)]"
                                                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:bg-white/10"
                                            }`}
                                        >
                                            {isActive && <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />}
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className={`text-sm font-black uppercase tracking-[0.14em] ${isActive ? 'text-white' : ''}`}>
                                                        {pack.label}
                                                    </p>
                                                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
                                                        {pack.sizeLabel}
                                                    </p>
                                                </div>
                                                {pack.recommended && (
                                                    <span className="rounded-sm border border-red-500/40 bg-red-500/10 px-2 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-red-400">
                                                    Радимо
                                                </span>
                                                )}
                                            </div>

                                            <p className="mt-3 text-xs leading-5 opacity-80">
                                                {pack.description}
                                            </p>

                                            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-[10px] font-bold uppercase tracking-[0.16em] opacity-90">
                                                <span>Вміст: {pack.unitsPerPack} {pack.unitLabel}/уп.</span>
                                                <span className="text-right">від {formatPrice(preview.unitPrice)} / {pack.unitLabel}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* КОЛІР */}
                        {product.colors?.length ? (
                            <div className="mb-8 space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                    Колір моделі
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setSelectedColor(color)}
                                            className={`tech-clip border px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                                                selectedColor === color
                                                    ? "border-red-500 bg-red-600 text-white shadow-lg shadow-red-600/20"
                                                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
                                            }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {/* КІЛЬКІСТЬ */}
                        <div className="mb-8">
                            <label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                Кількість упаковок
                            </label>
                            <div className="inline-flex items-center border border-white/20 bg-black/40 rounded-full p-1">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedQuantity((prev) =>
                                            Math.max(quote.pack.minPacks, prev - 1)
                                        )
                                    }
                                    className="h-10 w-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="min-w-[60px] text-center font-black text-lg text-white">
                                    {selectedQuantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedQuantity((prev) => prev + 1)}
                                    className="h-10 w-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                                Мінімум для цього пакування: <span className="text-white">{quote.pack.minPacks} уп.</span>
                            </p>
                        </div>

                        {/* ПІДСУМОК (КАЛЬКУЛЯТОР) */}
                        <div className="mb-8 rounded-[24px] border border-red-500/20 bg-gradient-to-br from-red-950/20 to-black p-5 shadow-inner">
                            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-500 mb-1">
                                        Поточний розрахунок
                                    </p>
                                    <p className="font-mono text-3xl font-black text-white">
                                        {formatPrice(quote.unitPrice)} <span className="text-sm font-sans text-gray-500">/ {quote.pack.unitLabel}</span>
                                    </p>
                                </div>
                                <div className="text-right text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    <p className="text-white mb-1 text-sm">{quote.packs} уп.</p>
                                    <p>{formatUnits(quote.totalUnits, quote.pack.unitLabel)}</p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <StatCard label="Сума замовлення" value={formatPrice(quote.subtotal)} />
                                <StatCard label="Ваша економія" value={quote.savings > 0 ? formatPrice(quote.savings) : "0 ₴"} />
                            </div>
                        </div>

                        {/* РІВНІ ЦІН */}
                        <div className="mb-8 space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                Оптові рівні цін
                            </label>
                            <div className="grid gap-2">
                                {profile.priceTiers.map((tier) => {
                                    const isActive = quote.tier.id === tier.id;
                                    return (
                                        <div
                                            key={tier.id}
                                            className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                                                isActive
                                                    ? "border-red-500/50 bg-red-600/10"
                                                    : "border-white/5 bg-white/5"
                                            }`}
                                        >
                                            <div>
                                                <p className={`text-[11px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                                    {tier.label}
                                                </p>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mt-0.5">
                                                    від {tier.minPacks} уп.
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-mono text-sm font-bold text-white">
                                                    {formatPrice(tier.unitPrice)}
                                                </p>
                                                <p className="text-[9px] font-bold text-red-500 uppercase mt-0.5">
                                                    -{tier.discountPercent}% знижка
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* КНОПКИ */}
                        <div className="grid gap-3">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="tech-clip flex min-h-[64px] items-center justify-center bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                            >
                                Додати до заявки
                            </button>

                            <a
                                href="#page/wholesale"
                                className="tech-clip flex min-h-[64px] items-center justify-center border border-white/20 bg-transparent px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 transition-all hover:border-white hover:text-white"
                            >
                                Дізнатися умови
                            </a>
                        </div>
                    </aside>
                </div>
            </section>
        </PageLayout>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="tech-clip border border-white/10 bg-black/40 px-4 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                {label}
            </p>
            <p className="mt-1 text-sm font-black uppercase text-white">{value}</p>
        </div>
    );
}

function InfoCard({
                      icon,
                      title,
                      text,
                  }: {
    icon: React.ReactNode;
    title: string;
    text: string;
}) {
    return (
        <div className="tech-clip border border-white/10 bg-white/5 p-4 flex gap-4 items-start">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                {icon}
            </div>
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">{title}</span>
                <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed">{text}</p>
            </div>
        </div>
    );
}