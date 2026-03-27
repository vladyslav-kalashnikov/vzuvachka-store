import * as React from "react";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { getSetting } from "../lib/siteContent";
import { supabase } from "../../lib/supabase"; // Підключаємо нашу базу даних

export function SubscribeSection() {
    const { settings } = useSiteSettings();
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const badge = getSetting(settings, "subscribe_badge", "B2B РОЗСИЛКА");
    const title = getSetting(settings, "subscribe_title", "ЗАКРИТІ ПРАЙСИ ТА ЛОТИ");
    const description = getSetting(
        settings,
        "subscribe_description",
        "Залиште email, щоб першими отримувати інформацію про нові надходження, складські залишки та спеціальні пропозиції для оптових партнерів."
    );
    const buttonText = getSetting(settings, "subscribe_button_text", "ПІДПИСАТИСЯ");
    const note = getSetting(
        settings,
        "subscribe_note",
        "Жодного спаму. Тільки оптові пропозиції та складські залишки."
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail) {
            toast.error("Будь ласка, введіть email");
            return;
        }

        setLoading(true);

        try {
            // 1. ПЕРЕВІРЯЄМО, ЧИ Є ТАКИЙ EMAIL В БАЗІ SUPABASE
            const { data: existingUser, error: searchError } = await supabase
                .from("subscribers")
                .select("email")
                .eq("email", cleanEmail)
                .maybeSingle();

            if (searchError) throw searchError;

            if (existingUser) {
                toast.error("Ви вже підписані на нашу B2B розсилку!");
                setLoading(false);
                return; // Зупиняємо виконання, щоб не відправляти в Телеграм вдруге
            }

            // 2. ЯКЩО НЕМАЄ - ЗАПИСУЄМО В БАЗУ SUPABASE
            const { error: insertError } = await supabase
                .from("subscribers")
                .insert([{ email: cleanEmail }]);

            if (insertError) throw insertError;

            // 3. ВІДПРАВЛЯЄМО СПОВІЩЕННЯ МЕНЕДЖЕРУ В ТЕЛЕГРАМ
            const BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN;
            const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;
            const message = `📬 <b>НОВИЙ ПІДПИСНИК (B2B Розсилка)</b>%0A%0A📧 <b>Контакт:</b> ${cleanEmail}`;

            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}&parse_mode=HTML`);

            if (response.ok) {
                toast.success("Дякуємо! Ваш email додано до бази партнерів.");
                setEmail(""); // Очищаємо поле після успіху
            } else {
                toast.error("Дані збережено, але повідомлення в Телеграм не відправлено.");
            }

        } catch (error) {
            console.error("Помилка підписки:", error);
            toast.error("Виникла помилка. Перевірте з'єднання або спробуйте пізніше.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="border-t border-white/5 bg-[#0a0a0a] py-20 sm:py-32 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(220,38,38,0.1),transparent_40%)]" />

            <div className="mx-auto max-w-[1000px] px-4 sm:px-6 relative z-10 text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-600/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                    <Mail className="h-4 w-4" />
                    {badge}
                </div>

                <h2 className="mb-6 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                    {title}
                </h2>

                <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
                    {description}
                </p>

                <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ваш робочий email..."
                        className="tech-clip flex-1 border border-white/10 bg-[#111] px-6 py-5 text-sm text-white outline-none transition-colors hover:border-white/30 focus:border-red-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="tech-clip group flex items-center justify-center gap-3 bg-red-600 px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-50 shadow-[0_0_20px_rgba(220,38,38,0.3)] sm:w-auto"
                    >
                        {loading ? "Відправка..." : buttonText}
                        {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                    </button>
                </form>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    {note}
                </p>
            </div>
        </section>
    );
}
