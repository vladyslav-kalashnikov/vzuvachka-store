import * as React from "react";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { useShop } from "../store/useShop";
import { PageLayout } from "./PageLayout";

export function SearchPage() {
    const { isInWishlist, toggleWishlist } = useShop();
    const [query, setQuery] = useState("");

    const filteredItems = useMemo(() => {
        const q = query.trim().toLowerCase();

        if (!q) return products;

        return products.filter((product) =>
            [product.name, product.type, product.description, product.details.join(" ")]
                .join(" ")
                .toLowerCase()
                .includes(q)
        );
    }, [query]);

    return (
        <PageLayout
            title="Пошук товарів"
            subtitle="Шукайте товари за назвою, типом або описом."
        >
            <section>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Наприклад: калоші, дитячі, робочі..."
                    className="mb-8 w-full border border-white/10 bg-[#111] px-5 py-4 text-white outline-none placeholder:text-gray-500"
                />

                <p className="mb-6 text-sm uppercase tracking-[0.2em] text-gray-500">
                    Знайдено товарів: {filteredItems.length}
                </p>

                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
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
