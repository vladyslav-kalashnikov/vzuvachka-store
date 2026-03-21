import { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import * as React from "react";
import { products, formatPrice } from "../data/products";
import { useShop } from "../store/useShop";

export function Bestsellers() {
  const sliderRef = useRef<Slider>(null);
  const { isInWishlist, toggleWishlist } = useShop();

  const bestsellers = products.slice(0, 6);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
      <section id="bestsellers" className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
              Топ{" "}
              <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px white" }}
              >
              продажів
            </span>
            </h2>

            <div className="flex gap-2">
              <button
                  onClick={() => sliderRef.current?.slickPrev()}
                  className="flex h-10 w-10 items-center justify-center bg-zinc-900 text-white transition-colors hover:bg-red-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                  onClick={() => sliderRef.current?.slickNext()}
                  className="flex h-10 w-10 items-center justify-center bg-zinc-900 text-white transition-colors hover:bg-red-600"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <Slider ref={sliderRef} {...settings} className="-mx-3">
            {bestsellers.map((product) => (
                <div key={product.id} className="px-3">
                  <article className="group relative border border-white/5 bg-[#111] p-4 transition-all hover:border-white/20">
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
                    >
                      <Heart className="h-4 w-4" />
                    </button>

                    <a href={`#product/${product.slug}`}>
                      <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden bg-black p-6">
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
                        <h3 className="mb-4 text-lg font-black uppercase tracking-tight text-white hover:text-red-500">
                          {product.name}
                        </h3>
                      </a>

                      <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono font-bold text-white">
                      {formatPrice(product.price)}
                    </span>

                        <a
                            href={`#product/${product.slug}`}
                            className="border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:text-red-500"
                        >
                          Деталі
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
            ))}
          </Slider>
        </div>
      </section>
  );
}