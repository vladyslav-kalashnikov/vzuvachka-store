import * as React from "react";
import { PageLayout } from "./PageLayout";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../store/useShop";

export function WishlistPage() {
    const { wishlist, isInWishlist, toggleWishlist } = useShop();

    const items = products.filter((product) =>
        wishlist.some((wish) => wish.slug === product.slug)
    );

    return (
        <PageLayout
            title="Wishlist"
            subtitle="Збережені товари, до яких можна повернутися пізніше."
        >
            {items.length === 0 ? (
                <section className="space-y-5">
                    <p>У wishlist поки немає товарів.</p>
                    <a
                        href="#page/men"
                        className="inline-flex border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white hover:border-red-500 hover:text-red-500"
                    >
                        Перейти в каталог
                    </a>
                </section>
            ) : (
                <section>
                    <div className="mb-8 flex items-center justify-between">
                        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                            Збережено: {items.length}
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {items.map((product) => (
                            <ProductCard
                                key={product.slug}
                                product={product}
                                isInWishlist={isInWishlist(product.slug)}
                                onToggleWishlist={toggleWishlist}
                            />
                        ))}
                    </div>
                </section>
            )}
        </PageLayout>
    );
}