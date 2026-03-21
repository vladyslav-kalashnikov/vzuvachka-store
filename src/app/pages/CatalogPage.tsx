import * as React from "react";
import { useMemo, useState } from "react";
import { PageLayout } from "./PageLayout";
import { ProductCategory, getProductsByCategory } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../store/useShop";
import { CatalogFilters } from "../components/CatalogFilters";

const pageMeta: Record<
    ProductCategory,
    { title: string; subtitle: string }
> = {
    women: {
        title: "Жіноча колекція",
        subtitle: "Безкомпромісний стиль та захист від стихії.",
    },
    men: {
        title: "Чоловіча колекція",
        subtitle: "Утилітарність, витривалість і сильний характер.",
    },
    kids: {
        title: "Дитяче взуття",
        subtitle: "Максимальний захист для маленьких дослідників.",
    },
    work: {
        title: "ВЗУВАЧКА PRO™",
        subtitle: "Професійне екіпірування для складних умов.",
    },
    sale: {
        title: "Архів / Розпродаж",
        subtitle: "Лімітовані пропозиції та останні розміри.",
    },
    accessories: {
        title: "Устілки & Аксесуари",
        subtitle: "Додаткові елементи комфорту, догляду та щоденного використання.",
    },
};

type CatalogPageProps = {
    category: ProductCategory;
};

export function CatalogPage({ category }: CatalogPageProps) {
    const { isInWishlist, toggleWishlist } = useShop();
    const meta = pageMeta[category];
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
            <section>
                <div className="mb-8 flex items-center justify-between">
                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                        Товарів: {filteredItems.length}
                    </p>
                    <a
                        href="#wishlist"
                        className="text-sm font-bold uppercase tracking-[0.2em] text-red-500"
                    >
                        Wishlist
                    </a>
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