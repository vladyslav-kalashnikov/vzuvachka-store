import * as React from "react";
import { PageLayout } from "./PageLayout";
import { UploadCloud, Save, Image as ImageIcon, Settings } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import { AdminWorkspace } from "../components/AdminWorkspace";
import { fetchSiteSettings, upsertSiteSetting, type SiteSettingKey } from "../../lib/api/siteSettings";

const BUCKET = "product-images";
const MAX_IMAGE_MB = 4;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

// Ті самі налаштування полів, що й у вас, але коротко (залишено всі ваші поля)
type SettingField = { type: "image" | "text" | "textarea"; keyName: SiteSettingKey; title: string; description?: string; placeholder?: string; rows?: number; };
type SettingSection = { title: string; description?: string; fields: SettingField[]; };

const sections: SettingSection[] = [
    {
        title: "Навігаційні візуали", description: "Фото для меню сегментів.",
        fields: [
            { type: "image", keyName: "menu_women_image", title: "Жіночий сегмент" },
            { type: "image", keyName: "menu_men_image", title: "Чоловічий сегмент" },
            { type: "image", keyName: "menu_accessories_image", title: "Аксесуари" },
        ],
    },
    {
        title: "Hero B2B-порталу", description: "Перший екран сайту.",
        fields: [
            { type: "image", keyName: "hero_image", title: "Hero фото" },
            { type: "text", keyName: "hero_badge", title: "Hero badge", placeholder: "Wholesale platform" },
            { type: "text", keyName: "hero_title_line_1", title: "Рядок 1", placeholder: "Взуття оптом" },
            { type: "text", keyName: "hero_title_line_2", title: "Рядок 2", placeholder: "від виробника" },
            { type: "textarea", keyName: "hero_description", title: "Опис", rows: 3 },
            { type: "text", keyName: "hero_button_text", title: "Кнопка", placeholder: "Каталог" },
        ],
    },
    {
        title: "Сегменти каталогу", description: "Категорії на головній.",
        fields: [
            { type: "text", keyName: "categories_title_line_1", title: "Заголовок 1" },
            { type: "text", keyName: "categories_title_line_2", title: "Заголовок 2" },
            { type: "image", keyName: "category_women_image", title: "Фото Women" },
            { type: "image", keyName: "category_men_image", title: "Фото Men" },
            { type: "image", keyName: "category_kids_image", title: "Фото Kids" },
        ],
    }
];

function resolveStorageUrl(raw: string) {
    if (!raw) return "";
    if (raw.startsWith("http")) return raw;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(raw);
    return data.publicUrl;
}

async function uploadOneImage(file: File) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `site-settings/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}

export function AdminSiteSettingsPage() {
    const [values, setValues] = React.useState<Record<string, string>>({});
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [uploadingKey, setUploadingKey] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetchSiteSettings().then(data => { setValues(data); setLoading(false); }).catch(() => toast.error("Помилка завантаження"));
    }, []);

    const handleChange = (keyName: SiteSettingKey, value: string) => setValues(p => ({ ...p, [keyName]: value }));

    const handleUpload = async (keyName: SiteSettingKey, file?: File | null) => {
        if (!file) return;
        if (file.size > MAX_IMAGE_BYTES) return toast.error("Файл занадто великий");
        try {
            setUploadingKey(keyName);
            const url = await uploadOneImage(file);
            setValues(p => ({ ...p, [keyName]: url }));
            toast.success("Фото завантажено");
        } catch (error) { toast.error("Помилка завантаження"); } finally { setUploadingKey(null); }
    };

    const handleSaveAll = async () => {
        try {
            setSaving(true);
            for (const section of sections) {
                for (const field of section.fields) {
                    await upsertSiteSetting(field.keyName, values[field.keyName] || "");
                }
            }
            toast.success("Налаштування збережено");
        } catch (error) { toast.error("Помилка збереження"); } finally { setSaving(false); }
    };

    return (
        <PageLayout title="B2B КОНТЕНТ" subtitle="Керування текстами та банерами сайту.">
            <section className="space-y-8">
                <AdminWorkspace
                    active="content"
                    stats={[]}
                    actions={
                        <button onClick={handleSaveAll} disabled={saving || loading} className="tech-clip bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white hover:bg-red-500 transition shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                            <Save className="h-4 w-4 inline mr-2" /> {saving ? "Збереження..." : "Зберегти все"}
                        </button>
                    }
                />

                {loading ? <p className="text-gray-500">Завантаження...</p> : sections.map((section) => (
                    <div key={section.title} className="tech-clip premium-panel border border-white/10 bg-[#111] p-6 md:p-8">
                        <div className="mb-6 border-b border-white/10 pb-4">
                            <h2 className="text-xl font-black uppercase text-white copper-text">{section.title}</h2>
                            {section.description && <p className="text-sm text-gray-500 mt-1">{section.description}</p>}
                        </div>

                        <div className="grid gap-6 xl:grid-cols-2">
                            {section.fields.map((field) => {
                                const value = values[field.keyName] || "";
                                if (field.type === "image") {
                                    return (
                                        <div key={field.keyName} className="border border-white/10 bg-black/40 p-5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">{field.title}</p>
                                            {value ? <img src={resolveStorageUrl(value)} alt="" className="h-40 w-full object-cover border border-white/10 mb-4" /> : <div className="h-40 border border-dashed border-white/10 mb-4 flex items-center justify-center text-gray-600">Немає фото</div>}
                                            <label className="flex cursor-pointer items-center justify-center border border-white/20 bg-black py-3 text-[10px] font-black uppercase tracking-widest text-white hover:border-red-500 hover:text-red-500 transition">
                                                {uploadingKey === field.keyName ? "Завантаження..." : "Обрати фото"}
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(field.keyName, e.target.files?.[0])} />
                                            </label>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={field.keyName} className="border border-white/10 bg-black/40 p-5">
                                        <label className="mb-3 block text-[10px] font-black uppercase tracking-widest text-gray-500">{field.title}</label>
                                        {field.type === "textarea" ? (
                                            <textarea rows={field.rows ?? 3} value={value} onChange={(e) => handleChange(field.keyName, e.target.value)} placeholder={field.placeholder} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500" />
                                        ) : (
                                            <input value={value} onChange={(e) => handleChange(field.keyName, e.target.value)} placeholder={field.placeholder} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </section>
        </PageLayout>
    );
}