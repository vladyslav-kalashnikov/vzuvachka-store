import * as React from "react";
import { formatPrice } from "../data/products";
import { PageLayout } from "./PageLayout";

type LastOrder = {
    orderNumber: string;
    customerName?: string;
    total?: number;
    packs?: number;
    units?: number;
};

export function OrderSuccessPage() {
    const [lastOrder, setLastOrder] = React.useState<LastOrder | null>(null);

    React.useEffect(() => {
        const raw = localStorage.getItem("vzuvachka-last-order");
        if (!raw) return;

        try {
            const parsed = JSON.parse(raw) as LastOrder;
            setLastOrder(parsed);
        } catch {
            setLastOrder(null);
        }
    }, []);

    return (
        <PageLayout
            title="B2B-запит отримано"
            subtitle="Команда продажів уже бачить вашу заявку й повернеться з підтвердженням по SKU."
        >
            <section className="space-y-5">
                {lastOrder ? (
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-gray-300">
                        <p className="mb-2 text-white">
                            Номер запиту:{" "}
                            <span className="font-black text-red-500">{lastOrder.orderNumber}</span>
                        </p>

                        {lastOrder.customerName && <p className="mb-2">Компанія: {lastOrder.customerName}</p>}

                        {typeof lastOrder.total === "number" && (
                            <p>Орієнтовна база: {formatPrice(lastOrder.total)}</p>
                        )}

                        {typeof lastOrder.packs === "number" && (
                            <p>Упаковок у запиті: {lastOrder.packs}</p>
                        )}

                        {typeof lastOrder.units === "number" && (
                            <p>Одиниць / пар у запиті: {lastOrder.units}</p>
                        )}
                    </div>
                ) : (
                    <p>Ваш запит прийнято в обробку.</p>
                )}

                <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                    <h2>Що далі</h2>
                    <ul>
                        <li>Менеджер перевірить наявність і підготує підтверджений прайс.</li>
                        <li>За потреби ми запропонуємо корекцію матриці під ваш канал продажу.</li>
                        <li>Після погодження узгодимо відвантаження й наступні догрузки.</li>
                    </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                    <a
                        href="#home"
                        className="inline-flex border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:text-red-500"
                    >
                        На головну
                    </a>

                    <a
                        href="#page/wholesale"
                        className="inline-flex bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                    >
                        Перейти до B2B-порталу
                    </a>
                </div>
            </section>
        </PageLayout>
    );
}
