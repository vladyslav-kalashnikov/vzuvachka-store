import * as React from "react";
import { formatPrice } from "../data/products";
import { PageLayout } from "./PageLayout";
import { CheckCircle, PackageOpen, ArrowRight } from "lucide-react";

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
            title="Заявка успішно прийнята"
            subtitle="Ваш B2B-запит вже у нашого менеджера. Ми зв'яжемося з вами найближчим часом."
        >
            <div className="mx-auto max-w-3xl space-y-8">
                {lastOrder ? (
                    <div className="tech-clip premium-panel relative overflow-hidden border border-white/10 bg-[#111] p-8 sm:p-10">
                        {/* Декоративний фон */}
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-600/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-500">
                                <CheckCircle className="h-8 w-8" />
                            </div>

                            <h2 className="mb-2 text-2xl font-black uppercase text-white">
                                Замовлення <span className="text-red-500">{lastOrder.orderNumber}</span>
                            </h2>
                            <p className="mb-8 text-sm font-bold tracking-widest text-gray-400 uppercase">
                                Клієнт: {lastOrder.customerName || "Партнер"}
                            </p>

                            <div className="grid w-full gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">До сплати</p>
                                    <p className="mt-1 text-xl font-black copper-text text-[#b87333]">{formatPrice(lastOrder.total || 0)}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Об'єм</p>
                                    <p className="mt-1 text-xl font-black text-white">{lastOrder.packs} ящ.</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Кількість</p>
                                    <p className="mt-1 text-xl font-black text-white">{lastOrder.units} пар</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="tech-clip border border-white/10 bg-[#111] p-8 text-center">
                        <PackageOpen className="mx-auto mb-4 h-12 w-12 text-red-500" />
                        <h2 className="text-xl font-black uppercase text-white">Ваш запит в обробці</h2>
                        <p className="mt-2 text-sm text-gray-400">Ми вже отримали інформацію і готуємо накладну.</p>
                    </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="border border-white/5 bg-black/40 p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-red-500">Що далі?</h3>
                        <ul className="space-y-3 text-xs font-bold leading-relaxed text-gray-400">
                            <li className="flex gap-2"><span className="text-red-500">1.</span> Менеджер перевіряє наявність на складі.</li>
                            <li className="flex gap-2"><span className="text-red-500">2.</span> Ми телефонуємо вам для підтвердження.</li>
                            <li className="flex gap-2"><span className="text-red-500">3.</span> Пакуємо та відправляємо Новою Поштою.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col justify-center gap-4">
                        <a href="#categories" className="group tech-clip flex items-center justify-center gap-3 bg-red-600 px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500">
                            Повернутися в каталог
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a href="#home" className="tech-clip flex items-center justify-center border border-white/10 bg-[#111] px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-white/30 hover:bg-white/5">
                            На головну
                        </a>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}