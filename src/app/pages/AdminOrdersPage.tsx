import * as React from "react";
import { PageLayout } from "./PageLayout";
import {
    fetchOrders,
    fetchOrderItems,
    updateOrderStatus,
    type AdminOrder,
    type AdminOrderItem,
} from "../../lib/api/adminOrders";
import { formatPrice } from "../data/products";
import { toast } from "sonner";
import { AdminWorkspace } from "../components/AdminWorkspace";

const statusOptions = [
    { id: "lead", label: "Новий lead" },
    { id: "qualified", label: "Кваліфіковано" },
    { id: "quoted", label: "Комерційна пропозиція" },
    { id: "approved", label: "Погоджено" },
    { id: "invoiced", label: "Рахунок / резерв" },
    { id: "shipped", label: "Відвантажено" },
    { id: "closed", label: "Закрито" },
    { id: "rejected", label: "Відхилено" },
];

export function AdminOrdersPage() {
    const [orders, setOrders] = React.useState<AdminOrder[]>([]);
    const [itemsMap, setItemsMap] = React.useState<Record<number, AdminOrderItem[]>>({});
    const [loading, setLoading] = React.useState(true);
    const orderStats = React.useMemo(() => {
        const openStatuses = ["lead", "qualified", "quoted", "approved", "invoiced", "new", "confirmed", "packed"];
        const totalValue = orders.reduce((sum, order) => sum + order.total, 0);
        const totalSkuRows = Object.values(itemsMap).reduce((sum, items) => sum + items.length, 0);

        return [
            {
                label: "Заявок",
                value: String(orders.length),
                note: "Усі B2B-звернення в бек-офісі.",
            },
            {
                label: "Активний pipeline",
                value: String(orders.filter((order) => openStatuses.includes(order.status)).length),
                note: "Угоди в роботі без закритих та відхилених.",
            },
            {
                label: "SKU рядків",
                value: String(totalSkuRows),
                note: "Сумарна кількість позицій у всіх запитах.",
            },
            {
                label: "База запитів",
                value: formatPrice(totalValue),
                note: "Орієнтовний оборот по вхідним лідам.",
            },
        ];
    }, [itemsMap, orders]);

    const loadOrders = React.useCallback(async () => {
        try {
            setLoading(true);
            const ordersData = await fetchOrders();
            setOrders(ordersData);

            const entries = await Promise.all(
                ordersData.map(async (order) => {
                    const items = await fetchOrderItems(order.id);
                    return [order.id, items] as const;
                })
            );

            setItemsMap(Object.fromEntries(entries));
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося завантажити замовлення");
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const handleStatusChange = async (orderId: number, status: string) => {
        try {
            await updateOrderStatus(orderId, status);
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? { ...order, status } : order
                )
            );
            toast.success("Статус оновлено");
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося оновити статус");
        }
    };

    return (
        <PageLayout
            title="B2B-ліди й заявки"
            subtitle="Перегляд оптових звернень, матриць SKU та руху по sales pipeline."
        >
            <section className="space-y-8">
                <AdminWorkspace active="orders" stats={orderStats} />

                {loading ? (
                    <p>Завантаження...</p>
                ) : orders.length === 0 ? (
                    <p>Замовлень поки немає.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                        <article
                            key={order.id}
                            className="rounded-2xl border border-white/10 bg-black/20 p-6"
                        >
                            {(() => {
                                const items = itemsMap[order.id] ?? [];
                                const packs = items.reduce((sum, item) => sum + item.quantity, 0);
                                const statusChoices = statusOptions.some((status) => status.id === order.status)
                                    ? statusOptions
                                    : [
                                        { id: order.status, label: getStatusLabel(order.status) },
                                        ...statusOptions,
                                    ];
                                const commentLines = parseComment(order.comment);

                                return (
                                    <>
                                        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                            <div className="space-y-2 text-sm text-gray-300">
                                                <p className="text-lg font-black text-white">
                                                    {order.order_number}
                                                </p>
                                                <p>Компанія / контакт: {order.customer_name}</p>
                                                <p>Телефон: {order.phone}</p>
                                                <p>Email: {order.email || "—"}</p>
                                                <p>Місто: {order.city}</p>
                                                <p>Відділення: {order.branch}</p>
                                                <p>Сума: {formatPrice(order.total)}</p>
                                                <p>Упаковок: {packs}</p>
                                                <p>Дата: {new Date(order.created_at).toLocaleString("uk-UA")}</p>
                                                <div className="pt-2">
                                                    <span
                                                        className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${getStatusTone(
                                                            order.status
                                                        )}`}
                                                    >
                                                        {getStatusLabel(order.status)}
                                                    </span>
                                                </div>
                                                <div className="rounded-2xl border border-white/10 bg-[#111] p-4">
                                                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                                        B2B контекст
                                                    </p>
                                                    {commentLines.length === 0 ? (
                                                        <p className="text-sm text-gray-500">Немає додаткових нотаток</p>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {commentLines.map((line, index) => (
                                                                <div
                                                                    key={`${order.id}-comment-${index}`}
                                                                    className="flex flex-col gap-1 border-b border-white/5 pb-2 last:border-b-0 last:pb-0"
                                                                >
                                                                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
                                                                        {line.label}
                                                                    </span>
                                                                    <span className="text-sm text-gray-200">{line.value}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="min-w-[220px]">
                                                <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                                                    Pipeline
                                                </label>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className="w-full border border-white/10 bg-[#111] px-4 py-3 text-white outline-none"
                                                >
                                                    {statusChoices.map((status) => (
                                                        <option key={status.id} value={status.id}>
                                                            {status.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="border-t border-white/10 pt-4">
                                            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                                                SKU у запиті
                                            </p>

                                            <div className="space-y-3">
                                                {items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="rounded-xl border border-white/10 bg-[#111] p-4 text-sm text-gray-300"
                                                    >
                                                        <p className="font-bold text-white">{item.product_name}</p>
                                                        <p>Slug: {item.product_slug}</p>
                                                        <p>Пакування: {item.selected_size || "—"}</p>
                                                        <p>Колір: {item.selected_color || "—"}</p>
                                                        <p>Упаковок: {item.quantity}</p>
                                                        <p>Ціна за уп.: {formatPrice(item.price)}</p>
                                                        <p>Сума рядка: {formatPrice(item.price * item.quantity)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </article>
                        ))}
                    </div>
                )}
            </section>
        </PageLayout>
    );
}

function getStatusLabel(status: string) {
    return (
        statusOptions.find((item) => item.id === status)?.label ??
        legacyStatusLabel(status)
    );
}

function legacyStatusLabel(status: string) {
    switch (status) {
        case "new":
            return "Нове звернення";
        case "confirmed":
            return "Підтверджено";
        case "packed":
            return "Зібрано";
        case "done":
            return "Завершено";
        case "cancelled":
            return "Скасовано";
        default:
            return status;
    }
}

function getStatusTone(status: string) {
    switch (status) {
        case "lead":
        case "new":
            return "border-blue-500/30 bg-blue-500/10 text-blue-200";
        case "qualified":
        case "confirmed":
            return "border-cyan-500/30 bg-cyan-500/10 text-cyan-200";
        case "quoted":
        case "packed":
            return "border-amber-500/30 bg-amber-500/10 text-amber-200";
        case "approved":
        case "invoiced":
            return "border-violet-500/30 bg-violet-500/10 text-violet-200";
        case "shipped":
            return "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
        case "closed":
        case "done":
            return "border-white/20 bg-white/10 text-white";
        case "rejected":
        case "cancelled":
            return "border-red-500/30 bg-red-500/10 text-red-200";
        default:
            return "border-white/10 bg-white/[0.04] text-gray-200";
    }
}

function parseComment(comment: string | null) {
    if (!comment) return [];

    return comment
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const separatorIndex = line.indexOf(":");

            if (separatorIndex === -1) {
                return { label: "Нотатка", value: line };
            }

            return {
                label: line.slice(0, separatorIndex),
                value: line.slice(separatorIndex + 1).trim(),
            };
        });
}
