import * as React from "react";

type Props = {
    selectedSize: string;
    selectedColor: string;
    sortBy: string;
    onSizeChange: (value: string) => void;
    onColorChange: (value: string) => void;
    onSortChange: (value: string) => void;
    sizes: string[];
    colors: string[];
};

export function CatalogFilters({
    selectedSize,
    selectedColor,
    sortBy,
    onSizeChange,
    onColorChange,
    onSortChange,
    sizes,
    colors,
}: Props) {
    return (
        <div className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5 lg:grid-cols-3">
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Розмірна група
                </label>
                <select
                    value={selectedSize}
                    onChange={(e) => onSizeChange(e.target.value)}
                    className="w-full border border-white/10 bg-[#111] px-4 py-3 text-white outline-none"
                >
                    <option value="">Усі розміри</option>
                    {sizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Колір
                </label>
                <select
                    value={selectedColor}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="w-full border border-white/10 bg-[#111] px-4 py-3 text-white outline-none"
                >
                    <option value="">Усі кольори</option>
                    {colors.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Сортування
                </label>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full border border-white/10 bg-[#111] px-4 py-3 text-white outline-none"
                >
                    <option value="default">За популярністю</option>
                    <option value="price-asc">Базова ціна: зростання</option>
                    <option value="price-desc">Базова ціна: спадання</option>
                    <option value="name-asc">Назва: A-Z</option>
                </select>
            </div>
        </div>
    );
}
