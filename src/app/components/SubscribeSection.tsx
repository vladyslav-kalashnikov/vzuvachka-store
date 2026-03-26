import * as React from "react";
import { toast } from "sonner";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function SubscribeSection() {
    const { settings } = useSiteSettings();
    const deliverables = [
        "Ціни на товари",
        "Актуальна наявність",
        "Допомога з вибором",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Запит отримано. Ми скоро зв'яжемося з вами.");
    };

    return (
        <section id="subscribe" className="mesh-light relative overflow-hidden py-16 text-black sm:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,15,15,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,15,15,0.06)_1px,transparent_1px)] bg-[size:52px_52px] opacity-30" />
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
                <div className="premium-panel-light tech-clip grid gap-8 p-6 sm:gap-10 sm:p-8 md:grid-cols-[1fr_0.92fr] md:p-10">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                            {settings.subscribe_badge || "Швидкий запит"}
                        </p>
                        <h2 className="mb-4 text-3xl font-black uppercase text-black md:text-5xl">
                            {settings.subscribe_title || "Дізнатися ціни і наявність"}
                        </h2>
                        <p className="mb-6 max-w-2xl text-sm leading-7 text-black/65">
                            {settings.subscribe_description ||
                                "Залиште контакти, і ми підкажемо по товарах, цінах та умовах замовлення."}
                        </p>

                        <div className="grid gap-3">
                            {deliverables.map((item) => (
                                <div
                                    key={item}
                                    className="tech-clip border border-black/10 bg-white/70 px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-black/70"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="tech-clip bg-[#101010] p-5 text-white sm:p-6">
                        <p className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-red-400">
                            Швидко і просто
                        </p>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <input
                                type="text"
                                placeholder="Назва магазину або компанії"
                                className="border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-500"
                            />
                            <input
                                type="email"
                                placeholder="Ваш email"
                                className="border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-red-600 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                            >
                                {settings.subscribe_button_text || "Надіслати"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
