import * as React from "react";
import { Search } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { PageLayout } from "./PageLayout";
import { useShop } from "../store/useShop";
import { supabase } from "../../lib/supabase";
import { Product } from "../data/products";

// Функція мапінгу з БД
function mapDbToProduct(dbItem: any): Product {
    return {
        id: dbItem.id, slug: dbItem.slug, name: dbItem.name, type: dbItem.type,
        description: dbItem.description, price: dbItem.price, oldPrice: dbItem.old_price,
        badge: dbItem.badge, image: dbItem.image, gallery: dbItem.gallery || [],
        category: dbItem.category || [], subcategory: dbItem.subcategory || [],
        sizes: dbItem.sizes || [], colors: dbItem.colors || [], details: dbItem.details || [],
        inStock: dbItem.in_stock,
    };
}

export function SearchPage() {
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(false);
    const { isInWishlist, toggleWishlist } = useShop();

    React.useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }
            setLoading(true);
            // Шукаємо по назві (ilike - регістронезалежний пошук)
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .ilike("name", `%${query}%`)
                .eq("in_stock", true)
                .limit(20);

            if (data && !error) setResults(data.map(mapDbToProduct));
            setLoading(false);
        }, 500); // 500мс затримка після вводу тексту
        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <PageLayout title="ПОШУК SKU" subtitle="Знайдіть потрібну модель за назвою або артикулом.">
            <section className="space-y-10">
                <div className="relative mx-auto max-w-2xl">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                        <Search className="h-6 w-6 text-gray-500" />
                    </div>
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Наприклад: Черевики зимові..."
                        className="tech-clip w-full border border-white/20 bg-black/40 py-5 pl-14 pr-5 text-lg text-white outline-none transition-colors focus:border-red-500 focus:bg-black"
                    />
                </div>

                {loading && <p className="text-center text-gray-500 uppercase font-black">Шукаємо в базі...</p>}

                {!loading && query && results.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-lg font-bold text-gray-400">За вашим запитом нічого не знайдено.</p>
                        <p className="mt-2 text-sm text-gray-500">Спробуйте змінити ключове слово.</p>
                    </div>
                )}

                {results.length > 0 && (
                    <div>
                        <p className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-500">
                            Знайдено моделей: <span className="text-white">{results.length}</span>
                        </p>
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                            {results.map((product) => (
                                <ProductCard
                                    key={product.slug}
                                    product={product}
                                    isInWishlist={isInWishlist(product.slug)}
                                    onToggleWishlist={toggleWishlist}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </PageLayout>
    );
}