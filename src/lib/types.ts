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
    created_at: string;
};

export type CheckoutCustomer = {
    customerName: string;
    phone: string;
    email?: string;
    city: string;
    branch: string;
    comment?: string;
};

export type CheckoutCartItem = {
    productId: number;
    productSlug: string;
    productName: string;
    price: number;
    selectedSize?: string;
    selectedColor?: string;
    quantity: number;
};

export type CreateOrderPayload = {
    customer: CheckoutCustomer;
    items: CheckoutCartItem[];
};