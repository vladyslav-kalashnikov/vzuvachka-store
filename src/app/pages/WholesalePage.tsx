import * as React from "react";
import { B2BRegistrationForm } from "../components/B2BRegistrationForm";
import { WholesaleBenefits } from "../components/WholesaleBenefits";
import { WholesaleHero } from "../components/WholesaleHero";
import { WholesaleOrderTable } from "../components/WholesaleOrderTable";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getSetting } from "../lib/siteContent";
import { PageLayout } from "./PageLayout";

export function WholesalePage() {
    const { settings } = useSiteSettings();

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <PageLayout
            title={getSetting(settings, "wholesale_page_title", "Умови співпраці")}
            subtitle={getSetting(
                settings,
                "wholesale_page_subtitle",
                "Ціни, наявність, доставка і допомога з вашим замовленням."
            )}
        >
            <div className="flex w-full min-w-0 flex-col overflow-hidden">
                <WholesaleHero />
                <WholesaleBenefits />
                <WholesaleOrderTable />
                <B2BRegistrationForm />
            </div>
        </PageLayout>
    );
}
