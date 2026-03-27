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

type ResolvedAuthUserState = Omit<AuthUserState, "isLoading">;

let pendingAuthStateRequest: Promise<ResolvedAuthUserState> | null = null;

async function loadSharedAuthState(): Promise<ResolvedAuthUserState> {
    if (!pendingAuthStateRequest) {
        pendingAuthStateRequest = (async () => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                    return {
                        user: null,
                        profile: null,
                        isAdmin: false,
                    };
                }

                const profile = await getMyProfile();

                return {
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                    profile,
                    isAdmin: resolveAuthRole(user, profile?.role) === "admin",
                };
            } catch {
                return {
                    user: null,
                    profile: null,
                    isAdmin: false,
                };
            } finally {
                pendingAuthStateRequest = null;
            }
        })();
    }

    return pendingAuthStateRequest;
}

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
            const nextState = await loadSharedAuthState();

            if (!mounted) return;

            setState({
                isLoading: false,
                ...nextState,
            });
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
