import { useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type WishlistItem = {
    slug: string;
};

export type CartItem = {
    slug: string;
    size: string;
    quantity: number;
};

export function useShop() {
    const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>(
        "vzuvachka-wishlist",
        []
    );

    const [cart, setCart] = useLocalStorage<CartItem[]>("vzuvachka-cart", []);

    const wishlistSlugs = useMemo(() => wishlist.map((item) => item.slug), [wishlist]);

    const isInWishlist = (slug: string) => wishlistSlugs.includes(slug);

    const toggleWishlist = (slug: string) => {
        setWishlist((prev) => {
            const exists = prev.some((item) => item.slug === slug);
            if (exists) {
                return prev.filter((item) => item.slug !== slug);
            }
            return [...prev, { slug }];
        });
    };

    const addToCart = (slug: string, size: string, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.slug === slug && item.size === size);

            if (existing) {
                return prev.map((item) =>
                    item.slug === slug && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { slug, size, quantity }];
        });
    };

    const removeFromCart = (slug: string, size: string) => {
        setCart((prev) => prev.filter((item) => !(item.slug === slug && item.size === size)));
    };

    const updateCartItemQuantity = (slug: string, size: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(slug, size);
            return;
        }

        setCart((prev) =>
            prev.map((item) =>
                item.slug === slug && item.size === size ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
        wishlist,
        cart,
        cartCount,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
    };
}