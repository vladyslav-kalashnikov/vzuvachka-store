import type { Product } from "../data/products";

export type B2BPackOption = {
    id: string;
    label: string;
    sizeLabel: string;
    description: string;
    unitsPerPack: number;
    unitLabel: string;
    minPacks: number;
    recommended?: boolean;
};

export type B2BPriceTier = {
    id: string;
    label: string;
    minPacks: number;
    discountPercent: number;
    unitPrice: number;
};

export type B2BProductProfile = {
    unitLabel: string;
    packOptions: B2BPackOption[];
    priceTiers: B2BPriceTier[];
    leadTimeLabel: string;
    assortmentRole: string;
    channels: string[];
    reorderNote: string;
};

export type B2BQuote = {
    pack: B2BPackOption;
    tier: B2BPriceTier;
    packs: number;
    totalUnits: number;
    unitPrice: number;
    packPrice: number;
    subtotal: number;
    listSubtotal: number;
    savings: number;
};

function roundPrice(value: number) {
    return Math.max(10, Math.round(value / 10) * 10);
}

function getAccessorySizeLabel(product: Product) {
    if (product.sizes.length === 1) return product.sizes[0];
    return `${product.sizes[0]} ... ${product.sizes[product.sizes.length - 1]}`;
}

function getCoreSizes(sizes: string[]) {
    if (sizes.length <= 6) return sizes;
    return sizes.slice(1, -1);
}

function getDiscounts(product: Product) {
    if (product.category.includes("accessories")) {
        return [
            { minPacks: 1, discountPercent: 0, label: "Старт" },
            { minPacks: 5, discountPercent: 8, label: "Полиця" },
            { minPacks: 10, discountPercent: 14, label: "Об'єм" },
        ];
    }

    if (product.category.includes("sale")) {
        return [
            { minPacks: 1, discountPercent: 3, label: "Архів" },
            { minPacks: 3, discountPercent: 8, label: "Швидкий розпродаж" },
            { minPacks: 6, discountPercent: 12, label: "Лот" },
        ];
    }

    if (product.category.includes("work")) {
        return [
            { minPacks: 1, discountPercent: 0, label: "Старт" },
            { minPacks: 3, discountPercent: 6, label: "Команда" },
            { minPacks: 6, discountPercent: 10, label: "Корпоративний обсяг" },
        ];
    }

    return [
        { minPacks: 1, discountPercent: 0, label: "Старт" },
        { minPacks: 3, discountPercent: 5, label: "Ріст" },
        { minPacks: 6, discountPercent: 9, label: "Об'єм" },
    ];
}

export function getB2BProductProfile(product: Product): B2BProductProfile {
    const isAccessory = product.category.includes("accessories");
    const unitLabel = isAccessory ? "од." : "пар";

    const packOptions: B2BPackOption[] = isAccessory
        ? [
            {
                id: "starter-box",
                label: "Старт-бокс",
                sizeLabel: getAccessorySizeLabel(product),
                description: "Тест полиці або перший запуск SKU.",
                unitsPerPack: 12,
                unitLabel,
                minPacks: 1,
                recommended: true,
            },
            {
                id: "shelf-box",
                label: "Поличний набір",
                sizeLabel: getAccessorySizeLabel(product),
                description: "Регулярна викладка для магазину чи маркетплейса.",
                unitsPerPack: 24,
                unitLabel,
                minPacks: 1,
            },
            {
                id: "bulk-case",
                label: "Об'ємний кейс",
                sizeLabel: getAccessorySizeLabel(product),
                description: "Для масштабних запусків і повторних поставок.",
                unitsPerPack: 48,
                unitLabel,
                minPacks: 2,
            },
        ]
        : [
            {
                id: "full-run",
                label: "Повна ростовка",
                sizeLabel: `${product.sizes[0]}-${product.sizes[product.sizes.length - 1]}`,
                description: "По одній парі на кожен розмір у лінійці.",
                unitsPerPack: product.sizes.length,
                unitLabel,
                minPacks: 1,
                recommended: product.category.includes("work"),
            },
            {
                id: "core-run",
                label: "Ходовий мікс",
                sizeLabel: `${getCoreSizes(product.sizes)[0]}-${getCoreSizes(product.sizes)[getCoreSizes(product.sizes).length - 1]}`,
                description: "Комбінація найходовіших розмірів для тесту сегмента.",
                unitsPerPack: getCoreSizes(product.sizes).length,
                unitLabel,
                minPacks: 1,
                recommended: !product.category.includes("work"),
            },
            {
                id: "custom-mix",
                label: "Індивідуальний мікс",
                sizeLabel: `${product.sizes[0]}-${product.sizes[product.sizes.length - 1]}`,
                description: "Погоджений розподіл розмірів під ваш канал продажу.",
                unitsPerPack: Math.max(4, Math.min(product.sizes.length, 6)),
                unitLabel,
                minPacks: 2,
            },
        ];

    const priceTiers = getDiscounts(product).map((tier) => ({
        id: tier.label.toLowerCase(),
        label: tier.label,
        minPacks: tier.minPacks,
        discountPercent: tier.discountPercent,
        unitPrice: roundPrice(product.price * (1 - tier.discountPercent / 100)),
    }));

    if (product.category.includes("work")) {
        return {
            unitLabel,
            packOptions,
            priceTiers,
            leadTimeLabel: "1-3 робочі дні після підтвердження",
            assortmentRole: "PRO / corporate",
            channels: ["виробництво", "склад", "HoReCa", "сервіс"],
            reorderNote: "Підходить для регулярних корпоративних догрузок.",
        };
    }

    if (product.category.includes("accessories")) {
        return {
            unitLabel,
            packOptions,
            priceTiers,
            leadTimeLabel: "1-2 робочі дні зі складу",
            assortmentRole: "add-on / margin",
            channels: ["допродаж", "маркетплейс", "полиця біля каси"],
            reorderNote: "Працює як маржинальний допродаж до основного взуття.",
        };
    }

    if (product.category.includes("kids")) {
        return {
            unitLabel,
            packOptions,
            priceTiers,
            leadTimeLabel: "1-3 робочі дні залежно від міксу",
            assortmentRole: "family / seasonal",
            channels: ["сімейний магазин", "регіональна мережа", "online"],
            reorderNote: "Добре заходить у сезонних хвилях і family-сегменті.",
        };
    }

    return {
        unitLabel,
        packOptions,
        priceTiers,
        leadTimeLabel: "1-3 робочі дні після погодження",
        assortmentRole: "traffic / core",
        channels: ["offline", "marketplace", "chain"],
        reorderNote: "Оптимально для старту сегмента й повторних дозамовлень.",
    };
}

export function getDefaultPackOption(product: Product) {
    const profile = getB2BProductProfile(product);
    return profile.packOptions.find((item) => item.recommended) ?? profile.packOptions[0];
}

export function getPackOption(product: Product, packId?: string | null) {
    const profile = getB2BProductProfile(product);
    return (
        profile.packOptions.find((item) => item.id === packId) ??
        getDefaultPackOption(product)
    );
}

export function getPriceTier(product: Product, packs: number) {
    const profile = getB2BProductProfile(product);
    return (
        [...profile.priceTiers]
            .reverse()
            .find((tier) => packs >= tier.minPacks) ?? profile.priceTiers[0]
    );
}

export function getB2BQuote(
    product: Product,
    packId: string | null | undefined,
    packs: number
): B2BQuote {
    const pack = getPackOption(product, packId);
    const normalizedPacks = Math.max(pack.minPacks, packs);
    const tier = getPriceTier(product, normalizedPacks);
    const unitPrice = tier.unitPrice;
    const packPrice = roundPrice(unitPrice * pack.unitsPerPack);
    const totalUnits = pack.unitsPerPack * normalizedPacks;
    const subtotal = packPrice * normalizedPacks;
    const listSubtotal = roundPrice(product.price * pack.unitsPerPack) * normalizedPacks;

    return {
        pack,
        tier,
        packs: normalizedPacks,
        totalUnits,
        unitPrice,
        packPrice,
        subtotal,
        listSubtotal,
        savings: Math.max(0, listSubtotal - subtotal),
    };
}

export function formatUnits(amount: number, unitLabel: string) {
    return `${amount} ${unitLabel}`;
}

export function formatPackLabel(pack: B2BPackOption) {
    return `${pack.label} • ${pack.sizeLabel} • ${pack.unitsPerPack} ${pack.unitLabel}/уп`;
}
