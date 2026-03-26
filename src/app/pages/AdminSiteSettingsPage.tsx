import * as React from "react";
import { PageLayout } from "./PageLayout";
import {
    UploadCloud,
    Save,
    Image as ImageIcon,
    Settings,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import { AdminWorkspace } from "../components/AdminWorkspace";
import {
    fetchSiteSettings,
    upsertSiteSetting,
    type SiteSettingKey,
} from "../../lib/api/siteSettings";

const BUCKET = "product-images";
const MAX_IMAGE_MB = 4;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

type SettingField =
    | {
    type: "image";
    keyName: SiteSettingKey;
    title: string;
    description?: string;
}
    | {
    type: "text";
    keyName: SiteSettingKey;
    title: string;
    placeholder?: string;
}
    | {
    type: "textarea";
    keyName: SiteSettingKey;
    title: string;
    placeholder?: string;
    rows?: number;
};

type SettingSection = {
    title: string;
    description?: string;
    fields: SettingField[];
};

const sections: SettingSection[] = [
    {
        title: "Навігаційні візуали",
        description: "Фото для меню сегментів у header B2B-вітрини.",
        fields: [
            {
                type: "image",
                keyName: "menu_women_image",
                title: "Жіночий сегмент",
            },
            {
                type: "image",
                keyName: "menu_men_image",
                title: "Чоловічий сегмент",
            },
            {
                type: "image",
                keyName: "menu_accessories_image",
                title: "Аксесуари / допродаж",
            },
        ],
    },

    {
        title: "Hero B2B-порталу",
        description: "Перший екран wholesale-сайту й ключовий меседж для партнера.",
        fields: [
            { type: "image", keyName: "hero_image", title: "Hero фото" },
            {
                type: "text",
                keyName: "hero_badge",
                title: "Hero badge",
                placeholder: "Wholesale platform / ready stock / MOQ",
            },
            {
                type: "text",
                keyName: "hero_title_line_1",
                title: "Hero title line 1",
                placeholder: "Підкорюй",
            },
            {
                type: "text",
                keyName: "hero_title_line_2",
                title: "Hero title line 2",
                placeholder: "Будь-який бруд.",
            },
            {
                type: "textarea",
                keyName: "hero_description",
                title: "Hero опис",
                rows: 4,
            },
            {
                type: "text",
                keyName: "hero_button_text",
                title: "Текст CTA",
                placeholder: "Перейти до B2B-каталогу",
            },
            {
                type: "text",
                keyName: "hero_button_link",
                title: "Посилання CTA",
                placeholder: "#categories",
            },
        ],
    },

    {
        title: "Сегменти каталогу",
        description: "Ключові категорії, з яких партнер стартує закупівлю.",
        fields: [
            {
                type: "text",
                keyName: "categories_title_line_1",
                title: "Заголовок рядок 1",
            },
            {
                type: "text",
                keyName: "categories_title_line_2",
                title: "Заголовок рядок 2",
            },

            { type: "text", keyName: "category_women_title", title: "Women title" },
            { type: "text", keyName: "category_women_tag", title: "Women tag" },
            { type: "image", keyName: "category_women_image", title: "Women image" },
            { type: "text", keyName: "category_women_link", title: "Women link" },

            { type: "text", keyName: "category_men_title", title: "Men title" },
            { type: "text", keyName: "category_men_tag", title: "Men tag" },
            { type: "image", keyName: "category_men_image", title: "Men image" },
            { type: "text", keyName: "category_men_link", title: "Men link" },

            { type: "text", keyName: "category_kids_title", title: "Kids title" },
            { type: "text", keyName: "category_kids_tag", title: "Kids tag" },
            { type: "image", keyName: "category_kids_image", title: "Kids image" },
            { type: "text", keyName: "category_kids_link", title: "Kids link" },

            { type: "text", keyName: "category_work_title", title: "Work title" },
            { type: "text", keyName: "category_work_tag", title: "Work tag" },
            { type: "image", keyName: "category_work_image", title: "Work image" },
            { type: "text", keyName: "category_work_link", title: "Work link" },
        ],
    },

    {
        title: "Партнерський блок",
        fields: [
            { type: "text", keyName: "collab_badge", title: "Badge" },
            { type: "text", keyName: "collab_title_line_1", title: "Title line 1" },
            { type: "text", keyName: "collab_title_line_2", title: "Title line 2" },
            {
                type: "textarea",
                keyName: "collab_description",
                title: "Опис",
                rows: 4,
            },
            { type: "text", keyName: "collab_button_text", title: "Текст кнопки" },
            { type: "text", keyName: "collab_button_link", title: "Link кнопки" },
            { type: "image", keyName: "collab_image", title: "Праве фото" },
        ],
    },

    {
        title: "Аргументи для дилерів",
        fields: [
            { type: "text", keyName: "whychoose_badge", title: "Badge" },
            { type: "text", keyName: "whychoose_title", title: "Title" },
            {
                type: "text",
                keyName: "whychoose_title_outline",
                title: "Title outline",
            },

            {
                type: "text",
                keyName: "whychoose_card_1_title",
                title: "Картка 1 title",
            },
            {
                type: "textarea",
                keyName: "whychoose_card_1_desc",
                title: "Картка 1 desc",
                rows: 3,
            },

            {
                type: "text",
                keyName: "whychoose_card_2_title",
                title: "Картка 2 title",
            },
            {
                type: "textarea",
                keyName: "whychoose_card_2_desc",
                title: "Картка 2 desc",
                rows: 3,
            },

            {
                type: "text",
                keyName: "whychoose_card_3_title",
                title: "Картка 3 title",
            },
            {
                type: "textarea",
                keyName: "whychoose_card_3_desc",
                title: "Картка 3 desc",
                rows: 3,
            },
        ],
    },

    {
        title: "Кейси та відгуки",
        fields: [
            { type: "text", keyName: "reviews_badge", title: "Badge" },
            {
                type: "textarea",
                keyName: "review_1_text",
                title: "Review 1 text",
                rows: 4,
            },
            { type: "text", keyName: "review_1_author", title: "Review 1 author" },
            {
                type: "textarea",
                keyName: "review_2_text",
                title: "Review 2 text",
                rows: 4,
            },
            { type: "text", keyName: "review_2_author", title: "Review 2 author" },
        ],
    },

    {
        title: "Lead-захоплення",
        fields: [
            { type: "text", keyName: "subscribe_badge", title: "Badge" },
            { type: "text", keyName: "subscribe_title", title: "Title" },
            {
                type: "textarea",
                keyName: "subscribe_description",
                title: "Description",
                rows: 3,
            },
            {
                type: "text",
                keyName: "subscribe_button_text",
                title: "Button text",
            },
        ],
    },
];

function resolveStorageUrl(raw: string) {
    if (!raw) return "";
    if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(raw);
    return data.publicUrl;
}

async function uploadOneImage(file: File) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `site-settings/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
    });

    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}

export function AdminSiteSettingsPage() {
    const [values, setValues] = React.useState<Record<string, string>>({});
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [uploadingKey, setUploadingKey] = React.useState<string | null>(null);
    const contentStats = React.useMemo(() => {
        const fields = sections.flatMap((section) => section.fields);
        const filledFields = fields.filter((field) => (values[field.keyName] || "").trim()).length;
        const imageFields = fields.filter((field) => field.type === "image");
        const filledImages = imageFields.filter((field) => (values[field.keyName] || "").trim()).length;
        const readiness =
            fields.length === 0 ? 0 : Math.round((filledFields / fields.length) * 100);

        return [
            {
                label: "Усього полів",
                value: String(fields.length),
                note: "Точки керування B2B-вітриною й контентом.",
            },
            {
                label: "Заповнено",
                value: String(filledFields),
                note: "Полів, де вже є контент або посилання.",
            },
            {
                label: "Фото-блоків",
                value: `${filledImages}/${imageFields.length}`,
                note: "Візуали для hero, меню й сегментів.",
            },
            {
                label: "Готовність",
                value: `${readiness}%`,
                note: "Умовна повнота контентного контуру.",
            },
        ];
    }, [values]);

    React.useEffect(() => {
        let active = true;

        (async () => {
            try {
                const data = await fetchSiteSettings();
                if (active) {
                    setValues(data);
                }
            } catch (error) {
                console.error(error);
                toast.error("Не вдалося завантажити налаштування");
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, []);

    const handleChange = (keyName: SiteSettingKey, value: string) => {
        setValues((prev) => ({
            ...prev,
            [keyName]: value,
        }));
    };

    const handleUpload = async (keyName: SiteSettingKey, file?: File | null) => {
        if (!file) return;

        if (file.size > MAX_IMAGE_BYTES) {
            toast.error(`Файл більший за ${MAX_IMAGE_MB}MB`);
            return;
        }

        try {
            setUploadingKey(keyName);
            const url = await uploadOneImage(file);

            setValues((prev) => ({
                ...prev,
                [keyName]: url,
            }));

            toast.success("Фото завантажено");
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося завантажити фото");
        } finally {
            setUploadingKey(null);
        }
    };

    const handleSaveAll = async () => {
        try {
            setSaving(true);

            for (const section of sections) {
                for (const field of section.fields) {
                    await upsertSiteSetting(field.keyName, values[field.keyName] || "");
                }
            }

            toast.success("Усі налаштування головної сторінки збережено");
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося зберегти налаштування");
        } finally {
            setSaving(false);
        }
    };

    return (
        <PageLayout
            title="B2B-контент і вітрина"
            subtitle="Керуйте hero, сегментами, довірою та lead-захопленням на wholesale-сайті."
        >
            <section className="space-y-8">
                <AdminWorkspace
                    active="content"
                    stats={contentStats}
                    actions={
                        <button
                            type="button"
                            onClick={handleSaveAll}
                            disabled={saving || loading}
                            className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-60"
                        >
                            <Save className="h-4 w-4" />
                            {saving ? "Збереження..." : "Зберегти все"}
                        </button>
                    }
                />

                {loading ? (
                    <div className="rounded-[28px] border border-white/10 bg-black/20 p-8 text-sm text-gray-400">
                        Завантаження...
                    </div>
                ) : (
                    sections.map((section) => (
                        <div
                            key={section.title}
                            className="rounded-[28px] border border-white/10 bg-black/20 p-6 md:p-8"
                        >
                            <div className="mb-6">
                                <div className="mb-2 flex items-center gap-3">
                                    <Settings className="h-5 w-5 text-red-500" />
                                    <h2 className="text-2xl font-black uppercase text-white">
                                        {section.title}
                                    </h2>
                                </div>

                                {section.description && (
                                    <p className="text-sm text-gray-400">{section.description}</p>
                                )}
                            </div>

                            <div className="grid gap-6 xl:grid-cols-2">
                                {section.fields.map((field) => {
                                    const value = values[field.keyName] || "";

                                    if (field.type === "image") {
                                        const preview = resolveStorageUrl(value);
                                        const isUploading = uploadingKey === field.keyName;

                                        return (
                                            <div
                                                key={field.keyName}
                                                className="rounded-2xl border border-white/10 bg-[#111] p-4"
                                            >
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-black uppercase text-white">
                                                        {field.title}
                                                    </h3>
                                                    {field.description && (
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            {field.description}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-black">
                                                    {preview ? (
                                                        <img
                                                            src={preview}
                                                            alt={field.title}
                                                            className="h-56 w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-56 flex-col items-center justify-center gap-3 text-gray-500">
                                                            <ImageIcon className="h-7 w-7" />
                                                            <span className="text-sm">Немає фото</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <label className="mb-4 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-black px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500">
                                                    <UploadCloud className="h-4 w-4" />
                                                    {isUploading ? "Завантаження..." : "Завантажити фото"}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            void handleUpload(field.keyName, file);
                                                            e.currentTarget.value = "";
                                                        }}
                                                    />
                                                </label>

                                                <input
                                                    value={value}
                                                    onChange={(e) =>
                                                        handleChange(field.keyName, e.target.value)
                                                    }
                                                    placeholder="URL фото"
                                                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                                />
                                            </div>
                                        );
                                    }

                                    if (field.type === "textarea") {
                                        return (
                                            <div
                                                key={field.keyName}
                                                className="rounded-2xl border border-white/10 bg-[#111] p-4"
                                            >
                                                <label className="mb-3 block text-sm font-black uppercase tracking-[0.18em] text-white">
                                                    {field.title}
                                                </label>
                                                <textarea
                                                    rows={field.rows ?? 4}
                                                    value={value}
                                                    onChange={(e) =>
                                                        handleChange(field.keyName, e.target.value)
                                                    }
                                                    placeholder={field.placeholder || ""}
                                                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                                />
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={field.keyName}
                                            className="rounded-2xl border border-white/10 bg-[#111] p-4"
                                        >
                                            <label className="mb-3 block text-sm font-black uppercase tracking-[0.18em] text-white">
                                                {field.title}
                                            </label>
                                            <input
                                                value={value}
                                                onChange={(e) =>
                                                    handleChange(field.keyName, e.target.value)
                                                }
                                                placeholder={field.placeholder || ""}
                                                className="w-full rounded-xl border border-white/10 bg-black px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </section>
        </PageLayout>
    );
}
