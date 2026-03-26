import type { ProductCategory, ProductSubcategory } from "./products";

export const partnerContact = {
    email: "b2b@vzuvachka.ua",
    phone: "+380 (93) 975 38 37",
    phoneHref: "tel:+380939753837",
    emailHref: "mailto:b2b@vzuvachka.ua",
    address: "м. Хмельницький, вул. Водопровідна 75/1",
    hours: "Пн-Пт 09:00-19:00",
};

export const subcategoryTitles: Record<ProductSubcategory, string> = {
    "miski-kaloshi": "Міські калоші",
    "sabo-ta-kroksy": "Сабо та крокси",
    "domashni-tapochky": "Домашні тапочки",
    "plazhni-shlopantsi": "Пляжні шльопанці",
    "utepleni-modeli": "Утеплені моделі",
    "rybalski-choboty": "Рибальські чоботи",
    "taktychni-kaloshi": "Тактичні калоші",
    "vietnamky": "В'єтнамки",
    "dytiachi-cherevyky": "Дитячі черевики",
    "dytiachi-tapochky": "Дитячі тапочки",
    "doshchovi-modeli": "Дощові моделі",
    "ustilky": "Устілки",
    "shkarpetky": "Шкарпетки",
    "zasoby-dohliadu": "Засоби догляду",
    "sumky-ta-chokhly": "Сумки та чохли",
    "robochi-kaloshi": "Робочі калоші",
    "robochi-sabo": "Робочі сабо",
    "antykovzki-modeli": "Антиковзкі моделі",
    "dlia-vyrobnytstva": "Для виробництва",
};

export const categoryMeta: Record<
    ProductCategory,
    {
        title: string;
        subtitle: string;
        tagline: string;
        cta: string;
    }
> = {
    women: {
        title: "Жіноче взуття",
        subtitle: "Зручні моделі для щоденного продажу: місто, дім, сезонний попит.",
        tagline: "Добірка товарів, з яких легко почати продажі.",
        cta: "Подивитися товари",
    },
    men: {
        title: "Чоловіче взуття",
        subtitle: "Практичні моделі для роботи, риболовлі та щоденного використання.",
        tagline: "Прості й зрозумілі товари зі стабільним попитом.",
        cta: "Перейти в каталог",
    },
    kids: {
        title: "Дитячий сегмент",
        subtitle: "Легкі та зносостійкі моделі для школи, прогулянок і міжсезоння.",
        tagline: "Товари, які легко додати в сімейний асортимент.",
        cta: "Подивитися дитяче",
    },
    work: {
        title: "Робоче взуття",
        subtitle: "Моделі для складу, виробництва, сервісу та щоденної роботи.",
        tagline: "Надійні товари для команд і великих замовлень.",
        cta: "Дізнатися умови",
    },
    sale: {
        title: "Складські лоти",
        subtitle: "Залишки, сезонні моделі та товари, які можна швидко замовити.",
        tagline: "Зручний розділ для акцій, тесту нових товарів і швидкого поповнення.",
        cta: "Подивитися наявність",
    },
    accessories: {
        title: "Аксесуари та догляд",
        subtitle: "Устілки, шкарпетки, догляд і дрібні товари, які доповнюють основну покупку.",
        tagline: "Корисні дрібниці, які добре продаються разом із взуттям.",
        cta: "Додати в асортимент",
    },
};

export const categorySections: Array<{
    key: ProductCategory;
    label: string;
    shortLabel: string;
    href: string;
    badge: string;
    description: string;
    subcategories: Array<{ slug: ProductSubcategory; label: string }>;
}> = [
    {
        key: "women",
        label: "Жіноче взуття",
        shortLabel: "Жіноче",
        href: "#page/women",
        badge: "ЖІНОЧЕ",
        description: "Моделі для міста, дому та щоденного використання.",
        subcategories: [
            { slug: "miski-kaloshi", label: "Міські калоші" },
            { slug: "sabo-ta-kroksy", label: "Сабо та крокси" },
            { slug: "domashni-tapochky", label: "Домашні тапочки" },
            { slug: "plazhni-shlopantsi", label: "Пляжні шльопанці" },
            { slug: "utepleni-modeli", label: "Утеплені моделі" },
        ],
    },
    {
        key: "men",
        label: "Чоловіче взуття",
        shortLabel: "Чоловіче",
        href: "#page/men",
        badge: "ЧОЛОВІЧЕ",
        description: "Практичні моделі для роботи, відпочинку й риболовлі.",
        subcategories: [
            { slug: "rybalski-choboty", label: "Рибальські чоботи" },
            { slug: "taktychni-kaloshi", label: "Тактичні калоші" },
            { slug: "domashni-tapochky", label: "Домашні тапочки" },
            { slug: "vietnamky", label: "В'єтнамки" },
            { slug: "utepleni-modeli", label: "Утеплені моделі" },
        ],
    },
    {
        key: "kids",
        label: "Дитячий сегмент",
        shortLabel: "Дитяче",
        href: "#page/kids",
        badge: "ДИТЯЧЕ",
        description: "Зручні моделі для дітей на кожен день.",
        subcategories: [
            { slug: "dytiachi-cherevyky", label: "Дитячі черевики" },
            { slug: "dytiachi-tapochky", label: "Дитячі тапочки" },
            { slug: "doshchovi-modeli", label: "Дощові моделі" },
        ],
    },
    {
        key: "work",
        label: "Робоче взуття",
        shortLabel: "Робоче",
        href: "#page/work",
        badge: "РОБОТА",
        description: "Моделі для складу, виробництва та щоденної роботи.",
        subcategories: [
            { slug: "robochi-kaloshi", label: "Робочі калоші" },
            { slug: "robochi-sabo", label: "Робочі сабо" },
            { slug: "antykovzki-modeli", label: "Антиковзкі моделі" },
            { slug: "dlia-vyrobnytstva", label: "Для виробництва" },
        ],
    },
    {
        key: "accessories",
        label: "Аксесуари та догляд",
        shortLabel: "Аксесуари",
        href: "#page/accessories",
        badge: "АКСЕСУАРИ",
        description: "Устілки, шкарпетки та засоби догляду.",
        subcategories: [
            { slug: "ustilky", label: "Устілки" },
            { slug: "shkarpetky", label: "Шкарпетки" },
            { slug: "zasoby-dohliadu", label: "Засоби догляду" },
            { slug: "sumky-ta-chokhly", label: "Сумки та чохли" },
        ],
    },
];

export const infoLinks = [
    { href: "#page/wholesale", label: "Умови співпраці" },
    { href: "#page/shipping", label: "Умови поставки" },
    { href: "#page/returns", label: "Рекламації та повернення" },
    { href: "#page/faq", label: "Поширені питання" },
    { href: "#page/contact", label: "Контакти" },
    { href: "#page/club", label: "Партнерська програма" },
    { href: "#page/about", label: "Про нас" },
    { href: "#page/careers", label: "Команда та вакансії" },
];

export const adminLinks = [
    { href: "#page/admin-orders", label: "Ліди й заявки" },
    { href: "#page/admin-products", label: "SKU і каталог" },
    { href: "#page/admin-site-settings", label: "Контент і вітрина" },
];
