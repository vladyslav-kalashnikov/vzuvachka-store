import { supabase } from "../supabase";

export type AdminOrder = {
    id: number;
    order_number: string;
    customer_name: string;
    phone: string;
    email: string | null;
    city: string;
    branch: string;
    comment: string | null;
    total: number;
    status: string;
    created_at: string;
};

export type AdminOrderItem = {
    id: number;
    order_id: number;
    product_name: string;
    product_slug: string;
    selected_size: string | null;
    selected_color: string | null;
    quantity: number;
    price: number;
};

export async function fetchOrders() {
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as AdminOrder[];
}

export async function fetchOrderItems(orderId: number) {
    const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId)
        .order("id", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as AdminOrderItem[];
}

export async function updateOrderStatus(orderId: number, status: string) {
    const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

    if (error) throw new Error(error.message);
}