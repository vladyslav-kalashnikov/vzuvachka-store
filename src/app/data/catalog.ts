import type { ProductCategory, ProductSubcategory } from "./products";

export type CatalogMenuItem = {
    label: string;
    href: string;
    category: ProductCategory;
    subcategories: {
        label: string;
        subcategory: ProductSubcategory;
        href: string;
    }[];
};

export const catalogMenu: CatalogMenuItem[] = [
    {
        label: "Жінкам",
        href: "#page/women",
        category: "women",
        subcategories: [
            { label: "Міські калоші", subcategory: "miski-kaloshi", href: "#catalog/women/miski-kaloshi" },
            { label: "Сабо та крокси", subcategory: "sabo-ta-kroksy", href: "#catalog/women/sabo-ta-kroksy" },
            { label: "Домашні тапочки", subcategory: "domashni-tapochky", href: "#catalog/women/domashni-tapochky" },
            { label: "Пляжні шльопанці", subcategory: "plazhni-shlopantsi", href: "#catalog/women/plazhni-shlopantsi" },
            { label: "Утеплені моделі", subcategory: "utepleni-modeli", href: "#catalog/women/utepleni-modeli" },
        ],
    },
    {
        label: "Чоловікам",
        href: "#page/men",
        category: "men",
        subcategories: [
            { label: "Рибальські чоботи", subcategory: "rybalski-choboty", href: "#catalog/men/rybalski-choboty" },
            { label: "Тактичні калоші", subcategory: "taktychni-kaloshi", href: "#catalog/men/taktychni-kaloshi" },
            { label: "Домашні тапочки", subcategory: "domashni-tapochky", href: "#catalog/men/domashni-tapochky" },
            { label: "В'єтнамки", subcategory: "vietnamky", href: "#catalog/men/vietnamky" },
            { label: "Утеплені моделі", subcategory: "utepleni-modeli", href: "#catalog/men/utepleni-modeli" },
        ],
    },
    {
        label: "Дітям",
        href: "#page/kids",
        category: "kids",
        subcategories: [
            { label: "Дитячі черевики", subcategory: "dytiachi-cherevyky", href: "#catalog/kids/dytiachi-cherevyky" },
            { label: "Дитячі тапочки", subcategory: "dytiachi-tapochky", href: "#catalog/kids/dytiachi-tapochky" },
            { label: "Дощові моделі", subcategory: "doshchovi-modeli", href: "#catalog/kids/doshchovi-modeli" },
        ],
    },
    {
        label: "Устілки & Аксесуари",
        href: "#page/accessories",
        category: "accessories",
        subcategories: [
            { label: "Устілки", subcategory: "ustilky", href: "#catalog/accessories/ustilky" },
            { label: "Шкарпетки", subcategory: "shkarpetky", href: "#catalog/accessories/shkarpetky" },
            { label: "Засоби догляду", subcategory: "zasoby-dohliadu", href: "#catalog/accessories/zasoby-dohliadu" },
            { label: "Сумки та чохли", subcategory: "sumky-ta-chokhly", href: "#catalog/accessories/sumky-ta-chokhly" },
        ],
    },
    {
        label: "ВЗУВАЧКА PRO™",
        href: "#page/work",
        category: "work",
        subcategories: [
            { label: "Робочі калоші", subcategory: "robochi-kaloshi", href: "#catalog/work/robochi-kaloshi" },
            { label: "Робочі сабо", subcategory: "robochi-sabo", href: "#catalog/work/robochi-sabo" },
            { label: "Антиковзкі моделі", subcategory: "antykovzki-modeli", href: "#catalog/work/antykovzki-modeli" },
            { label: "Для виробництва", subcategory: "dlia-vyrobnytstva", href: "#catalog/work/dlia-vyrobnytstva" },
        ],
    },
];