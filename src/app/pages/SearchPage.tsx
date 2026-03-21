import * as React from "react";
import { useMemo, useState } from "react";
import { PageLayout } from "./PageLayout";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../store/useShop";

export function SearchPage() {
    const { isInWishlist, toggleWishlist } = useShop();
    const [query, setQuery] = useState("");

    const filteredItems = useMemo(() => {
        const q = query.trim().toLowerCase();

        if (!q) return products;

        return products.filter((product) =>
            [product.name, product.type, product.description]
                .join(" ")
                .toLowerCase()
                .includes(q)
        );
    }, [query]);

    return (
        <PageLayout title="Пошук" subtitle="Знайди потрібну модель, тип або категорію.">
            <section>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Пошук товарів..."
                    className="mb-8 w-full border border-white/10 bg-[#111] px-5 py-4 text-white outline-none placeholder:text-gray-500"
                />

                <p className="mb-6 text-sm uppercase tracking-[0.2em] text-gray-500">
                    Знайдено: {filteredItems.length}
                </p>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredItems.map((product) => (
                        <ProductCard
                            key={product.slug}
                            product={product}
                            isInWishlist={isInWishlist(product.slug)}
                            onToggleWishlist={toggleWishlist}
                        />
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}