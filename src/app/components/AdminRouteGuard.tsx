import * as React from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import { PageLayout } from "../pages/PageLayout";

type AdminRouteGuardProps = {
    children: React.ReactNode;
};

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
    const { isLoading, isAdmin } = useAuthUser();

    if (isLoading) {
        return (
            <PageLayout
                title="Перевіряємо доступ"
                subtitle="Зачекай кілька секунд, поки ми визначимо роль користувача."
            >
                <section className="space-y-4 text-base text-gray-300">
                    <p>Завантажуємо партнерський профіль і права доступу до адмін-кабінету.</p>
                </section>
            </PageLayout>
        );
    }

    if (!isAdmin) {
        return (
            <PageLayout
                title="Доступ обмежено"
                subtitle="Цей розділ відкритий лише для адміністраторів B2B-платформи."
            >
                <section className="space-y-5 text-base text-gray-300">
                    <p>
                        Якщо тобі потрібен доступ до керування заявками, SKU або контентом,
                        увійди під адміністраторським акаунтом або звернись до власника
                        системи.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href="#page/login"
                            className="inline-flex rounded-xl border border-white/10 bg-[#111] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-red-500 hover:text-red-500"
                        >
                            Увійти
                        </a>
                        <a
                            href="#home"
                            className="inline-flex rounded-xl border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-gray-300 transition-colors hover:border-white hover:text-white"
                        >
                            На головну
                        </a>
                    </div>
                </section>
            </PageLayout>
        );
    }

    return <>{children}</>;
}
