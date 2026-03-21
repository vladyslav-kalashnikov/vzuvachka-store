import * as React from "react";
import { useMemo, useState } from "react";
import { PageLayout } from "./PageLayout";
import { getProductsByCategoryAndSubcategory } from "../data/products";
import type { ProductCategory, ProductSubcategory } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../store/useShop";
import { CatalogFilters } from "../components/CatalogFilters";

const subcategoryTitles: Record<ProductSubcategory, string> = {
    "miski-kaloshi": "Міські калоші",
    "sabo-ta-kroksy": "Сабо та крокси",
    "domashni-tapochky": "Домашні тапочки",
    "plazhni-shlopantsi": "Пляжні шльопанці",
    "utepleni-modeli": "Утеплені моделі",
    "rybalski-choboty": "Рибальські чоботи",
    "taktychni-kaloshi": "Тактичні калоші",
    "vietnamky": "В'єтнамки",
    "dytiachi-cherevyky": "Дитячі черевики",
    "dytiachi-tapochky": "Дитячі тапочки",
    "doshchovi-modeli": "Дощові моделі",
    "ustilky": "Устілки",
    "shkarpetky": "Шкарпетки",
    "zasoby-dohliadu": "Засоби догляду",
    "sumky-ta-chokhly": "Сумки та чохли",
    "robochi-kaloshi": "Робочі калоші",
    "robochi-sabo": "Робочі сабо",
    "antykovzki-modeli": "Антиковзкі моделі",
    "dlia-vyrobnytstva": "Для виробництва",
};

type Props = {
    category: ProductCategory;
    subcategory: ProductSubcategory;
};

export function SubcategoryCatalogPage({ category, subcategory }: Props) {
    const { isInWishlist, toggleWishlist } = useShop();
    const items = getProductsByCategoryAndSubcategory(category, subcategory);

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
            subtitle={`Каталог: ${category.toUpperCase()} // відібрані товари по підкатегорії`}
        >
            <section>
                <div className="mb-8 flex items-center justify-between">
                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                        Товарів: {filteredItems.length}
                    </p>

                    <div className="flex gap-4">
                        <a
                            href={`#page/${category}`}
                            className="text-sm font-bold uppercase tracking-[0.2em] text-white"
                        >
                            Вся категорія
                        </a>
                        <a
                            href="#wishlist"
                            className="text-sm font-bold uppercase tracking-[0.2em] text-red-500"
                        >
                            Wishlist
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
                        <p>У цій підкатегорії поки немає товарів.</p>
                    </div>
                ) : (
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
                )}
            </section>
        </PageLayout>
    );
}