import * as React from "react";
import { supabase } from "../../lib/supabase";
import { getMyProfile, resolveAuthRole } from "../../lib/api/auth";

type AuthUserState = {
    isLoading: boolean;
    user: { id: string; email?: string | null } | null;
    profile: {
        id: string;
        email?: string | null;
        full_name?: string | null;
        role?: string | null;
    } | null;
    isAdmin: boolean;
};

export function useAuthUser(): AuthUserState {
    const [state, setState] = React.useState<AuthUserState>({
        isLoading: true,
        user: null,
        profile: null,
        isAdmin: false,
    });

    React.useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!mounted) return;

                if (!user) {
                    setState({
                        isLoading: false,
                        user: null,
                        profile: null,
                        isAdmin: false,
                    });
                    return;
                }

                const profile = await getMyProfile();

                if (!mounted) return;

                setState({
                    isLoading: false,
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                    profile,
                    isAdmin: resolveAuthRole(user, profile?.role) === "admin",
                });
            } catch {
                if (!mounted) return;

                setState({
                    isLoading: false,
                    user: null,
                    profile: null,
                    isAdmin: false,
                });
            }
        };

        load();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            load();
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return state;
}
