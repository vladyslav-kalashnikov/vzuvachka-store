import { supabase } from "../supabase";
import type { CreateOrderPayload } from "../types";

export async function createOrder(payload: CreateOrderPayload) {
    if (!payload.items.length) {
        throw new Error("Cart is empty");
    }

    const total = payload.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const { data: orderRow, error: orderError } = await supabase
        .from("orders")
        .insert({
            customer_name: payload.customer.customerName,
            phone: payload.customer.phone,
            email: payload.customer.email ?? null,
            city: payload.customer.city,
            branch: payload.customer.branch,
            comment: payload.customer.comment ?? null,
            total,
        })
        .select("id, order_number")
        .single();

    if (orderError) {
        throw new Error(orderError.message);
    }

    const orderItems = payload.items.map((item) => ({
        order_id: orderRow.id,
        product_id: null,
        product_name: item.productName,
        product_slug: item.productSlug,
        selected_size: item.selectedSize ?? null,
        selected_color: item.selectedColor ?? null,
        quantity: item.quantity,
        price: item.price,
    }));

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

    if (itemsError) {
        throw new Error(itemsError.message);
    }

    return orderRow;
}