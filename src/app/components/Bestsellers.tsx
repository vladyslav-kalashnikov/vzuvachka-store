import { useRef } from "react";
import * as React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { products, formatPrice } from "../data/products";
import { getB2BProductProfile, getDefaultPackOption } from "../lib/b2b";
import { useShop } from "../store/useShop";

export function Bestsellers() {
    const sliderRef = useRef<Slider>(null);
    const { isInWishlist, toggleWishlist } = useShop();
    const overview = [
        { value: "6", label: "товарів, з яких зручно почати" },
        { value: "Популярні", label: "моделі, які часто замовляють" },
        { value: "Повтор", label: "товари, які легко дозамовити" },
    ];

    const bestsellers = products.slice(0, 6);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    const renderCard = (product: (typeof bestsellers)[number]) => {
        const profile = getB2BProductProfile(product);
        const pack = getDefaultPackOption(product);
        const volumeTier = profile.priceTiers[profile.priceTiers.length - 1];

        return (
            <article className="tech-clip group relative overflow-hidden border border-white/10 bg-[#111] p-4 transition-all hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/8 to-transparent" />
                {product.badge && (
                    <span className="absolute left-4 top-4 z-10 bg-red-600 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                        {product.badge}
                    </span>
                )}

                <button
                    type="button"
                    onClick={() => toggleWishlist(product.slug)}
                    className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border transition ${
                        isInWishlist(product.slug)
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-white/10 bg-black/50 text-white hover:border-red-500 hover:text-red-400"
                    }`}
                    aria-label="Додати в шортлист"
                >
                    <Heart className="h-4 w-4" />
                </button>

                <a href={`#product/${product.slug}`}>
                    <div className="tech-clip relative mb-4 flex aspect-square items-center justify-center overflow-hidden bg-black p-5 sm:p-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </a>

                <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        {product.type}
                    </p>

                    <a href={`#product/${product.slug}`}>
                        <h3 className="mb-4 text-xl font-black uppercase leading-tight tracking-tight text-white hover:text-red-500 sm:text-lg">
                            {product.name}
                        </h3>
                    </a>

                    <div className="mb-4 rounded-2xl border border-white/10 bg-black/30 p-3 text-[11px] uppercase tracking-[0.16em] text-gray-400">
                        <p>Товар #{product.id}</p>
                        <p className="mt-1">
                            {pack.label} • {pack.unitsPerPack} {pack.unitLabel}/уп.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-mono font-bold text-white">
                            від {formatPrice(profile.priceTiers[0].unitPrice)} / {profile.unitLabel}
                        </span>

                        <a
                            href={`#product/${product.slug}`}
                            className="border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white transition hover:border-red-500 hover:text-red-500"
                        >
                            В заявку
                        </a>
                    </div>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-gray-500">
                        {volumeTier.label}: від {volumeTier.minPacks} уп. по {formatPrice(volumeTier.unitPrice)} / {profile.unitLabel}
                    </p>
                </div>
            </article>
        );
    };

    return (
        <section id="bestsellers" className="relative overflow-hidden bg-[#0a0a0a] py-16 sm:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_24%)]" />
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
                <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.4em] text-red-600">
                            Популярні товари
                        </p>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
                            Що часто{" "}
                            <span
                                className="text-transparent"
                                style={{ WebkitTextStroke: "1px white" }}
                            >
                                замовляють
                            </span>
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400">
                            Це товари, які найчастіше обирають для першого замовлення або
                            регулярного продажу.
                        </p>
                    </div>

                    <div className="hidden gap-2 self-start md:flex md:self-auto">
                        <button
                            type="button"
                            onClick={() => sliderRef.current?.slickPrev()}
                            className="flex h-10 w-10 items-center justify-center bg-zinc-900 text-white transition-colors hover:bg-red-600"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onClick={() => sliderRef.current?.slickNext()}
                            className="flex h-10 w-10 items-center justify-center bg-zinc-900 text-white transition-colors hover:bg-red-600"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    {overview.map((item, index) => (
                        <div
                            key={item.label}
                            className="premium-panel tech-clip fade-up px-5 py-5"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <p className="mb-2 text-2xl font-black uppercase text-white">{item.value}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">{item.label}</p>
                        </div>
                    ))}
                </div>

                <div className="md:hidden">
                    <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex snap-x snap-mandatory gap-4">
                            {bestsellers.map((product) => (
                                <div
                                    key={product.id}
                                    className="w-[82vw] min-w-[82vw] max-w-[340px] shrink-0 snap-start"
                                >
                                    {renderCard(product)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <Slider ref={sliderRef} {...settings} className="-mx-3">
                        {bestsellers.map((product) => (
                            <div key={product.id} className="px-3">
                                {renderCard(product)}
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}
