import { useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type WishlistItem = {
    slug: string;
};

export type CartItem = {
    slug: string;
    packId: string;
    packLabel: string;
    packSizeLabel: string;
    unitsPerPack: number;
    unitLabel: string;
    minPacks: number;
    tierLabel: string;
    unitPrice: number;
    packPrice: number;
    color?: string;
    quantity: number;
};

type AddToCartPayload = Omit<CartItem, "quantity"> & {
    quantity?: number;
};

export function useShop() {
    const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>(
        "vzuvachka-wishlist",
        []
    );

    const [cart, setCart] = useLocalStorage<CartItem[]>("vzuvachka-b2b-cart", []);

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

    const addToCart = ({
        slug,
        packId,
        packLabel,
        packSizeLabel,
        unitsPerPack,
        unitLabel,
        minPacks,
        tierLabel,
        unitPrice,
        packPrice,
        color,
        quantity = 1,
    }: AddToCartPayload) => {
        setCart((prev) => {
            const existing = prev.find(
                (item) =>
                    item.slug === slug &&
                    item.packId === packId &&
                    (item.color ?? "") === (color ?? "")
            );

            if (existing) {
                return prev.map((item) =>
                    item.slug === slug &&
                    item.packId === packId &&
                    (item.color ?? "") === (color ?? "")
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                            tierLabel,
                            unitPrice,
                            packPrice,
                            unitsPerPack,
                            unitLabel,
                            minPacks,
                            packLabel,
                            packSizeLabel,
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    slug,
                    packId,
                    packLabel,
                    packSizeLabel,
                    unitsPerPack,
                    unitLabel,
                    minPacks,
                    tierLabel,
                    unitPrice,
                    packPrice,
                    color,
                    quantity,
                },
            ];
        });
    };

    const removeFromCart = (slug: string, packId: string, color?: string) => {
        setCart((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.slug === slug &&
                        item.packId === packId &&
                        (item.color ?? "") === (color ?? "")
                    )
            )
        );
    };

    const updateCartItemQuantity = (
        slug: string,
        packId: string,
        quantity: number,
        color?: string
    ) => {
        if (quantity <= 0) {
            removeFromCart(slug, packId, color);
            return;
        }

        setCart((prev) =>
            prev.map((item) =>
                item.slug === slug &&
                item.packId === packId &&
                (item.color ?? "") === (color ?? "")
                    ? { ...item, quantity: Math.max(item.minPacks ?? 1, quantity) }
                    : item
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
