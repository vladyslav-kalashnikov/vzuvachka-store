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
import { PageLayout } from "./pages/PageLayout";
import { Accessories } from "./pages/Accessories";
import { SizeGuide } from "./pages/SizeGuide";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import type { ProductCategory, ProductSubcategory } from "./data/products";

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

function parseHash(hash: string): RouteState {
    const cleanHash = hash.replace("#", "");

    if (!cleanHash || cleanHash === "home") {
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

export default function App() {
    const [route, setRoute] = useState<RouteState>({ type: "home", anchor: "home" });

    useEffect(() => {
        const syncRoute = () => {
            if (typeof window === "undefined") return;

            const nextRoute = parseHash(window.location.hash);
            setRoute(nextRoute);

            if (nextRoute.type === "home" && nextRoute.anchor && nextRoute.anchor !== "home") {
                requestAnimationFrame(() => {
                    document
                        .getElementById(nextRoute.anchor as string)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        syncRoute();
        window.addEventListener("hashchange", syncRoute);

        return () => window.removeEventListener("hashchange", syncRoute);
    }, []);

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
                case "about":
                    return <About />;
                case "careers":
                    return <Careers />;
                case "shipping":
                    return <Shipping />;
                case "returns":
                    return <Returns />;
                case "faq":
                    return <Faq />;
                case "contact":
                    return <Contact />;
                case "privacy":
                    return <Privacy />;
                case "terms":
                    return <Terms />;
                case "sitemap":
                    return <Sitemap />;
                case "club":
                    return <Club />;
                case "women":
                    return <CatalogPage category="women" />;
                case "men":
                    return <CatalogPage category="men" />;
                case "kids":
                    return <CatalogPage category="kids" />;
                case "work":
                    return <CatalogPage category="work" />;
                case "sale":
                    return <CatalogPage category="sale" />;
                case "accessories":
                    return <CatalogPage category="accessories" />;
                case "size-guide":
                    return <SizeGuide />;
                default:
                    return (
                        <PageLayout
                            title="Сторінка не знайдена"
                            subtitle="Маршрут не існує або ще не підключений."
                        >
                            <section>
                                <a
                                    href="#home"
                                    className="inline-flex rounded-xl border border-white/10 bg-[#111] px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-white transition-colors hover:border-red-500 hover:text-red-500"
                                >
                                    Повернутися на головну
                                </a>
                            </section>
                        </PageLayout>
                    );
            }
        }

        return null;
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