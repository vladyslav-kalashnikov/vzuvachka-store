import * as React from "react";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { PageLayout } from "./PageLayout";

const womenSizes = [
    { eu: "36", cm: "23.0" },
    { eu: "37", cm: "23.5" },
    { eu: "38", cm: "24.0" },
    { eu: "39", cm: "24.5" },
    { eu: "40", cm: "25.0" },
    { eu: "41", cm: "25.5" },
];

const menSizes = [
    { eu: "40", cm: "25.5" },
    { eu: "41", cm: "26.0" },
    { eu: "42", cm: "26.5" },
    { eu: "43", cm: "27.0" },
    { eu: "44", cm: "27.5" },
    { eu: "45", cm: "28.0" },
];

const kidsSizes = [
    { eu: "28", cm: "17.5" },
    { eu: "29", cm: "18.0" },
    { eu: "30", cm: "18.5" },
    { eu: "31", cm: "19.0" },
    { eu: "32", cm: "19.5" },
    { eu: "33", cm: "20.0" },
    { eu: "34", cm: "21.0" },
    { eu: "35", cm: "22.0" },
];

export function SizeGuide() {
    const fromSlug =
        typeof window !== "undefined"
            ? new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("from")
            : null;

    return (
        <PageLayout
            title="Розмірна сітка"
            subtitle="Орієнтовна таблиця відповідності розмірів і довжини стопи."
        >
            <section className="flex flex-wrap gap-3">
                <a
                    href="javascript:history.back()"
                    className="inline-flex items-center gap-2 border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:text-red-500"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Назад
                </a>

                {fromSlug && (
                    <a
                        href={`#product/${fromSlug}`}
                        className="inline-flex items-center gap-2 bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Повернутись до товару
                    </a>
                )}
            </section>

            <section>
                <p>
                    Щоб правильно підібрати розмір, поставте стопу на аркуш паперу,
                    відмітьте край п’яти та найдовший палець, а потім виміряйте відстань
                    між цими точками.
                </p>
                <p>
                    Якщо ви знаходитесь між двома розмірами, для утеплених моделей краще
                    обирати більший варіант.
                </p>
            </section>

            <section>
                <h2>Жіноча лінійка</h2>
                <SizeTable items={womenSizes} />
            </section>

            <section>
                <h2>Чоловіча лінійка</h2>
                <SizeTable items={menSizes} />
            </section>

            <section>
                <h2>Дитяча лінійка</h2>
                <SizeTable items={kidsSizes} />
            </section>

            <section>
                <h2>Поради</h2>
                <ul>
                    <li>Міряйте стопу ввечері, коли нога трохи більша після дня.</li>
                    <li>Для товстої шкарпетки або утепленої моделі додавайте запас 0.5 см.</li>
                    <li>Якщо сумніваєтесь — напишіть нам у підтримку.</li>
                </ul>
            </section>
        </PageLayout>
    );
}

function SizeTable({ items }: { items: { eu: string; cm: string }[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full border-collapse bg-black/20 text-left">
                <thead>
                <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-white">
                        EU
                    </th>
                    <th className="px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-white">
                        Довжина стопи (см)
                    </th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.eu} className="border-b border-white/10 last:border-b-0">
                        <td className="px-4 py-3 text-sm text-gray-300">{item.eu}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{item.cm}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}