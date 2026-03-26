import * as React from "react";
import { useMemo, useState } from "react";
import { ProductCategory, getProductsByCategory } from "../data/products";
import { categoryMeta } from "../data/b2bContent";
import { CatalogFilters } from "../components/CatalogFilters";
import { ProductCard } from "../components/ProductCard";
import { PageLayout } from "./PageLayout";
import { useShop } from "../store/useShop";

type CatalogPageProps = {
    category: ProductCategory;
};

export function CatalogPage({ category }: CatalogPageProps) {
    const { isInWishlist, toggleWishlist } = useShop();
    const meta = categoryMeta[category];
    const items = getProductsByCategory(category);

    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [sortBy, setSortBy] = useState("default");

    const allSizes = [...new Set(items.flatMap((item) => item.sizes))];
    const allColors = [...new Set(items.flatMap((item) => item.colors ?? []))];

    const filteredItems = useMemo(() => {
        let result = [...items];

        if (selectedSize) {
            result = result.filter((item) => item.sizes.includes(selectedSize));
        }

        if (selectedColor) {
            result = result.filter((item) => item.colors?.includes(selectedColor));
        }

        if (sortBy === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "name-asc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [items, selectedSize, selectedColor, sortBy]);

    return (
        <PageLayout title={meta.title} subtitle={meta.subtitle}>
            <section className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm leading-7 text-gray-300">{meta.tagline}</p>
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                        Товарів у розділі: {filteredItems.length}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-[0.2em]">
                        <a href="#wishlist" className="text-white">
                            Обране
                        </a>
                        <a href="#cart" className="text-red-500">
                            Заявка
                        </a>
                    </div>
                </div>

                <CatalogFilters
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                    sortBy={sortBy}
                    onSizeChange={setSelectedSize}
                    onColorChange={setSelectedColor}
                    onSortChange={setSortBy}
                    sizes={allSizes}
                    colors={allColors}
                />

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
