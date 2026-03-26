import * as React from "react";
import {
    Save,
    Trash2,
    Edit2,
    UploadCloud,
    Search,
    Image as ImageIcon,
    Package,
    Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "./PageLayout";
import { supabase } from "../../lib/supabase";
import {
    fetchAdminProducts,
    createAdminProduct,
    updateAdminProduct,
    deleteAdminProduct,
    type AdminProduct,
    type AdminProductInput,
} from "../../lib/api/adminProducts";
import { AdminWorkspace } from "../components/AdminWorkspace";

const BUCKET = "product-images";
const MAX_IMAGE_MB = 4;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

type TabKey = "form" | "list";

const emptyForm = {
    slug: "",
    name: "",
    type: "",
    description: "",
    price: "",
    old_price: "",
    badge: "",
    image: "",
    gallery: "",
    category: "",
    subcategory: "",
    sizes: "36,37,38,39,40",
    colors: "Black,White",
    details: "",
    in_stock: true,
};

function slugify(value: string) {
    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9а-яіїєґ]+/gi, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}

function parseCommaList(value: string) {
    return String(value || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
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

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
    });

    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}

export function AdminProductsPage() {
    const [tab, setTab] = React.useState<TabKey>("form");
    const [products, setProducts] = React.useState<AdminProduct[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [query, setQuery] = React.useState("");
    const [form, setForm] = React.useState(emptyForm);
    const [isDragging, setIsDragging] = React.useState(false);
    const productStats = React.useMemo(() => {
        const activeProducts = products.filter((product) => product.in_stock).length;
        const categoriesCount = new Set(products.flatMap((product) => product.category)).size;
        const withGallery = products.filter((product) => product.gallery.length > 0).length;

        return [
            {
                label: "Усього SKU",
                value: String(products.length),
                note: "Позиції, які доступні в wholesale-каталозі.",
            },
            {
                label: "Активні SKU",
                value: String(activeProducts),
                note: "Товари, що зараз доступні до продажу.",
            },
            {
                label: "Сегменти",
                value: String(categoriesCount),
                note: "Категорії та канали, які закриті асортиментом.",
            },
            {
                label: "З фото",
                value: String(withGallery),
                note: "SKU з повним візуальним покриттям.",
            },
        ];
    }, [products]);

    const loadProducts = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchAdminProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося завантажити товари");
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const filteredProducts = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;

        return products.filter((p) =>
            `${p.name} ${p.slug} ${p.type}`.toLowerCase().includes(q)
        );
    }, [products, query]);

    const galleryUrls = React.useMemo(() => {
        const values = parseCommaList(form.gallery);
        const merged = form.image.trim()
            ? [form.image.trim(), ...values.filter((x) => x !== form.image.trim())]
            : values;

        return Array.from(new Set(merged));
    }, [form.gallery, form.image]);

    const resetForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setTab("form");
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? target.checked : value,
        }));
    };

    const handleEdit = (product: AdminProduct) => {
        setEditingId(product.id);
        setForm({
            slug: product.slug,
            name: product.name,
            type: product.type,
            description: product.description,
            price: String(product.price),
            old_price: product.old_price == null ? "" : String(product.old_price),
            badge: product.badge ?? "",
            image: product.image,
            gallery: product.gallery.join(", "),
            category: product.category.join(", "),
            subcategory: product.subcategory.join(", "),
            sizes: product.sizes.join(", "),
            colors: product.colors.join(", "),
            details: product.details.join(", "),
            in_stock: product.in_stock,
        });
        setTab("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (product: AdminProduct) => {
        const confirmed = window.confirm(`Видалити товар "${product.name}"?`);
        if (!confirmed) return;

        try {
            await deleteAdminProduct(product.id);
            setProducts((prev) => prev.filter((x) => x.id !== product.id));
            if (editingId === product.id) resetForm();
            toast.success("Товар видалено");
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося видалити товар");
        }
    };

    const handleUploadFiles = async (files: FileList | File[]) => {
        const arr = Array.from(files || []);
        if (!arr.length) return;

        const tooBig = arr.filter((f) => f.size > MAX_IMAGE_BYTES);
        const valid = arr.filter((f) => f.size <= MAX_IMAGE_BYTES);

        if (tooBig.length) {
            toast.error(`Деякі фото більші за ${MAX_IMAGE_MB}MB`);
        }

        if (!valid.length) return;

        try {
            setUploading(true);

            const uploaded: string[] = [];
            for (const file of valid) {
                const url = await uploadOneImage(file);
                uploaded.push(url);
            }

            setForm((prev) => {
                const currentGallery = parseCommaList(prev.gallery);
                const merged = Array.from(new Set([...currentGallery, ...uploaded]));

                return {
                    ...prev,
                    image: prev.image || uploaded[0] || "",
                    gallery: merged.join(", "),
                };
            });

            toast.success("Фото успішно завантажено");
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося завантажити фото");
        } finally {
            setUploading(false);
            setIsDragging(false);
        }
    };

    const removeGalleryImage = (url: string) => {
        setForm((prev) => {
            const nextGallery = parseCommaList(prev.gallery).filter((x) => x !== url);
            const nextImage = prev.image === url ? nextGallery[0] || "" : prev.image;

            return {
                ...prev,
                image: nextImage,
                gallery: nextGallery.join(", "),
            };
        });
    };

    const setMainImage = (url: string) => {
        setForm((prev) => ({
            ...prev,
            image: url,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const finalSlug = slugify(form.slug || form.name);

        if (!finalSlug) {
            toast.error("Вкажи slug або назву");
            return;
        }

        if (!form.name.trim()) {
            toast.error("Вкажи назву");
            return;
        }

        if (!form.type.trim()) {
            toast.error("Вкажи тип товару");
            return;
        }

        if (!form.description.trim()) {
            toast.error("Вкажи опис");
            return;
        }

        if (!form.price.trim() || Number.isNaN(Number(form.price))) {
            toast.error("Вкажи коректну ціну");
            return;
        }

        if (!form.image.trim()) {
            toast.error("Додай головне фото");
            return;
        }

        const payload: AdminProductInput = {
            slug: finalSlug,
            name: form.name.trim(),
            type: form.type.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            old_price: form.old_price.trim() ? Number(form.old_price) : null,
            badge: form.badge.trim() || null,
            image: form.image.trim(),
            gallery: galleryUrls,
            category: parseCommaList(form.category),
            subcategory: parseCommaList(form.subcategory),
            sizes: parseCommaList(form.sizes),
            colors: parseCommaList(form.colors),
            details: parseCommaList(form.details),
            in_stock: form.in_stock,
        };

        try {
            setSaving(true);

            if (editingId) {
                const updated = await updateAdminProduct(editingId, payload);
                setProducts((prev) =>
                    prev.map((item) => (item.id === editingId ? updated : item))
                );
                toast.success("Товар оновлено");
            } else {
                const created = await createAdminProduct(payload);
                setProducts((prev) => [created, ...prev]);
                toast.success("Товар створено");
            }

            resetForm();
        } catch (error) {
            console.error(error);
            toast.error("Не вдалося зберегти товар");
        } finally {
            setSaving(false);
        }
    };

    return (
        <PageLayout
            title="B2B-каталог і SKU"
            subtitle="Керуйте wholesale-асортиментом, візуалами, сегментами й наявністю."
        >
            <section className="space-y-8">
                <AdminWorkspace
                    active="products"
                    stats={productStats}
                    actions={
                        <div className="flex max-w-md rounded-2xl border border-white/10 bg-black/20 p-1">
                            <button
                                type="button"
                                onClick={() => setTab("form")}
                                className={`flex-1 rounded-xl px-4 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${
                                    tab === "form"
                                        ? "bg-red-600 text-white"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Редактор SKU
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab("list")}
                                className={`flex-1 rounded-xl px-4 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${
                                    tab === "list"
                                        ? "bg-red-600 text-white"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Каталог
                            </button>
                        </div>
                    }
                />

                <div className="grid gap-8 xl:grid-cols-[560px_1fr]">
                    <div className={tab === "list" ? "hidden xl:block" : "block"}>
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[28px] border border-white/10 bg-black/20 p-6 md:p-8"
                        >
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <h2 className="text-2xl font-black uppercase text-white">
                                    {editingId ? "Редагування SKU" : "Новий SKU"}
                                </h2>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Очистити
                                </button>
                            </div>

                            <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
                                <div className="mb-2 flex items-center gap-2 text-amber-200">
                                    <Sparkles className="h-4 w-4" />
                                    <span className="text-xs font-black uppercase tracking-[0.2em]">
                                        B2B режим
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300">
                                    Заповнюйте картку як wholesale-SKU: оптова база, сегменти, розмірна
                                    матриця, аргументи продажу й візуали для заявки.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setForm((prev) => ({
                                            ...prev,
                                            name: value,
                                            slug:
                                                !editingId && (!prev.slug || prev.slug === slugify(prev.name))
                                                    ? slugify(value)
                                                    : prev.slug,
                                        }));
                                    }}
                                    placeholder="Назва SKU"
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <input
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    placeholder="slug SKU"
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <input
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    placeholder="Тип / роль SKU"
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Опис для wholesale-картки"
                                    rows={5}
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <input
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="Базова оптова ціна"
                                        className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                    />
                                    <input
                                        name="old_price"
                                        value={form.old_price}
                                        onChange={handleChange}
                                        placeholder="РРЦ / орієнтир"
                                        className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                    />
                                </div>

                                <input
                                    name="badge"
                                    value={form.badge}
                                    onChange={handleChange}
                                    placeholder="Маркер SKU: bestseller, new, waterproof"
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <div className="rounded-2xl border border-white/10 bg-[#111] p-5">
                                    <div className="mb-4 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                                                Візуали SKU
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Натисни на область або перетягни фото сюди
                                            </p>
                                        </div>
                                    </div>

                                    <input
                                        id="product-photo-input"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            if (files?.length) {
                                                void handleUploadFiles(files);
                                            }
                                            e.currentTarget.value = "";
                                        }}
                                    />

                                    <div
                                        onClick={() => {
                                            if (!uploading) {
                                                document.getElementById("product-photo-input")?.click();
                                            }
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDragging(true);
                                        }}
                                        onDragEnter={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDragging(true);
                                        }}
                                        onDragLeave={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDragging(false);
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDragging(false);

                                            if (uploading) return;

                                            const files = e.dataTransfer.files;
                                            if (files?.length) {
                                                void handleUploadFiles(files);
                                            }
                                        }}
                                        className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                                            isDragging
                                                ? "border-red-500 bg-red-500/10"
                                                : "border-white/10 bg-black hover:border-red-500/50 hover:bg-white/[0.02]"
                                        }`}
                                    >
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                                            <UploadCloud className="h-6 w-6 text-white" />
                                        </div>

                                        <p className="text-lg font-black text-white">
                                            {uploading ? "Завантаження..." : "Натисніть або перетягніть фото сюди"}
                                        </p>

                                        <p className="mt-2 text-sm text-gray-500">
                                            JPEG, PNG, WEBP до {MAX_IMAGE_MB}MB
                                        </p>
                                    </div>

                                    {galleryUrls.length > 0 && (
                                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                            {galleryUrls.map((url) => {
                                                const isMain = form.image.trim() === url;

                                                return (
                                                    <div
                                                        key={url}
                                                        className={`overflow-hidden rounded-2xl border ${
                                                            isMain ? "border-red-500" : "border-white/10"
                                                        } bg-black`}
                                                    >
                                                        <div className="relative">
                                                            <img
                                                                src={resolveStorageUrl(url)}
                                                                alt=""
                                                                className="h-36 w-full object-cover"
                                                            />

                                                            {isMain && (
                                                                <div className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                                                                    Головне
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex gap-2 p-2">
                                                            {!isMain && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setMainImage(url)}
                                                                    className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
                                                                >
                                                                    Main
                                                                </button>
                                                            )}

                                                            <button
                                                                type="button"
                                                                onClick={() => removeGalleryImage(url)}
                                                                className="rounded-lg border border-red-500/20 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-red-500 transition hover:bg-red-500 hover:text-white"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {galleryUrls.length > 0 && (
                                        <div className="mt-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
                                                Головне фото
                                            </p>
                                            <p className="mt-2 truncate text-sm text-white">
                                                {form.image || "Не вибрано"}
                                            </p>
                                        </div>
                                    )}

                                    {galleryUrls.length === 0 && (
                                        <div className="mt-4 flex h-32 items-center justify-center rounded-2xl border border-dashed border-white/10 text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <ImageIcon className="h-6 w-6" />
                                                <span className="text-sm">Поки немає фото</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <input
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    placeholder="Сегменти через кому: women, men, work"
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <input
                                    name="subcategory"
                                    value={form.subcategory}
                                    onChange={handleChange}
                                    placeholder="Підсегменти / полиці через кому"
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <input
                                    name="sizes"
                                    value={form.sizes}
                                    onChange={handleChange}
                                    placeholder="Розмірна матриця через кому"
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <input
                                    name="colors"
                                    value={form.colors}
                                    onChange={handleChange}
                                    placeholder="Кольори / варіанти через кому"
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <textarea
                                    name="details"
                                    value={form.details}
                                    onChange={handleChange}
                                    placeholder="Аргументи продажу через кому"
                                    rows={4}
                                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-4 text-white outline-none placeholder:text-gray-500"
                                />

                                <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111] p-4">
                                    <div>
                                        <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                                            Активний для продажу
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            SKU буде доступний у каталозі й B2B-заявках
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        name="in_stock"
                                        checked={form.in_stock}
                                        onChange={handleChange}
                                        className="h-5 w-5 accent-red-600"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    disabled={saving || uploading}
                                    className="inline-flex min-h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-red-500 disabled:opacity-60"
                                >
                                    <Save className="h-4 w-4" />
                                    {saving
                                        ? "Збереження..."
                                        : editingId
                                            ? "Оновити SKU"
                                            : "Створити SKU"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className={tab === "form" ? "hidden xl:block" : "block"}>
                        <div className="rounded-[28px] border border-white/10 bg-black/20 p-6 md:p-8">
                            <div className="mb-6 flex items-end justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-black uppercase text-white">
                                        Усі SKU
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Керування wholesale-каталогом
                                    </p>
                                </div>

                                <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-gray-400">
                                    {filteredProducts.length}
                                </div>
                            </div>

                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Пошук по назві, slug або типу"
                                    className="w-full rounded-full border border-white/10 bg-[#111] py-3 pl-11 pr-4 text-white outline-none placeholder:text-gray-500"
                                />
                            </div>

                            <div className="space-y-4">
                                {loading ? (
                                    <p className="text-sm text-gray-400">Завантаження...</p>
                                ) : filteredProducts.length === 0 ? (
                                    <p className="text-sm text-gray-400">SKU не знайдено</p>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <article
                                            key={product.id}
                                            className="rounded-2xl border border-white/10 bg-[#111] p-4"
                                        >
                                            <div className="grid gap-4 md:grid-cols-[110px_1fr_auto]">
                                                <div className="overflow-hidden rounded-2xl bg-black">
                                                    <img
                                                        src={resolveStorageUrl(product.image)}
                                                        alt={product.name}
                                                        className="h-[120px] w-full object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-black uppercase text-white">
                                                        {product.name}
                                                    </h3>
                                                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
                                                        {product.slug}
                                                    </p>
                                                    <p className="mt-2 text-sm text-gray-400">{product.type}</p>
                                                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gray-500">
                                                        Оптова база
                                                    </p>
                                                    <p className="mt-1 text-base font-bold text-white">
                                                        {product.price} ₴
                                                    </p>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Сегменти: {product.category.join(", ") || "—"}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Підсегменти: {product.subcategory.join(", ") || "—"}
                                                    </p>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                            <span
                                className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
                                    product.in_stock
                                        ? "bg-green-500/10 text-green-400"
                                        : "bg-red-500/10 text-red-400"
                                }`}
                            >
                              {product.in_stock ? "В наявності" : "Немає"}
                            </span>

                                                        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                              <Package className="mr-1 inline h-3 w-3" />
                                                            {product.gallery.length} фото
                            </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(product)}
                                                        className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(product)}
                                                        className="inline-flex items-center justify-center rounded-xl border border-red-500/20 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-red-500 transition hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
