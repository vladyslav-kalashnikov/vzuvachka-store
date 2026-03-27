import * as React from "react";
import {
    Save, Trash2, Edit2, UploadCloud, Search, Image as ImageIcon, Package, Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "./PageLayout";
import { supabase } from "../../lib/supabase";
import {
    fetchAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct,
    type AdminProduct, type AdminProductInput,
} from "../../lib/api/adminProducts";
import { AdminWorkspace } from "../components/AdminWorkspace";

const BUCKET = "product-images";
const MAX_IMAGE_MB = 4;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

type TabKey = "form" | "list";

const emptyForm = {
    slug: "", name: "", type: "", description: "", price: "", old_price: "", badge: "",
    image: "", gallery: "", category: "", subcategory: "", sizes: "36,37,38,39,40",
    colors: "Black,White", details: "", in_stock: true,
};

function slugify(value: string) {
    return String(value || "").toLowerCase().trim().replace(/[^a-z0-9а-яіїєґ]+/gi, "-").replace(/^-+/, "").replace(/-+$/, "");
}

function parseCommaList(value: string) {
    return String(value || "").split(",").map((x) => x.trim()).filter(Boolean);
}

function resolveStorageUrl(raw: string) {
    if (!raw) return "";
    if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(raw);
    return data.publicUrl;
}

async function uploadOneImage(file: File) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}

export function AdminProductsPage() {
    const [tab, setTab] = React.useState<TabKey>("list");
    const [products, setProducts] = React.useState<AdminProduct[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [query, setQuery] = React.useState("");
    const [form, setForm] = React.useState(emptyForm);
    const [isDragging, setIsDragging] = React.useState(false);

    const productStats = React.useMemo(() => {
        const activeProducts = products.filter((p) => p.in_stock).length;
        const categoriesCount = new Set(products.flatMap((p) => p.category)).size;
        const withGallery = products.filter((p) => p.gallery.length > 0).length;

        return [
            { label: "Усього SKU", value: String(products.length), note: "В каталозі." },
            { label: "Активні SKU", value: String(activeProducts), note: "Доступні до продажу." },
            { label: "Сегменти", value: String(categoriesCount), note: "Категорії асортименту." },
            { label: "З фото", value: String(withGallery), note: "SKU з візуалами." },
        ];
    }, [products]);

    const loadProducts = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchAdminProducts();
            setProducts(data);
        } catch (error) {
            toast.error("Не вдалося завантажити товари");
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => { loadProducts(); }, [loadProducts]);

    const filteredProducts = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p) => `${p.name} ${p.slug} ${p.type}`.toLowerCase().includes(q));
    }, [products, query]);

    const galleryUrls = React.useMemo(() => {
        const values = parseCommaList(form.gallery);
        const merged = form.image.trim() ? [form.image.trim(), ...values.filter((x) => x !== form.image.trim())] : values;
        return Array.from(new Set(merged));
    }, [form.gallery, form.image]);

    const resetForm = () => { setEditingId(null); setForm(emptyForm); setTab("list"); };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? target.checked : value }));
    };

    const handleEdit = (product: AdminProduct) => {
        setEditingId(product.id);
        setForm({
            slug: product.slug, name: product.name, type: product.type, description: product.description,
            price: String(product.price), old_price: product.old_price == null ? "" : String(product.old_price),
            badge: product.badge ?? "", image: product.image, gallery: product.gallery.join(", "),
            category: product.category.join(", "), subcategory: product.subcategory.join(", "),
            sizes: product.sizes.join(", "), colors: product.colors.join(", "), details: product.details.join(", "),
            in_stock: product.in_stock,
        });
        setTab("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (product: AdminProduct) => {
        if (!window.confirm(`Видалити товар "${product.name}"?`)) return;
        try {
            await deleteAdminProduct(product.id);
            setProducts((prev) => prev.filter((x) => x.id !== product.id));
            if (editingId === product.id) resetForm();
            toast.success("Товар видалено");
        } catch (error) {
            toast.error("Не вдалося видалити товар");
        }
    };

    const handleUploadFiles = async (files: FileList | File[]) => {
        const arr = Array.from(files || []);
        if (!arr.length) return;
        const valid = arr.filter((f) => f.size <= MAX_IMAGE_BYTES);
        if (arr.length > valid.length) toast.error(`Деякі фото більші за ${MAX_IMAGE_MB}MB`);
        if (!valid.length) return;

        try {
            setUploading(true);
            const uploaded: string[] = [];
            for (const file of valid) { uploaded.push(await uploadOneImage(file)); }
            setForm((prev) => ({
                ...prev,
                image: prev.image || uploaded[0] || "",
                gallery: Array.from(new Set([...parseCommaList(prev.gallery), ...uploaded])).join(", "),
            }));
            toast.success("Фото завантажено");
        } catch (error) {
            toast.error("Помилка завантаження фото");
        } finally {
            setUploading(false); setIsDragging(false);
        }
    };

    const removeGalleryImage = (url: string) => {
        setForm((prev) => {
            const nextGallery = parseCommaList(prev.gallery).filter((x) => x !== url);
            return { ...prev, image: prev.image === url ? nextGallery[0] || "" : prev.image, gallery: nextGallery.join(", ") };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalSlug = slugify(form.slug || form.name);
        if (!finalSlug || !form.name.trim() || !form.type.trim() || !form.description.trim() || !form.price.trim() || !form.image.trim()) {
            toast.error("Заповніть усі обов'язкові поля та додайте головне фото"); return;
        }

        const payload: AdminProductInput = {
            slug: finalSlug, name: form.name.trim(), type: form.type.trim(), description: form.description.trim(),
            price: Number(form.price), old_price: form.old_price.trim() ? Number(form.old_price) : null,
            badge: form.badge.trim() || null, image: form.image.trim(), gallery: galleryUrls,
            category: parseCommaList(form.category), subcategory: parseCommaList(form.subcategory),
            sizes: parseCommaList(form.sizes), colors: parseCommaList(form.colors), details: parseCommaList(form.details),
            in_stock: form.in_stock,
        };

        try {
            setSaving(true);
            if (editingId) {
                const updated = await updateAdminProduct(editingId, payload);
                setProducts((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
                toast.success("Товар оновлено");
            } else {
                const created = await createAdminProduct(payload);
                setProducts((prev) => [created, ...prev]);
                toast.success("Товар створено");
            }
            resetForm();
        } catch (error) { toast.error("Помилка збереження"); } finally { setSaving(false); }
    };

    return (
        <PageLayout title="B2B-КАТАЛОГ І SKU" subtitle="Керуйте асортиментом, цінами та наявністю.">
            <section className="space-y-8">
                <AdminWorkspace
                    active="products"
                    stats={productStats}
                    actions={
                        <div className="flex max-w-md rounded-none border border-white/10 bg-black p-1 tech-clip">
                            <button onClick={() => setTab("list")} className={`flex-1 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] transition-colors ${tab === "list" ? "bg-red-600 text-white" : "text-gray-500 hover:text-white"}`}>Каталог</button>
                            <button onClick={() => { resetForm(); setTab("form"); }} className={`flex-1 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] transition-colors ${tab === "form" ? "bg-red-600 text-white" : "text-gray-500 hover:text-white"}`}>Додати SKU</button>
                        </div>
                    }
                />

                {tab === "form" ? (
                    <form onSubmit={handleSubmit} className="tech-clip premium-panel border border-white/10 bg-[#111] p-6 md:p-8">
                        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                            <h2 className="text-xl font-black uppercase text-white copper-text copper-shadow">{editingId ? "Редагування SKU" : "Новий SKU"}</h2>
                            <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"><Trash2 className="h-4 w-4" /> Очистити</button>
                        </div>

                        <div className="space-y-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Назва товару *</label>
                                    <input name="name" value={form.name} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="Кросівки зимові" required />
                                </div>
                                <div>
                                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Slug (URL) *</label>
                                    <input name="slug" value={form.slug} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="krosivki-zymovi" required />
                                </div>
                            </div>

                            <div className="grid gap-5 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Тип взуття *</label>
                                    <input name="type" value={form.type} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="Черевики" required />
                                </div>
                                <div>
                                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Оптова ціна (₴) *</label>
                                    <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="1500" required />
                                </div>
                                <div>
                                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">РРЦ (Стара ціна)</label>
                                    <input name="old_price" type="number" value={form.old_price} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="2500" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Опис *</label>
                                <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" required />
                            </div>

                            {/* Завантаження фото */}
                            <div className="border border-white/10 bg-black/40 p-5">
                                <label className="mb-4 block text-[10px] font-black uppercase tracking-widest text-gray-500">Фотографії (Перша - головна)</label>
                                <input id="photo-upload" type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) handleUploadFiles(e.target.files); e.target.value = ""; }} />

                                <div onClick={() => !uploading && document.getElementById("photo-upload")?.click()} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (!uploading && e.dataTransfer.files?.length) handleUploadFiles(e.dataTransfer.files); }} className={`flex min-h-[150px] cursor-pointer flex-col items-center justify-center border-2 border-dashed transition-colors ${isDragging ? "border-red-500 bg-red-500/10" : "border-white/20 hover:border-red-500/50"}`}>
                                    <UploadCloud className="h-8 w-8 text-white/50 mb-3" />
                                    <p className="text-sm font-black text-white">{uploading ? "Завантаження..." : "Натисніть або перетягніть фото сюди"}</p>
                                </div>

                                {galleryUrls.length > 0 && (
                                    <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
                                        {galleryUrls.map((url) => (
                                            <div key={url} className={`relative aspect-square border ${form.image === url ? "border-red-500" : "border-white/10"}`}>
                                                <img src={resolveStorageUrl(url)} alt="" className="h-full w-full object-cover" />
                                                <button type="button" onClick={(e) => { e.stopPropagation(); removeGalleryImage(url); }} className="absolute right-1 top-1 bg-black/80 p-1 text-red-500 hover:bg-red-600 hover:text-white"><Trash2 className="h-4 w-4" /></button>
                                                {form.image !== url && <button type="button" onClick={(e) => { e.stopPropagation(); setForm(p => ({...p, image: url})) }} className="absolute bottom-1 left-1 bg-black/80 px-2 py-1 text-[8px] font-black text-white hover:text-red-500">MAIN</button>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div><label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Категорії (через кому)</label><input name="category" value={form.category} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="men, women, sale" /></div>
                                <div><label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Підкатегорії</label><input name="subcategory" value={form.subcategory} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="sneakers, boots" /></div>
                                <div><label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Розміри (через кому)</label><input name="sizes" value={form.sizes} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="41,42,43,44,45" /></div>
                                <div><label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Кольори</label><input name="colors" value={form.colors} onChange={handleChange} className="w-full border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-red-500 transition-colors" placeholder="Black, White" /></div>
                            </div>

                            <label className="flex items-center gap-3 border border-white/10 bg-black/40 p-4 cursor-pointer hover:border-red-500/50 transition-colors">
                                <input type="checkbox" name="in_stock" checked={form.in_stock} onChange={handleChange} className="h-5 w-5 accent-red-600" />
                                <div>
                                    <p className="text-sm font-black uppercase tracking-[0.1em] text-white">Активний для продажу</p>
                                    <p className="text-xs text-gray-500">Показувати товар в каталозі</p>
                                </div>
                            </label>

                            <button type="submit" disabled={saving || uploading} className="tech-clip w-full bg-red-600 py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-50">
                                <Save className="h-4 w-4 inline mr-2" /> {saving ? "Збереження..." : editingId ? "Оновити товар" : "Створити товар"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="tech-clip premium-panel border border-white/10 bg-[#111] p-6 md:p-8">
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Пошук по назві або типу" className="w-full border border-white/10 bg-black py-4 pl-11 pr-4 text-white outline-none focus:border-red-500 transition-colors" />
                        </div>

                        <div className="space-y-4">
                            {loading ? <p className="text-gray-500">Завантаження...</p> : filteredProducts.map((product) => (
                                <article key={product.id} className="border border-white/10 bg-black/40 p-4 flex gap-4 transition-colors hover:border-white/30">
                                    <img src={resolveStorageUrl(product.image)} alt={product.name} className="h-24 w-24 object-cover border border-white/5" />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-black uppercase text-white hover:text-red-500">{product.name}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{product.type} • {product.price} ₴</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 text-[8px] font-black uppercase ${product.in_stock ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{product.in_stock ? 'В наявності' : 'Неактивний'}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => handleEdit(product)} className="p-3 border border-white/10 bg-black text-white hover:border-red-500 hover:text-red-500 transition-colors"><Edit2 className="h-4 w-4" /></button>
                                        <button onClick={() => handleDelete(product)} className="p-3 border border-white/10 bg-black text-red-500 hover:bg-red-600 hover:text-white transition-colors"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </PageLayout>
    );
}