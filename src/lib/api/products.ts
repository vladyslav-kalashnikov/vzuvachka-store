import { supabase } from "../supabase";

export type DbProduct = {
    id: number;
    slug: string;
    name: string;
    type: string;
    description: string;
    price: number;
    old_price: number | null;
    badge: string | null;
    image: string;
    gallery: string[];
    category: string[];
    subcategory: string[];
    sizes: string[];
    colors: string[];
    details: string[];
    in_stock: boolean;
};

export async function fetchProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as DbProduct[];
}

export async function fetchProductBySlug(slug: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (error) throw new Error(error.message);
    return data as DbProduct | null;
}

export async function fetchProductsByCategory(category: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .contains("category", [category])
        .order("id", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as DbProduct[];
}

export async function fetchProductsByCategoryAndSubcategory(
    category: string,
    subcategory: string
) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .contains("category", [category])
        .contains("subcategory", [subcategory])
        .order("id", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as DbProduct[];
}