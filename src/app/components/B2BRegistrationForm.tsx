import * as React from "react";
import { toast } from "sonner";

export function B2BRegistrationForm() {
    const highlights = [
        "Підкажемо по товарах і цінах",
        "Допоможемо з першим замовленням",
        "Пояснимо доставку і подальші кроки",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Запит отримано. Ми скоро з вами зв'яжемося.");
    };

    return (
        <section
            id="b2b-register"
            className="mesh-light relative overflow-hidden py-24 text-[#161616]"
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,15,15,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,15,15,0.06)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30" />
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="premium-panel-light tech-clip grid gap-10 border border-black/10 bg-[rgba(255,252,247,0.95)] p-8 md:grid-cols-[0.88fr_1.12fr] md:p-12">
                    <div>
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#7b818c]">
                            Форма зв'язку
                        </p>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-[#111111] md:text-5xl">
                            Залиште <span className="text-red-600">свій запит</span>
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-7 text-[#5f6672]">
                            Напишіть, що саме вас цікавить, і ми допоможемо підібрати товари та
                            пояснимо умови.
                        </p>

                        <div className="mt-8 grid gap-3">
                            {highlights.map((item, index) => (
                                <div
                                    key={item}
                                    className="tech-clip border border-[#d9dce2] bg-white px-4 py-4 shadow-[0_12px_28px_rgba(15,15,15,0.05)]"
                                >
                                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.24em] text-red-600">
                                        0{index + 1}
                                    </p>
                                    <p className="text-sm leading-6 text-[#313640]">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="tech-clip bg-[#0b0b0b] p-6 text-white md:p-8">
                        <div className="mb-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d5d8df]">
                                Fast qualification
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#c0c5cf]">Компанія / ФОП</label>
                                <input
                                    type="text"
                                    className="tech-clip w-full border border-white/12 bg-[#151515] px-4 py-3 text-sm text-white placeholder:text-[#7a7f88] outline-none focus:border-red-600"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#c0c5cf]">Контактна особа</label>
                                <input
                                    type="text"
                                    className="tech-clip w-full border border-white/12 bg-[#151515] px-4 py-3 text-sm text-white placeholder:text-[#7a7f88] outline-none focus:border-red-600"
                                />
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#c0c5cf]">Телефон</label>
                                <input
                                    type="tel"
                                    placeholder="+380"
                                    className="tech-clip w-full border border-white/12 bg-[#151515] px-4 py-3 text-sm text-white placeholder:text-[#7a7f88] outline-none focus:border-red-600"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#c0c5cf]">Email</label>
                                <input
                                    type="email"
                                    className="tech-clip w-full border border-white/12 bg-[#151515] px-4 py-3 text-sm text-white placeholder:text-[#7a7f88] outline-none focus:border-red-600"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#c0c5cf]">Формат продажу</label>
                            <select className="tech-clip w-full border border-white/12 bg-[#151515] px-4 py-3 text-sm text-white outline-none focus:border-red-600">
                                <option value="offline">Офлайн магазин</option>
                                <option value="online">Інтернет-магазин</option>
                                <option value="marketplace">Маркетплейси</option>
                                <option value="corporate">Корпоративні закупівлі</option>
                            </select>
                        </div>

                        <div className="mt-6 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#c0c5cf]">Що цікавить</label>
                            <textarea
                                rows={4}
                                placeholder="Наприклад: які товари потрібні, приблизний обсяг, місто або формат магазину"
                                className="tech-clip w-full border border-white/12 bg-[#151515] px-4 py-3 text-sm text-white placeholder:text-[#7a7f88] outline-none focus:border-red-600"
                            />
                        </div>

                        <button
                            type="submit"
                            className="tech-clip mt-8 w-full bg-white px-6 py-5 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-red-600 hover:text-white"
                        >
                            Надіслати запит
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
