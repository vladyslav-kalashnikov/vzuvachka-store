import * as React from "react";
import { toast } from "sonner";
import { sendResetPassword } from "../../lib/api/auth";
import { PageLayout } from "./PageLayout";

export function ForgotPasswordPage() {
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Введіть email");
            return;
        }

        try {
            setLoading(true);
            await sendResetPassword(email.trim());
            toast.success("Лист для відновлення доступу відправлено");
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося відправити лист");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout
            title="Відновлення доступу"
            subtitle="Введіть email, і ми надішлемо посилання для відновлення партнерського акаунта."
        >
            <form onSubmit={handleSubmit} className="max-w-[560px] space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-60"
                >
                    {loading ? "Відправка..." : "Надіслати лист"}
                </button>
            </form>
        </PageLayout>
    );
}
