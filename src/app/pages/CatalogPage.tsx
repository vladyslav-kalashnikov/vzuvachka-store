import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { ProductCategory, Product } from "../data/products";
import { CatalogFilters } from "../components/CatalogFilters";
import { ProductCard } from "../components/ProductCard";
import { PageLayout } from "./PageLayout";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getManagedCategoryMeta } from "../lib/siteContent";
import { useShop } from "../store/useShop";
import { supabase } from "../../lib/supabase"; // ПІДКЛЮЧЕНО БАЗУ ДАНИХ

type CatalogPageProps = {
    category: ProductCategory;
};

// Конвертація з БД в об'єкт сайту
function mapDbToProduct(dbItem: any): Product {
    return {
        id: dbItem.id,
        slug: dbItem.slug,
        name: dbItem.name,
        type: dbItem.type,
        description: dbItem.description,
        price: dbItem.price,
        oldPrice: dbItem.old_price,
        badge: dbItem.badge,
        image: dbItem.image,
        gallery: dbItem.gallery || [],
        category: dbItem.category || [],
        subcategory: dbItem.subcategory || [],
        sizes: dbItem.sizes || [],
        colors: dbItem.colors || [],
        details: dbItem.details || [],
        inStock: dbItem.in_stock,
    };
}

export function CatalogPage({ category }: CatalogPageProps) {
    const { isInWishlist, toggleWishlist } = useShop();
    const { settings } = useSiteSettings();
    const meta = getManagedCategoryMeta(settings, category);

    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [sortBy, setSortBy] = useState("default");

    // Завантаження товарів з бази
    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .contains("category", [category]) // Шукаємо категорію
                .eq("in_stock", true);            // Тільки активні

            if (data && !error) {
                setItems(data.map(mapDbToProduct));
            }
            setLoading(false);
        }
        loadProducts();
    }, [category]);

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
                        Товарів у розділі: {loading ? "..." : filteredItems.length}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm font-bold uppercase tracking-[0.14em] sm:gap-4 sm:tracking-[0.2em]">
                        <a href="#wishlist" className="text-white">Обране</a>
                        <a href="#cart" className="text-red-500">{meta.cta}</a>
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

                {loading ? (
                    <p className="text-gray-500 uppercase font-black text-center mt-10">Завантаження каталогу...</p>
                ) : filteredItems.length === 0 ? (
                    <p className="text-gray-500 uppercase font-black text-center mt-10">В цій категорії ще немає товарів.</p>
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
