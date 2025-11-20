import { Button } from "@/components/ui/button";
import { VariantForForm } from "@/types/product.types";
import { Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface Props {
  selectedSizes: string[];
}

interface FormValues {
    name: string;
    description: string;
    brand: string;
    gender: string;
    tags: string;
    categoryId: string;
    materialId: string;
    published: boolean;
    variants: VariantForForm[];
    images: File[];
}

export default function AddVariantButton({selectedSizes}: Props) {
  const form = useFormContext<FormValues>(); // ✅ inside provider
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full border-[#FB923C] text-[#FB923C] hover:bg-[#FFF7ED]"
      onClick={() => {
        form.setValue('variants', [
          ...form.getValues('variants'),
          { id: crypto.randomUUID(), size: '', price: 0, stock: 0, sku: '', color: '#000000' },
        ]);
      }}
    >
      <Plus className="w-4 h-4 mr-2" /> Add Variant
    </Button>
  );
}
