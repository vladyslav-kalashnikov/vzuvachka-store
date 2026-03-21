import { supabase } from "../supabase";
import type { DbProduct } from "../types";

export async function fetchProducts(): Promise<DbProduct[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data as DbProduct[];
}

export async function fetchProductBySlug(slug: string): Promise<DbProduct | null> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data as DbProduct | null;
}

export async function fetchProductsByCategory(category: string): Promise<DbProduct[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .contains("category", [category])
        .order("id", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data as DbProduct[];
}

export async function fetchProductsByCategoryAndSubcategory(
    category: string,
    subcategory: string
): Promise<DbProduct[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .contains("category", [category])
        .contains("subcategory", [subcategory])
        .order("id", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data as DbProduct[];
}