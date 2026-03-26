import * as React from "react";
import {
    ArrowUpRight,
    Boxes,
    ClipboardList,
    PanelsTopLeft,
} from "lucide-react";

type AdminArea = "orders" | "products" | "content";

type AdminStat = {
    label: string;
    value: string;
    note?: string;
};

type AdminWorkspaceProps = {
    active: AdminArea;
    stats: AdminStat[];
    actions?: React.ReactNode;
};

const adminAreas = [
    {
        id: "orders" as const,
        href: "#page/admin-orders",
        title: "Leads і заявки",
        description: "Воронка B2B, матриці SKU і статуси угод.",
        icon: ClipboardList,
    },
    {
        id: "products" as const,
        href: "#page/admin-products",
        title: "SKU і каталог",
        description: "Оптові картки товарів, фото й сегменти.",
        icon: Boxes,
    },
    {
        id: "content" as const,
        href: "#page/admin-site-settings",
        title: "Контент і вітрина",
        description: "Hero, сегменти, довіра й lead-захоплення.",
        icon: PanelsTopLeft,
    },
];

export function AdminWorkspace({
    active,
    stats,
    actions,
}: AdminWorkspaceProps) {
    return (
        <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-black/20 p-6 md:p-8">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.34em] text-red-500">
                            VZUVACHKA B2B BACKOFFICE
                        </p>
                        <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-white">
                            Операційний контур wholesale-команди
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">
                            Єдина робоча зона для sales pipeline, керування SKU та контентом
                            вітрини. Усі критичні точки зібрані в одному місці.
                        </p>
                    </div>

                    {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
                </div>

                <div className="mt-8 grid gap-4 xl:grid-cols-3">
                    {adminAreas.map((area) => {
                        const Icon = area.icon;
                        const isActive = area.id === active;

                        return (
                            <a
                                key={area.id}
                                href={area.href}
                                className={`group rounded-[24px] border p-5 transition ${
                                    isActive
                                        ? "border-red-500 bg-red-500/10"
                                        : "border-white/10 bg-white/[0.02] hover:border-white/30"
                                }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div
                                            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border ${
                                                isActive
                                                    ? "border-red-500/50 bg-red-500/20 text-red-200"
                                                    : "border-white/10 bg-black/30 text-white"
                                            }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <p className="mt-4 text-lg font-black uppercase text-white">
                                            {area.title}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-gray-400">
                                            {area.description}
                                        </p>
                                    </div>

                                    <ArrowUpRight
                                        className={`h-5 w-5 transition ${
                                            isActive
                                                ? "text-red-300"
                                                : "text-gray-500 group-hover:text-white"
                                        }`}
                                    />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={`${stat.label}-${stat.value}`}
                        className="rounded-[24px] border border-white/10 bg-black/20 px-5 py-5"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-500">
                            {stat.label}
                        </p>
                        <p className="mt-3 text-3xl font-black uppercase text-white">
                            {stat.value}
                        </p>
                        {stat.note && (
                            <p className="mt-2 text-sm leading-6 text-gray-400">{stat.note}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
