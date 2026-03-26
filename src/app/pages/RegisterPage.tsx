import * as React from "react";
import { toast } from "sonner";
import { signUpWithEmail } from "../../lib/api/auth";
import { PageLayout } from "./PageLayout";

export function RegisterPage() {
    const [form, setForm] = React.useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            toast.error("Заповніть email і пароль");
            return;
        }

        try {
            setLoading(true);
            await signUpWithEmail(
                form.email.trim(),
                form.password.trim(),
                form.fullName.trim()
            );

            toast.success("Акаунт створено. Перевірте email для підтвердження.");
            window.location.hash = "#page/login";
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося створити акаунт");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout
            title="Реєстрація"
            subtitle="Створіть акаунт, щоб зберігати товари і надсилати заявки."
        >
            <form onSubmit={handleSubmit} className="max-w-[560px] space-y-4">
                <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Ім'я / назва компанії"
                    className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                />
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Пароль *"
                    className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-60"
                >
                    {loading ? "Створення..." : "Створити акаунт"}
                </button>
            </form>
        </PageLayout>
    );
}
