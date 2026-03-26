import * as React from "react";
import { toast } from "sonner";
import { signInWithEmail } from "../../lib/api/auth";
import { PageLayout } from "./PageLayout";

export function LoginPage() {
    const [form, setForm] = React.useState({
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
            toast.error("Введіть email і пароль");
            return;
        }

        try {
            setLoading(true);
            await signInWithEmail(form.email.trim(), form.password.trim());
            toast.success("Ви успішно увійшли");
            window.location.hash = "#home";
        } catch (error) {
            console.error(error);
            toast.error("Невірний email або пароль");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout title="Вхід" subtitle="Увійдіть у свій акаунт.">
            <form onSubmit={handleSubmit} className="max-w-[560px] space-y-4">
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                />

                <div className="flex flex-wrap gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-60"
                    >
                        {loading ? "Вхід..." : "Увійти"}
                    </button>

                    <a
                        href="#page/forgot-password"
                        className="inline-flex border border-white/10 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:text-red-500"
                    >
                        Скинути пароль
                    </a>
                </div>
            </form>
        </PageLayout>
    );
}
