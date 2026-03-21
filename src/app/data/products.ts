export type ProductCategory =
    | "women"
    | "men"
    | "kids"
    | "work"
    | "sale"
    | "accessories";

export type ProductSubcategory =
    | "miski-kaloshi"
    | "sabo-ta-kroksy"
    | "domashni-tapochky"
    | "plazhni-shlopantsi"
    | "utepleni-modeli"
    | "rybalski-choboty"
    | "taktychni-kaloshi"
    | "vietnamky"
    | "dytiachi-cherevyky"
    | "dytiachi-tapochky"
    | "doshchovi-modeli"
    | "ustilky"
    | "shkarpetky"
    | "zasoby-dohliadu"
    | "sumky-ta-chokhly"
    | "robochi-kaloshi"
    | "robochi-sabo"
    | "antykovzki-modeli"
    | "dlia-vyrobnytstva";

export type Product = {
    id: number;
    slug: string;
    name: string;
    type: string;
    price: number;
    oldPrice?: number;
    badge?: string;
    image: string;
    gallery?: string[];
    category: ProductCategory[];
    subcategory: ProductSubcategory[];
    description: string;
    details: string[];
    sizes: string[];
    colors?: string[];
    isNew?: boolean;
    inStock?: boolean;
};

export const products: Product[] = [
    {
        id: 1,
        slug: "urban-armor",
        name: "URBAN ARMOR",
        type: "Міські калоші",
        price: 850,
        oldPrice: 990,
        badge: "БЕСТСЕЛЕР",
        image:
            "https://images.unsplash.com/photo-1520639887900-47120202dc7b?q=80&w=1200",
        gallery: [
            "https://images.unsplash.com/photo-1520639887900-47120202dc7b?q=80&w=1200",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200",
        ],
        category: ["women", "men", "sale"],
        subcategory: ["miski-kaloshi"],
        description:
            "Міська модель для дощу, мокрого асфальту та щоденного використання.",
        details: [
            "Водовідштовхувальний верх",
            "Легка EVA-підошва",
            "Підходять для міста та міжсезоння",
            "Швидке очищення від бруду",
        ],
        sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
        colors: ["Graphite", "Black", "Sand"],
        inStock: true,
    },
    {
        id: 2,
        slug: "pro-angler-500",
        name: "PRO-ANGLER 500",
        type: "Рибальські чоботи",
        price: 1200,
        badge: "WATERPROOF",
        image:
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200",
        gallery: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200",
            "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1200",
        ],
        category: ["men", "work"],
        subcategory: ["rybalski-choboty", "robochi-kaloshi"],
        description:
            "Посилені чоботи для складних умов, вологи, риболовлі та активного використання.",
        details: [
            "Глибокий протектор",
            "Стійкість до вологи",
            "Посилена п'яткова зона",
            "Комфорт для тривалого носіння",
        ],
        sizes: ["40", "41", "42", "43", "44", "45"],
        colors: ["Black", "Olive"],
        inStock: true,
    },
    {
        id: 3,
        slug: "cozy-fleece",
        name: "COZY FLEECE",
        type: "Домашні тапочки",
        price: 650,
        image:
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200",
        category: ["women", "kids", "sale"],
        subcategory: ["domashni-tapochky", "dytiachi-tapochky"],
        description: "М’які утеплені тапочки для дому та комфорту.",
        details: [
            "М'який утеплювач",
            "Комфортна посадка",
            "Легка вага",
            "Тепло всередині",
        ],
        sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38"],
        colors: ["Cream", "Gray"],
        inStock: true,
    },
    {
        id: 4,
        slug: "winter-gum",
        name: "WINTER GUM",
        type: "Утеплені калоші",
        price: 950,
        badge: "NEW",
        image:
            "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1200",
        category: ["women", "men", "work"],
        subcategory: ["utepleni-modeli"],
        description:
            "Тепла модель для мокрої та холодної погоди з фокусом на захист і стабільність.",
        details: [
            "Утеплена внутрішня частина",
            "Стійкість до вологи",
            "Антиковзка підошва",
            "Для холодного сезону",
        ],
        sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
        colors: ["Black", "Red"],
        inStock: true,
    },
    {
        id: 5,
        slug: "aqua-slide",
        name: "AQUA SLIDE",
        type: "Шльопанці",
        price: 500,
        image:
            "https://images.unsplash.com/photo-1628033649931-7e3e9d82a177?q=80&w=1200",
        category: ["women", "sale"],
        subcategory: ["sabo-ta-kroksy", "plazhni-shlopantsi"],
        description: "Легка модель для літа, басейну та відпочинку.",
        details: [
            "Легка EVA-піна",
            "Швидке висихання",
            "Для басейну та відпочинку",
            "Комфортна підошва",
        ],
        sizes: ["36", "37", "38", "39", "40", "41", "42"],
        colors: ["Black", "White", "Blue"],
        inStock: true,
    },
    {
        id: 6,
        slug: "summer-flip",
        name: "SUMMER FLIP",
        type: "В'єтнамки",
        price: 350,
        image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
        category: ["men", "sale"],
        subcategory: ["vietnamky"],
        description: "Базова літня модель для пляжу та повсякденного використання.",
        details: [
            "Гнучка підошва",
            "Легка вага",
            "Для літа та відпочинку",
            "Проста посадка",
        ],
        sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
        colors: ["Black", "Orange"],
        inStock: true,
    },
    {
        id: 7,
        slug: "mini-explorer",
        name: "MINI EXPLORER",
        type: "Дитячі черевики",
        price: 780,
        badge: "KIDS",
        image:
            "https://images.unsplash.com/photo-1514090259040-e221375dcb01?q=80&w=1200",
        category: ["kids"],
        subcategory: ["dytiachi-cherevyky", "doshchovi-modeli"],
        description:
            "Дитяча пара для активного руху, прогулянок і вологої погоди.",
        details: [
            "Легка підошва",
            "Зручна фіксація",
            "Захист від вологи",
            "Для щоденного використання",
        ],
        sizes: ["28", "29", "30", "31", "32", "33", "34", "35"],
        colors: ["Yellow", "Blue"],
        inStock: true,
    },
    {
        id: 8,
        slug: "work-grip-x",
        name: "WORK GRIP X",
        type: "Робоче взуття",
        price: 1450,
        badge: "PRO",
        image:
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200",
        category: ["work"],
        subcategory: ["antykovzki-modeli", "dlia-vyrobnytstva"],
        description:
            "Професійна модель для тривалих змін, слизьких поверхонь та інтенсивних навантажень.",
        details: [
            "Посилений протектор",
            "Антиковзка підошва",
            "Підвищена зносостійкість",
            "Комфорт на довгу зміну",
        ],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        colors: ["Black", "Gray"],
        inStock: true,
    },
    {
        id: 9,
        slug: "comfort-insole-pro",
        name: "COMFORT INSOLE PRO",
        type: "Устілки",
        price: 390,
        badge: "NEW",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",
        category: ["accessories"],
        subcategory: ["ustilky"],
        description:
            "Амортизаційні устілки для щоденного комфорту, довгих маршрутів і роботи.",
        details: [
            "М’яка підтримка стопи",
            "Додаткова амортизація",
            "Підходять для щоденного носіння",
            "Легко обрізаються під потрібний розмір",
        ],
        sizes: ["36-37", "38-39", "40-41", "42-43", "44-45"],
        colors: ["Black"],
        inStock: true,
    },
    {
        id: 10,
        slug: "thermal-socks-core",
        name: "THERMAL SOCKS CORE",
        type: "Шкарпетки",
        price: 250,
        image:
            "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1200",
        category: ["accessories"],
        subcategory: ["shkarpetky"],
        description:
            "Базові функціональні шкарпетки для міста, холодної погоди та активного руху.",
        details: [
            "Щільна посадка",
            "Комфортний матеріал",
            "Для щоденного використання",
            "Підходять під робоче й міське взуття",
        ],
        sizes: ["36-39", "40-43", "44-46"],
        colors: ["Black", "Gray"],
        inStock: true,
    },
    {
        id: 11,
        slug: "clean-care-kit",
        name: "CLEAN & CARE KIT",
        type: "Засіб догляду",
        price: 520,
        badge: "CARE",
        image:
            "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1200",
        category: ["accessories"],
        subcategory: ["zasoby-dohliadu"],
        description: "Набір для очищення та догляду за взуттям і аксесуарами.",
        details: [
            "Очищення поверхні",
            "Догляд за матеріалами",
            "Зручний формат набору",
            "Для регулярного використання",
        ],
        sizes: ["ONE SIZE"],
        colors: ["Black"],
        inStock: true,
    },
    {
        id: 12,
        slug: "utility-bag-mini",
        name: "UTILITY BAG MINI",
        type: "Аксесуар",
        price: 690,
        image:
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200",
        category: ["accessories"],
        subcategory: ["sumky-ta-chokhly"],
        description:
            "Компактний аксесуар для зберігання дрібниць, засобів догляду або спорядження.",
        details: [
            "Компактний формат",
            "Міцний матеріал",
            "Зручне зберігання",
            "Утилітарний стиль",
        ],
        sizes: ["ONE SIZE"],
        colors: ["Black", "Olive"],
        inStock: true,
    },
];

export function formatPrice(price: number) {
    return `${price.toLocaleString("uk-UA")} ₴`;
}

export function getProductBySlug(slug: string) {
    return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory) {
    return products.filter((product) => product.category.includes(category));
}

export function getProductsByCategoryAndSubcategory(
    category: ProductCategory,
    subcategory: ProductSubcategory
) {
    return products.filter(
        (product) =>
            product.category.includes(category) &&
            product.subcategory.includes(subcategory)
    );
}