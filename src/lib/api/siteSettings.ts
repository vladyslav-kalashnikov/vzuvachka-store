import { supabase } from "../supabase";

export type SiteSettingKey =
    | "menu_women_image"
    | "menu_men_image"
    | "menu_accessories_image"

    | "hero_image"
    | "hero_badge"
    | "hero_title_line_1"
    | "hero_title_line_2"
    | "hero_description"
    | "hero_button_text"
    | "hero_button_link"

    | "categories_title_line_1"
    | "categories_title_line_2"
    | "category_women_title"
    | "category_women_tag"
    | "category_women_image"
    | "category_women_link"
    | "category_men_title"
    | "category_men_tag"
    | "category_men_image"
    | "category_men_link"
    | "category_kids_title"
    | "category_kids_tag"
    | "category_kids_image"
    | "category_kids_link"
    | "category_work_title"
    | "category_work_tag"
    | "category_work_image"
    | "category_work_link"

    | "collab_badge"
    | "collab_title_line_1"
    | "collab_title_line_2"
    | "collab_description"
    | "collab_button_text"
    | "collab_button_link"
    | "collab_image"

    | "whychoose_badge"
    | "whychoose_title"
    | "whychoose_title_outline"
    | "whychoose_card_1_title"
    | "whychoose_card_1_desc"
    | "whychoose_card_2_title"
    | "whychoose_card_2_desc"
    | "whychoose_card_3_title"
    | "whychoose_card_3_desc"

    | "reviews_badge"
    | "review_1_text"
    | "review_1_author"
    | "review_2_text"
    | "review_2_author"

    | "subscribe_badge"
    | "subscribe_title"
    | "subscribe_description"
    | "subscribe_button_text";

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