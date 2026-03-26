import { supabase } from "../supabase";

export type AdminProduct = {
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

export type AdminProductInput = {
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

export async function fetchAdminProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as AdminProduct[];
}

export async function createAdminProduct(payload: AdminProductInput) {
    const { data, error } = await supabase
        .from("products")
        .insert(payload)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data as AdminProduct;
}

export async function updateAdminProduct(id: number, payload: AdminProductInput) {
    const { data, error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data as AdminProduct;
}

export async function deleteAdminProduct(id: number) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error(error.message);
}