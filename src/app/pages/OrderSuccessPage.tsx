import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { PageLayout } from "./PageLayout";

export function OrderSuccessPage() {
    return (
        <PageLayout
            title="Замовлення оформлено"
            subtitle="Дякуємо. Ваше замовлення успішно створено."
        >
            <section className="mx-auto max-w-3xl">
                <div className="rounded-3xl border border-white/10 bg-black/20 p-8 md:p-10">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-green-400">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                    </div>

                    <h2 className="mb-4 text-center text-2xl font-black uppercase text-white">
                        Усе готово
                    </h2>

                    <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-7 text-gray-300">
                        Ми отримали ваше замовлення. Найближчим часом менеджер зв’яжеться з
                        вами для підтвердження деталей доставки та оплати.
                    </p>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                                Статус
                            </p>
                            <p className="text-sm font-bold text-white">Прийнято в обробку</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                                Підтвердження
                            </p>
                            <p className="text-sm font-bold text-white">Менеджер зв’яжеться</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                                Підтримка
                            </p>
                            <p className="text-sm font-bold text-white">24/7</p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <a
                            href="#home"
                            className="inline-flex items-center justify-center border border-white/10 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:text-red-500"
                        >
                            На головну
                        </a>

                        <a
                            href="#page/contact"
                            className="inline-flex items-center justify-center bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                        >
                            Зв’язатися з нами
                        </a>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}