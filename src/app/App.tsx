import * as React from "react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { Categories } from "./components/Categories";
import { Bestsellers } from "./components/Bestsellers";
import { CollabSection } from "./components/CollabSection";
import { WhyChoose } from "./components/WhyChoose";
import { Reviews } from "./components/Reviews";
import { SubscribeSection } from "./components/SubscribeSection";
import { Footer } from "./components/Footer";
import { AdminRouteGuard } from "./components/AdminRouteGuard";

// Сторінки
import { About } from "./pages/About";
import { Careers } from "./pages/Careers";
import { Shipping } from "./pages/Shipping";
import { Returns } from "./pages/Returns";
import { Faq } from "./pages/Faq";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Sitemap } from "./pages/Sitemap";
import { Club } from "./pages/Club";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { WishlistPage } from "./pages/WishlistPage";
import { SubcategoryCatalogPage } from "./pages/SubcategoryCatalogPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { SearchPage } from "./pages/SearchPage";
import { SizeGuide } from "./pages/SizeGuide";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { categoryMeta, partnerContact, subcategoryTitles } from "./data/b2bContent";
import { getProductBySlug, type ProductCategory, type ProductSubcategory } from "./data/products";
import { AdminOrdersPage } from "./pages/AdminOrdersPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { UpdatePasswordPage } from "./pages/UpdatePasswordPage";
import { AdminProductsPage } from "./pages/AdminProductsPage";
import { AdminSiteSettingsPage } from "./pages/AdminSiteSettingsPage";
import { WholesalePage } from "./pages/WholesalePage";

type RouteState =
    | { type: "home"; anchor?: string | null }
    | { type: "page"; slug: string }
    | { type: "product"; slug: string }
    | { type: "wishlist" }
    | { type: "cart" }
    | { type: "checkout" }
    | { type: "search" }
    | { type: "order-success" }
    | { type: "catalog"; category: ProductCategory; subcategory: ProductSubcategory };

type PageMeta = {
    title: string;
    description: string;
    robots: string;
    openGraphType: "website" | "product";
    structuredData?: Record<string, unknown>;
};

const SITE_NAME = "ВЗУВАЧКА B2B";
const DEFAULT_DESCRIPTION =
    "B2B-платформа для wholesale-каталогу, заявок партнерів, оптових SKU та керування контентом.";
const SITE_URL = String(import.meta.env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");

function parseHash(hash: string): RouteState {
    const cleanHash = hash.replace(/^#\/?/, "").trim();

    if (!cleanHash || cleanHash === "/" || cleanHash === "home") {
        return { type: "home", anchor: "home" };
    }

    if (cleanHash === "wishlist") return { type: "wishlist" };
    if (cleanHash === "cart") return { type: "cart" };
    if (cleanHash === "checkout") return { type: "checkout" };
    if (cleanHash === "search") return { type: "search" };
    if (cleanHash === "order-success") return { type: "order-success" };

    if (cleanHash.startsWith("page/")) {
        return { type: "page", slug: cleanHash.replace("page/", "") };
    }

    if (cleanHash.startsWith("product/")) {
        return { type: "product", slug: cleanHash.replace("product/", "") };
    }

    if (cleanHash.startsWith("catalog/")) {
        const parts = cleanHash.split("/");
        const category = parts[1] as ProductCategory | undefined;
        const subcategory = parts[2] as ProductSubcategory | undefined;

        if (category && subcategory) {
            return { type: "catalog", category, subcategory };
        }
    }

    return { type: "home", anchor: cleanHash };
}

function withSiteName(title: string) {
    return title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
}

function createHomeStructuredData() {
    const organization: Record<string, unknown> = {
        "@type": "Organization",
        name: SITE_NAME,
        email: partnerContact.email,
        telephone: partnerContact.phone,
        contactPoint: [
            {
                "@type": "ContactPoint",
                contactType: "sales",
                email: partnerContact.email,
                telephone: partnerContact.phone,
                availableLanguage: ["uk", "ru"],
            },
        ],
    };

    const webSite: Record<string, unknown> = {
        "@type": "WebSite",
        name: SITE_NAME,
        inLanguage: "uk-UA",
    };

    if (SITE_URL) {
        organization.url = SITE_URL;
        webSite.url = SITE_URL;
    }

    return {
        "@context": "https://schema.org",
        "@graph": [organization, webSite],
    };
}

function getPageMeta(route: RouteState): PageMeta {
    const indexable = "index, follow";
    const noindex = "noindex, nofollow";

    if (route.type === "home") {
        return {
            title: SITE_NAME,
            description:
                "Оптова B2B-вітрина ВЗУВАЧКА для каталогу SKU, заявок, прайсів і роботи з партнерськими закупівлями.",
            robots: indexable,
            openGraphType: "website",
            structuredData: createHomeStructuredData(),
        };
    }

    if (route.type === "wishlist") {
        return {
            title: withSiteName("Шортлист партнера"),
            description: "Збережені SKU для формування оптової матриці та наступних замовлень.",
            robots: noindex,
            openGraphType: "website",
        };
    }

    if (route.type === "cart") {
        return {
            title: withSiteName("B2B-заявка"),
            description: "Кошик і попередня матриця для оптової заявки партнера.",
            robots: noindex,
            openGraphType: "website",
        };
    }

    if (route.type === "checkout") {
        return {
            title: withSiteName("Оформлення B2B-запиту"),
            description: "Оформлення партнерської заявки, контактів і логістичних деталей.",
            robots: noindex,
            openGraphType: "website",
        };
    }

    if (route.type === "search") {
        return {
            title: withSiteName("Пошук по SKU"),
            description: "Пошук товарів і SKU у wholesale-каталозі.",
            robots: noindex,
            openGraphType: "website",
        };
    }

    if (route.type === "order-success") {
        return {
            title: withSiteName("B2B-запит отримано"),
            description: "Сторінка підтвердження відправленої wholesale-заявки.",
            robots: noindex,
            openGraphType: "website",
        };
    }

    if (route.type === "product") {
        const product = getProductBySlug(route.slug);

        if (!product) {
            return {
                title: withSiteName("SKU не знайдено"),
                description: "Модель відсутня або недоступна в поточному оптовому каталозі.",
                robots: noindex,
                openGraphType: "website",
            };
        }

        return {
            title: withSiteName(product.name),
            description: product.description,
            robots: indexable,
            openGraphType: "product",
        };
    }

    if (route.type === "catalog") {
        const category = categoryMeta[route.category];
        const subcategory = subcategoryTitles[route.subcategory];

        return {
            title: withSiteName(`${subcategory} - ${category.title}`),
            description: category.subtitle,
            robots: indexable,
            openGraphType: "website",
        };
    }

    if (route.type === "page") {
        if (route.slug in categoryMeta) {
            const category = categoryMeta[route.slug as ProductCategory];

            return {
                title: withSiteName(category.title),
                description: category.subtitle,
                robots: indexable,
                openGraphType: "website",
            };
        }

        switch (route.slug) {
            case "about":
                return {
                    title: withSiteName("Про ВЗУВАЧКУ B2B"),
                    description:
                        "Історія бренду, позиціонування та формат співпраці для оптових партнерів.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "careers":
                return {
                    title: withSiteName("Команда та вакансії"),
                    description: "Відкриті ролі та напрямки розвитку B2B-команди ВЗУВАЧКА.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "shipping":
                return {
                    title: withSiteName("Умови поставки"),
                    description: "Логістика, відвантаження, строки й правила поставки для B2B-партнерів.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "returns":
                return {
                    title: withSiteName("Рекламації та повернення"),
                    description: "Порядок рекламацій, повернень і вирішення сервісних питань.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "faq":
                return {
                    title: withSiteName("FAQ для партнерів"),
                    description: "Поширені питання про прайси, матриці, поставки та співпрацю.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "contact":
                return {
                    title: withSiteName("B2B-контакти"),
                    description: "Контакти менеджера, пошта, телефон і канал для wholesale-заявок.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "privacy":
                return {
                    title: withSiteName("Політика приватності"),
                    description: "Умови обробки персональних даних на B2B-платформі.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "terms":
                return {
                    title: withSiteName("Умови користування"),
                    description: "Правила використання B2B-платформи та комерційної інформації.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "sitemap":
                return {
                    title: withSiteName("Мапа сайту"),
                    description: "Повна структура сторінок, каталогів і сервісних розділів B2B-сайту.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "club":
                return {
                    title: withSiteName("Партнерська програма"),
                    description: "Умови клубу, переваги співпраці та формат розвитку дилерів.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "wholesale":
            case "b2b":
            case "opt":
                return {
                    title: withSiteName("B2B-портал"),
                    description: "Оптовий портал для партнерів, прайсів, каталогів і wholesale-замовлень.",
                    robots: indexable,
                    openGraphType: "website",
                };
            case "register":
                return {
                    title: withSiteName("Реєстрація партнера"),
                    description: "Створення партнерського акаунта для доступу до B2B-платформи.",
                    robots: noindex,
                    openGraphType: "website",
                };
            case "login":
                return {
                    title: withSiteName("Вхід для партнерів"),
                    description: "Вхід до партнерського кабінету B2B-платформи ВЗУВАЧКА.",
                    robots: noindex,
                    openGraphType: "website",
                };
            case "forgot-password":
                return {
                    title: withSiteName("Відновлення доступу"),
                    description: "Сервісна сторінка відновлення доступу до B2B-акаунта.",
                    robots: noindex,
                    openGraphType: "website",
                };
            case "update-password":
                return {
                    title: withSiteName("Новий пароль"),
                    description: "Сервісна сторінка оновлення пароля для партнерського акаунта.",
                    robots: noindex,
                    openGraphType: "website",
                };
            case "size-guide":
                return {
                    title: withSiteName("Розмірні матриці"),
                    description: "Матриці розмірів для оптових закупівель і погодження SKU.",
                    robots: indexable,
                    openGraphType: "website",
                };
            default:
                return {
                    title: withSiteName("Сторінку не знайдено"),
                    description: DEFAULT_DESCRIPTION,
                    robots: noindex,
                    openGraphType: "website",
                };
        }
    }

    return {
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        robots: indexable,
        openGraphType: "website",
    };
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
    let element = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;

    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
    }

    element.setAttribute("content", content);
}

function setStructuredData(data?: Record<string, unknown>) {
    const existing = document.head.querySelector("#structured-data") as HTMLScriptElement | null;

    if (!data) {
        existing?.remove();
        return;
    }

    const script = existing ?? document.createElement("script");
    script.id = "structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);

    if (!existing) {
        document.head.appendChild(script);
    }
}

export default function App() {
    const [route, setRoute] = useState<RouteState>({ type: "home", anchor: "home" });

    useEffect(() => {
        const syncRoute = () => {
            if (typeof window === "undefined") return;

            const nextRoute = parseHash(window.location.hash);
            setRoute(nextRoute);

            if (nextRoute.type === "home" && nextRoute.anchor && nextRoute.anchor !== "home") {
                requestAnimationFrame(() => {
                    const element = document.getElementById(nextRoute.anchor as string);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                    } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        syncRoute();
        window.addEventListener("hashchange", syncRoute);

        return () => window.removeEventListener("hashchange", syncRoute);
    }, []);

    const pageMeta = React.useMemo(() => getPageMeta(route), [route]);

    useEffect(() => {
        if (typeof document === "undefined") return;

        document.documentElement.lang = "uk";
        document.title = pageMeta.title;

        setMetaTag("name", "description", pageMeta.description);
        setMetaTag("name", "robots", pageMeta.robots);
        setMetaTag("name", "application-name", SITE_NAME);
        setMetaTag("name", "twitter:card", "summary_large_image");
        setMetaTag("name", "twitter:title", pageMeta.title);
        setMetaTag("name", "twitter:description", pageMeta.description);
        setMetaTag("property", "og:site_name", SITE_NAME);
        setMetaTag("property", "og:locale", "uk_UA");
        setMetaTag("property", "og:type", pageMeta.openGraphType);
        setMetaTag("property", "og:title", pageMeta.title);
        setMetaTag("property", "og:description", pageMeta.description);

        if (typeof window !== "undefined") {
            setMetaTag("property", "og:url", window.location.href);
        }

        setStructuredData(pageMeta.structuredData);
    }, [pageMeta]);

    const renderHomePage = () => (
        <>
            <HeroSection />
            <Categories />
            <Bestsellers />
            <CollabSection />
            <WhyChoose />
            <Reviews />
            <SubscribeSection />
        </>
    );

    const renderPage = () => {
        if (route.type === "home") return renderHomePage();
        if (route.type === "wishlist") return <WishlistPage />;
        if (route.type === "cart") return <CartPage />;
        if (route.type === "checkout") return <CheckoutPage />;
        if (route.type === "search") return <SearchPage />;
        if (route.type === "order-success") return <OrderSuccessPage />;
        if (route.type === "product") return <ProductPage slug={route.slug} />;

        if (route.type === "catalog") {
            return (
                <SubcategoryCatalogPage
                    category={route.category}
                    subcategory={route.subcategory}
                />
            );
        }

        if (route.type === "page") {
            switch (route.slug) {
                case "about": return <About />;
                case "careers": return <Careers />;
                case "shipping": return <Shipping />;
                case "returns": return <Returns />;
                case "faq": return <Faq />;
                case "contact": return <Contact />;
                case "privacy": return <Privacy />;
                case "terms": return <Terms />;
                case "sitemap": return <Sitemap />;
                case "club": return <Club />;
                case "women": return <CatalogPage category="women" />;
                case "men": return <CatalogPage category="men" />;
                case "kids": return <CatalogPage category="kids" />;
                case "work": return <CatalogPage category="work" />;
                case "sale": return <CatalogPage category="sale" />;
                case "admin-orders":
                    return (
                        <AdminRouteGuard>
                            <AdminOrdersPage />
                        </AdminRouteGuard>
                    );
                case "admin-products":
                    return (
                        <AdminRouteGuard>
                            <AdminProductsPage />
                        </AdminRouteGuard>
                    );
                case "admin-site-settings":
                    return (
                        <AdminRouteGuard>
                            <AdminSiteSettingsPage />
                        </AdminRouteGuard>
                    );

                case "wholesale":
                case "b2b":
                case "opt":
                    return <WholesalePage />;

                case "register": return <RegisterPage />;
                case "login": return <LoginPage />;
                case "forgot-password": return <ForgotPasswordPage />;
                case "update-password": return <UpdatePasswordPage />;
                case "accessories": return <CatalogPage category="accessories" />;
                case "size-guide": return <SizeGuide />;
                default: return <NotFoundPage routeSlug={route.slug} />;
            }
        }

        return <NotFoundPage />;
    };

    return (
        <div
            id="home"
            className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white"
        >
            <Toaster richColors position="top-right" />
            <Header />
            <main>{renderPage()}</main>
            <Footer />
        </div>
    );
}
