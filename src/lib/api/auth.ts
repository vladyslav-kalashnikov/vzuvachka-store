import type { User } from "@supabase/supabase-js";
import { supabase } from "../supabase";

function normalizeRole(value: unknown) {
    if (typeof value !== "string") return null;
    const role = value.trim().toLowerCase();
    return role || null;
}

export function resolveAuthRole(
    user: Pick<User, "app_metadata"> | null | undefined,
    profileRole?: unknown
) {
    return normalizeRole(profileRole) ?? normalizeRole(user?.app_metadata?.role) ?? "user";
}

export async function signUpWithEmail(
    email: string,
    password: string,
    fullName?: string
) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName ?? "",
            },
        },
    });

    if (error) throw new Error(error.message);

    const userId = data.user?.id;
    if (userId) {
        const { error: profileError } = await supabase.from("profiles").upsert({
            id: userId,
            email,
            full_name: fullName ?? null,
            role: "user",
        });

        if (profileError) {
            throw new Error(profileError.message);
        }
    }

    return data;
}

export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function sendResetPassword(email: string) {
    const redirectTo = `${window.location.origin}/#page/update-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
    });

    if (error) throw new Error(error.message);
}

export async function updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) throw new Error(error.message);
    return data;
}

export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data.user;
}

export async function getMyProfile() {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    if (error) throw new Error(error.message);

    if (data) {
        return {
            ...data,
            role: resolveAuthRole(user, data.role),
        };
    }

    const fallbackProfile = {
        id: user.id,
        email: user.email ?? null,
        full_name:
            typeof user.user_metadata?.full_name === "string"
                ? user.user_metadata.full_name
                : null,
        role: resolveAuthRole(user),
    };

    const { data: createdProfile, error: profileError } = await supabase
        .from("profiles")
        .upsert(fallbackProfile)
        .select("*")
        .single();

    if (profileError) throw new Error(profileError.message);
    return createdProfile;
}
