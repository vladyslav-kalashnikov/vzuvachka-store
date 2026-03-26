import * as React from "react";
import { B2BRegistrationForm } from "../components/B2BRegistrationForm";
import { WholesaleBenefits } from "../components/WholesaleBenefits";
import { WholesaleHero } from "../components/WholesaleHero";
import { WholesaleOrderTable } from "../components/WholesaleOrderTable";
import { PageLayout } from "./PageLayout";

export function WholesalePage() {
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <PageLayout
            title="Умови співпраці"
            subtitle="Ціни, наявність, доставка і допомога з вашим замовленням."
        >
            <div className="flex w-full flex-col">
                <WholesaleHero />
                <WholesaleBenefits />
                <WholesaleOrderTable />
                <B2BRegistrationForm />
            </div>
        </PageLayout>
    );
}
