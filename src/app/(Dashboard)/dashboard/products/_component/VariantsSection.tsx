'use client';

import { useEffect, useState } from "react";
import FormInput from "@/components/ReusableUI/FormInput";
import { Button } from "@/components/ui/button";
import { VariantForForm } from "@/types/product.types";
import { Trash2, X } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

interface Props {
    selectedSizes: string[];
}
type VariantFormType = Omit<VariantForForm, "images"> & {
    images?: (File | string)[];
};

interface FormValues {
    name: string;
    description: string;
    brand: string;
    gender: string;
    tags: string;
    categoryId: string;
    materialId: string;
    published: boolean;
    variants: VariantFormType[];
    images: File[];
}

export const VariantsSection = ({ selectedSizes }: Props) => {
    const form = useFormContext<FormValues>();
    const productName = useWatch({ control: form.control, name: "name" });
    const variants = form.watch("variants");

    // State for expanding color list
    const [expandedColorIndex, setExpandedColorIndex] = useState<number | null>(null);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

    // Sync sizes → variants
    useEffect(() => {
        const existing = form.getValues("variants") || [];

        const newVariants = selectedSizes
            .filter((s) => !existing.some((v) => v.size === s))
            .map((size) => ({
                size,
                color: "",
                price: 0,
                costPrice: 0,
                stock: 0,
                sku: "",
            }));

        if (newVariants.length) form.setValue("variants", [...existing, ...newVariants]);

        const filtered = existing.filter((v) => selectedSizes.includes(v.size));
        if (filtered.length !== existing.length) form.setValue("variants", filtered);
    }, [selectedSizes]);

    // Auto-generate SKU
    useEffect(() => {
        const updated = variants.map((variant) => {
            const namePart = productName?.trim().replace(/\s+/g, "").toUpperCase() || "PRODUCT";
            const sizePart = variant.size;
            const colorPart = (variant.color || "COLOR").replace("#", "").toUpperCase();

            return {
                ...variant,
                sku: `BGS-${namePart}-#${colorPart}-${sizePart}`,
            };
        });

        form.setValue("variants", updated, { shouldDirty: true });
    }, [
        productName,
        variants.map((v) => v.size).join(","),
        variants.map((v) => v.color).join(","),
    ]);

    // All preset colors
    const presetColors = [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Navy", hex: "#001F54" },
        { name: "Charcoal", hex: "#36454F" },
        { name: "Grey", hex: "#808080" },
        { name: "Beige", hex: "#F5F5DC" },
        { name: "Brown", hex: "#6F4E37" },
        { name: "Cream", hex: "#FFFDD0" },
        { name: "Khaki", hex: "#B7A58B" },
        { name: "Army Green", hex: "#4B5320" },
        { name: "Olive", hex: "#808000" },
        { name: "Green", hex: "#00A651" },
        { name: "Red", hex: "#FF0000" },
        { name: "Maroon", hex: "#800000" },
        { name: "Orange", hex: "#FFA500" },
        { name: "Yellow", hex: "#FFD700" },
        { name: "Blue", hex: "#007BFF" },
        { name: "Royal Blue", hex: "#4169E1" },
        { name: "Sky Blue", hex: "#87CEEB" },
        { name: "Purple", hex: "#800080" },
        { name: "Lavender", hex: "#E6E6FA" },
        { name: "Pink", hex: "#FFC0CB" },
        { name: "Hot Pink", hex: "#FF69B4" },
        { name: "Peach", hex: "#FFDAB9" },
        { name: "Light Coral", hex: "#F08080" },
        { name: "Denim Light", hex: "#A0B7C8" },
        { name: "Denim Medium", hex: "#6B7A8F" },
        { name: "Denim Dark", hex: "#2B3A42" },
    ];

    // Show 7 most common colors first
    const topColors = presetColors.slice(0, 6);

    const handleFilesDrop = (index: number, files: FileList | null) => {
        if (!files) return;
        const fileArr = Array.from(files);
        const all = form.getValues("variants");
        all[index].images = [...(all[index].images || []), ...fileArr];
        form.setValue("variants", all, { shouldDirty: true });
    };


    const handleImageDelete = (variantIndex: number, imageIndex: number) => {
        const all = form.getValues("variants");
        const imgs = all[variantIndex].images || [];
        imgs.splice(imageIndex, 1);
        all[variantIndex].images = [...imgs];
        form.setValue("variants", all, { shouldDirty: true });
    };

    return (
        <div>
            {variants.map((variant, index) => (
                <div key={index} className="border border-[#FB923C] rounded-lg p-4 mb-4">

                    {/* Delete variant */}
                    <div className="flex justify-end mb-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                const all = form.getValues("variants");
                                form.setValue(
                                    "variants",
                                    all.filter((_, i) => i !== index)
                                );
                            }}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-3 gap-4">

                        <div className="flex flex-row gap-6">
                            {/* Size */}
                            <FormInput
                                name={`variants.${index}.size`}
                                label="Size"
                                type="select"
                                options={selectedSizes.map((size) => ({
                                    value: size,
                                    label: size,
                                }))}
                                inputClassName="border-[#FB923C]"
                            />

                            {/* Stock */}
                            <FormInput
                                name={`variants.${index}.stock`}
                                label="Stock"
                                type="number"
                                inputClassName="border-[#FB923C]"
                                value={variant.stock}
                                onChange={(e) => {
                                    const all = form.getValues("variants");
                                    all[index].stock = Number(e.target.value) || 0;
                                    form.setValue("variants", all, { shouldDirty: true });
                                }}
                            />
                        </div>

                        {/* Color Field */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">
                                Color
                            </label>

                            {/* Top 7 Common Colors */}
                            <div className="grid grid-cols-6 gap-2 mb-2">
                                {topColors.map((preset) => (
                                    <div
                                        key={preset.hex}
                                        title={preset.name}
                                        className={`w-7 h-7 rounded-full cursor-pointer border
                                            ${variant.color === preset.hex ? "ring-2 ring-[#FB923C]" : "border-gray-300"}`}
                                        style={{ backgroundColor: preset.hex }}
                                        onClick={() => {
                                            const all = form.getValues("variants");
                                            all[index].color = preset.hex;
                                            form.setValue("variants", all, { shouldDirty: true });
                                        }}
                                    ></div>
                                ))}
                            </div>

                            {/* Show More / Hide */}
                            <button
                                type="button"
                                onClick={() =>
                                    setExpandedColorIndex(
                                        expandedColorIndex === index ? null : index
                                    )
                                }
                                className="text-xs text-orange-500 underline"
                            >
                                {expandedColorIndex === index ? "Hide Colors" : "Show More"}
                            </button>

                            {/* Full Color List */}
                            {expandedColorIndex === index && (
                                <div className="mt-2 max-h-32 overflow-y-auto grid grid-cols-6 gap-x-4 gap-y-2 border rounded-md p-2">
                                    {presetColors.map((preset) => (
                                        <div
                                            key={preset.hex}
                                            title={preset.name}
                                            className={`w-7 h-7 rounded-full cursor-pointer border
                                                ${variant.color === preset.hex ? "ring-2 ring-[#FB923C]" : "border-gray-300"}`}
                                            style={{ backgroundColor: preset.hex }}
                                            onClick={() => {
                                                const all = form.getValues("variants");
                                                all[index].color = preset.hex;
                                                form.setValue("variants", all, { shouldDirty: true });
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            )}

                            {/* Color Picker */}
                            <input
                                type="color"
                                value={variant.color || "#000000"}
                                onChange={(e) => {
                                    const all = form.getValues("variants");
                                    all[index].color = e.target.value;
                                    form.setValue("variants", all, { shouldDirty: true });
                                }}
                                className="w-full h-10 rounded-md border border-[#FB923C] cursor-pointer mt-2"
                            />
                        </div>

                        {/* SKU */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">SKU</label>
                            <input
                                value={variant.sku || ""}
                                readOnly
                                className="w-full border border-[#FB923C] rounded-md px-3 py-2 bg-gray-50 text-gray-600 cursor-not-allowed"
                            />
                        </div>

                        {/* Drag & Drop Image Upload */}
                        <div
                            className="mt-0 border border-dashed border-orange-400 p-5 rounded-xl text-center cursor-pointer hover:bg-orange-50 transition"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                handleFilesDrop(index, e.dataTransfer.files);
                            }}
                        >
                            <p className="text-sm text-gray-600">Drag & drop images here or click to upload</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                id={`img-upload-${index}`}
                                onChange={(e) => handleFilesDrop(index, e.target.files)}
                            />
                            <label
                                htmlFor={`img-upload-${index}`}
                                className="inline-block mt-2 bg-orange-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-orange-600"
                            >
                                Upload Images
                            </label>
                        </div>


                        {/* Thumbnails with delete button */}
                        <div className="flex gaps-4 mt-4 flex-wrap">
                            {variant.images?.map((img, i) => {
                                const preview = typeof img === "string" ? img : URL.createObjectURL(img);
                                return (
                                    <div key={i} className="relative w-20 h-20 rounded border border-orange-400 overflow-hidden group">
                                        <img src={preview} className="w-full h-full object-cover" />


                                        {/* Delete image */}
                                        <button
                                            onClick={() => handleImageDelete(index, i)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-row gap-4">
                            {/* Price */}
                            < FormInput
                                name={`variants.${index}.price`}
                                label="Price"
                                type="number"
                                inputClassName="border-[#FB923C]"
                                value={variant.price}
                                onChange={(e) => {
                                    const all = form.getValues("variants");
                                    all[index].price = Number(e.target.value) || 0;
                                    form.setValue("variants", all, { shouldDirty: true });
                                }}
                            />

                            {/* Cost Price */}
                            <FormInput
                                name={`variants.${index}.costPrice`}
                                label="Cost Price"
                                type="number"
                                inputClassName="border-[#FB923C]"
                                value={variant.costPrice}
                                onChange={(e) => {
                                    const all = form.getValues("variants");
                                    all[index].costPrice = Number(e.target.value) || 0;
                                    form.setValue("variants", all, { shouldDirty: true });
                                }}
                            />
                        </div>
                    </div>
                </div >
            ))
            }
        </div >
    );
};
