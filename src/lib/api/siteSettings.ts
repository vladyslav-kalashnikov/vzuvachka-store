import { supabase } from "../supabase";

export type SiteSettingKey = string;

export async function fetchSiteSettings() {
    const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

    if (error) {
        throw error;
    }

    const result: Record<string, string> = {};

    for (const row of data ?? []) {
        result[row.key] = row.value ?? "";
    }

    return result;
}

export async function upsertSiteSetting(
    key: SiteSettingKey,
    value: string
) {
    const { error } = await supabase
        .from("site_settings")
        .upsert(
            {
                key,
                value,
            },
            { onConflict: "key" }
        );

    if (error) {
        throw error;
    }
}
