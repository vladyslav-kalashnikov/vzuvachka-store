import * as React from "react";
import { PageLayout } from "./PageLayout";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import { AdminWorkspace } from "../components/AdminWorkspace";
import { fetchSiteSettings, upsertSiteSetting, type SiteSettingKey } from "../../lib/api/siteSettings";
import { imageUploadLimits, prepareImageForUpload } from "../lib/imageUpload";
import { siteSettingsSections } from "../lib/siteSettingsSchema";

const BUCKET = "product-images";

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
        try {
            setUploadingKey(keyName);
            const preparedFile = await prepareImageForUpload(file);
            const url = await uploadOneImage(preparedFile);
            setValues(p => ({ ...p, [keyName]: url }));
            if (preparedFile.size < file.size) {
                toast.success("Фото стиснуто і завантажено");
            } else {
                toast.success("Фото завантажено");
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : `Помилка завантаження. Спробуйте файл до ${imageUploadLimits.maxSourceMb} MB`);
        } finally { setUploadingKey(null); }
    };

    const handleSaveAll = async () => {
        try {
            setSaving(true);
            for (const section of siteSettingsSections) {
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

                {loading ? <p className="text-gray-500">Завантаження...</p> : siteSettingsSections.map((section) => (
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
                                            {field.description && (
                                                <p className="mb-4 text-xs leading-6 text-gray-500">{field.description}</p>
                                            )}
                                            {value ? <img src={resolveStorageUrl(value)} alt="" className="h-40 w-full object-cover border border-white/10 mb-4" /> : <div className="h-40 border border-dashed border-white/10 mb-4 flex items-center justify-center text-gray-600">Немає фото</div>}
                                            <label className="flex cursor-pointer items-center justify-center border border-white/20 bg-black py-3 text-[10px] font-black uppercase tracking-widest text-white hover:border-red-500 hover:text-red-500 transition">
                                                {uploadingKey === field.keyName ? "Завантаження..." : "Обрати фото"}
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(field.keyName, e.target.files?.[0])} />
                                            </label>
                                            <input
                                                value={value}
                                                onChange={(e) => handleChange(field.keyName, e.target.value)}
                                                placeholder="або вставте прямий URL картинки"
                                                className="mt-4 w-full border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-red-500"
                                            />
                                            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                                                Можна завантажувати файли до {imageUploadLimits.maxSourceMb} MB. Великі фото стискаються автоматично.
                                            </p>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={field.keyName} className="border border-white/10 bg-black/40 p-5">
                                        <label className="mb-3 block text-[10px] font-black uppercase tracking-widest text-gray-500">{field.title}</label>
                                        {field.description && (
                                            <p className="mb-3 text-xs leading-6 text-gray-500">{field.description}</p>
                                        )}
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
