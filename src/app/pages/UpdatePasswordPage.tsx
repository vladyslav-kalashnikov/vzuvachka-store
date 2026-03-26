import * as React from "react";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import { updatePassword } from "../../lib/api/auth";
import { PageLayout } from "./PageLayout";

export function UpdatePasswordPage() {
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event) => {
            if (event === "PASSWORD_RECOVERY") {
                setReady(true);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password.trim()) {
            toast.error("Введіть новий пароль");
            return;
        }

        try {
            setLoading(true);
            await updatePassword(password.trim());
            toast.success("Пароль оновлено");
            window.location.hash = "#page/login";
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося оновити пароль");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout
            title="Новий пароль"
            subtitle="Встановіть новий пароль для доступу до партнерського кабінета."
        >
            {!ready ? (
                <p>Перейдіть за посиланням із листа для відновлення доступу.</p>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-[560px] space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Новий пароль"
                        className="w-full border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-60"
                    >
                        {loading ? "Оновлення..." : "Оновити пароль"}
                    </button>
                </form>
            )}
        </PageLayout>
    );
}
