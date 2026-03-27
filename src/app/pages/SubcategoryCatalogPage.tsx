import * as React from "react";
import { useMemo, useState } from "react";
import { CatalogFilters } from "../components/CatalogFilters";
import { ProductCard } from "../components/ProductCard";
import { subcategoryTitles } from "../data/b2bContent";
import { getProductsByCategoryAndSubcategory } from "../data/products";
import type { ProductCategory, ProductSubcategory } from "../data/products";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getManagedCategoryMeta } from "../lib/siteContent";
import { useShop } from "../store/useShop";
import { PageLayout } from "./PageLayout";

type Props = {
    category: ProductCategory;
    subcategory: ProductSubcategory;
};

export function SubcategoryCatalogPage({ category, subcategory }: Props) {
    const { isInWishlist, toggleWishlist } = useShop();
    const { settings } = useSiteSettings();
    const items = getProductsByCategoryAndSubcategory(category, subcategory);
    const categoryInfo = getManagedCategoryMeta(settings, category);

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
        <PageLayout
            title={subcategoryTitles[subcategory]}
            subtitle={`${categoryInfo.title} - окрема добірка товарів у цій категорії`}
        >
            <section className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                        Товарів у добірці: {filteredItems.length}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm font-bold uppercase tracking-[0.14em] sm:gap-4 sm:tracking-[0.2em]">
                        <a href={`#page/${category}`} className="text-white">
                            Увесь розділ
                        </a>
                        <a href="#wishlist" className="text-red-500">
                            Обране
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

                {filteredItems.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-8">
                        <p>У цій добірці поки немає товарів. Напишіть нам, якщо потрібна допомога з вибором.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3">
                        {filteredItems.map((product) => (
                            <ProductCard
                                key={product.slug}
                                product={product}
                                isInWishlist={isInWishlist(product.slug)}
                                onToggleWishlist={toggleWishlist}
                            />
                        ))}
                    </div>
                )}
            </section>
        </PageLayout>
    );
}
