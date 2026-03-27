import {
    categoryMeta,
    categorySections,
    partnerContact,
} from "../data/b2bContent";
import type { ProductCategory } from "../data/products";

export type SiteSettingsRecord = Record<string, string>;

function trimmedValue(value: string | undefined) {
    if (typeof value !== "string") {
        return "";
    }

    return value.trim();
}

export function getSetting(
    settings: SiteSettingsRecord,
    key: string,
    fallback: string
) {
    const value = trimmedValue(settings[key]);
    return value || fallback;
}

export function getSettingList(
    settings: SiteSettingsRecord,
    key: string,
    fallback: string[]
) {
    const value = trimmedValue(settings[key]);

    if (!value) {
        return fallback;
    }

    return value
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function toPhoneHref(phone: string) {
    const raw = phone.replace(/[^\d+]/g, "");

    if (!raw) {
        return partnerContact.phoneHref;
    }

    return `tel:${raw.startsWith("+") ? raw : `+${raw}`}`;
}

export function getPartnerContactInfo(settings: SiteSettingsRecord) {
    const email = getSetting(settings, "contact_email", partnerContact.email);
    const phone = getSetting(settings, "contact_phone", partnerContact.phone);
    const address = getSetting(
        settings,
        "contact_address",
        partnerContact.address
    );
    const hours = getSetting(settings, "contact_hours", partnerContact.hours);
    const mapUrl = getSetting(
        settings,
        "contact_map_url",
        "https://maps.google.com/?q=Хмельницький,+Водопровідна+75/1"
    );

    return {
        email,
        phone,
        address,
        hours,
        mapUrl,
        emailHref: `mailto:${email}`,
        phoneHref: toPhoneHref(phone),
    };
}

const categoryKeyMap: Record<
    ProductCategory,
    {
        title: string;
        shortLabel: string;
        badge: string;
        description: string;
        link: string;
        image: string;
        metaTitle: string;
        metaSubtitle: string;
        metaTagline: string;
        metaCta: string;
    }
> = {
    women: {
        title: "category_women_title",
        shortLabel: "category_women_short_label",
        badge: "category_women_tag",
        description: "category_women_desc",
        link: "category_women_link",
        image: "category_women_image",
        metaTitle: "catalog_women_title",
        metaSubtitle: "catalog_women_subtitle",
        metaTagline: "catalog_women_tagline",
        metaCta: "catalog_women_cta",
    },
    men: {
        title: "category_men_title",
        shortLabel: "category_men_short_label",
        badge: "category_men_tag",
        description: "category_men_desc",
        link: "category_men_link",
        image: "category_men_image",
        metaTitle: "catalog_men_title",
        metaSubtitle: "catalog_men_subtitle",
        metaTagline: "catalog_men_tagline",
        metaCta: "catalog_men_cta",
    },
    kids: {
        title: "category_kids_title",
        shortLabel: "category_kids_short_label",
        badge: "category_kids_tag",
        description: "category_kids_desc",
        link: "category_kids_link",
        image: "category_kids_image",
        metaTitle: "catalog_kids_title",
        metaSubtitle: "catalog_kids_subtitle",
        metaTagline: "catalog_kids_tagline",
        metaCta: "catalog_kids_cta",
    },
    work: {
        title: "category_work_title",
        shortLabel: "category_work_short_label",
        badge: "category_work_tag",
        description: "category_work_desc",
        link: "category_work_link",
        image: "category_work_image",
        metaTitle: "catalog_work_title",
        metaSubtitle: "catalog_work_subtitle",
        metaTagline: "catalog_work_tagline",
        metaCta: "catalog_work_cta",
    },
    accessories: {
        title: "category_accessories_title",
        shortLabel: "category_accessories_short_label",
        badge: "category_accessories_tag",
        description: "category_accessories_desc",
        link: "category_accessories_link",
        image: "category_accessories_image",
        metaTitle: "catalog_accessories_title",
        metaSubtitle: "catalog_accessories_subtitle",
        metaTagline: "catalog_accessories_tagline",
        metaCta: "catalog_accessories_cta",
    },
    sale: {
        title: "category_sale_title",
        shortLabel: "category_sale_short_label",
        badge: "category_sale_tag",
        description: "category_sale_desc",
        link: "category_sale_link",
        image: "category_sale_image",
        metaTitle: "catalog_sale_title",
        metaSubtitle: "catalog_sale_subtitle",
        metaTagline: "catalog_sale_tagline",
        metaCta: "catalog_sale_cta",
    },
};

export function getManagedCategorySections(settings: SiteSettingsRecord) {
    return categorySections.map((section) => {
        const map = categoryKeyMap[section.key];

        return {
            ...section,
            label: getSetting(settings, map.title, section.label),
            shortLabel: getSetting(settings, map.shortLabel, section.shortLabel),
            badge: getSetting(settings, map.badge, section.badge),
            description: getSetting(settings, map.description, section.description),
            href: getSetting(settings, map.link, section.href),
        };
    });
}

export function getManagedCategoryMeta(
    settings: SiteSettingsRecord,
    category: ProductCategory
) {
    const base = categoryMeta[category];
    const map = categoryKeyMap[category];

    return {
        title: getSetting(settings, map.metaTitle, base.title),
        subtitle: getSetting(settings, map.metaSubtitle, base.subtitle),
        tagline: getSetting(settings, map.metaTagline, base.tagline),
        cta: getSetting(settings, map.metaCta, base.cta),
    };
}
