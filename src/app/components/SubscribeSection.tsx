import * as React from "react";
import { toast } from "sonner";

export function SubscribeSection() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Підписка оформлена");
    };

    return (
        <section id="subscribe" className="bg-[#0a0a0a] py-24">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="border border-white/10 bg-[#111] p-10 text-white">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                        Newsletter
                    </p>
                    <h2 className="mb-4 text-3xl font-black uppercase">
                        Підпишись на оновлення
                    </h2>
                    <p className="mb-6 max-w-2xl text-sm text-gray-400">
                        Отримуй інформацію про нові дропи, лімітовані колекції та спеціальні пропозиції.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
                        <input
                            type="email"
                            placeholder="Ваш email"
                            className="flex-1 border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-500"
                        />
                        <button
                            type="submit"
                            className="bg-red-600 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                        >
                            Підписатися
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}