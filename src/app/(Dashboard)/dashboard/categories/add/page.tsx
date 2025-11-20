'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCreateCategoryMutation } from '@/redux/store/api/category/categoryApi';
import FormWrapper from '@/components/ReusableUI/FormWrapper';
import FormInput from '@/components/ReusableUI/FormInput';
import { FormCheckbox } from '@/components/ReusableUI/FormCheckbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { categorySchema } from '@/schemas/category.schema';
import { FormCheckboxGroup } from '@/components/ReusableUI/FormCheckboxGroup';

export default function AddCategoryPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [addCategory, { isLoading }] = useCreateCategoryMutation();
    const router = useRouter();

    // ✅ Dummy sizes array to render map
    const sizes = [
        // Standard sizes
        { id: 'XS', size: 'XS' },
        { id: 'S', size: 'S' },
        { id: 'M', size: 'M' },
        { id: 'L', size: 'L' },
        { id: 'XL', size: 'XL' },
        { id: 'XXL', size: 'XXL' },
        { id: 'XXXL', size: 'XXXL' },

        // Numeric waist / pants sizes
        { id: '28', size: '28' },
        { id: '30', size: '30' },
        { id: '32', size: '32' },
        { id: '34', size: '34' },
        { id: '36', size: '36' },
        { id: '38', size: '38' },
        { id: '40', size: '40' },
        { id: '42', size: '42' },
        { id: '44', size: '44' },

        // Men's shirt collar/neck sizes
        { id: '15', size: '15' },
        { id: '15.5', size: '15 1/2' },
        { id: '16', size: '16' },
        { id: '16.5', size: '16 1/2' },
        { id: '17', size: '17' },
        { id: '17.5', size: '17 1/2' },
        { id: '18', size: '18' },

        // Kids sizes
        { id: '0-3M', size: '0-3M' },
        { id: '3-6M', size: '3-6M' },
        { id: '6-12M', size: '6-12M' },
        { id: '1-2Y', size: '1-2Y' },
        { id: '2-3Y', size: '2-3Y' },
        { id: '3-4Y', size: '3-4Y' },
        { id: '4-5Y', size: '4-5Y' },
        { id: '5-6Y', size: '5-6Y' },
        { id: '7-8Y', size: '7-8Y' },
        { id: '9-10Y', size: '9-10Y' },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const isValidType = ['image/jpeg', 'image/png'].includes(selectedFile.type);
            const isValidSize = selectedFile.size <= 25 * 1024 * 1024;
            if (!isValidType) {
                toast.error('Only JPG/PNG files are allowed!');
                return;
            }
            if (!isValidSize) {
                toast.error('Image must be smaller than 25MB!');
                return;
            }
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const onSubmit = async (data: z.infer<typeof categorySchema>) => {
        if (!file) {
            toast.error('Please upload an image');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('categoryName', data.categoryName);
            formData.append('image', file);
            formData.append('published', data.published.toString());
            formData.append('sizes', JSON.stringify(data.sizes.map((s) => s.toUpperCase())));

            await addCategory(formData).unwrap();
            router.push('/dashboard/categories');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card className="border-none shadow-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-900">Add Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormWrapper
                        resolver={zodResolver(categorySchema)}
                        defaultValues={{
                            name: '',
                            sizes: [],
                            published: true,
                        }}
                        onSubmit={onSubmit}
                        // successMessage="Category added successfully!"
                        errorMessage="Failed to add category"
                        submitButtonText="Add Category"
                        submitButtonClassName="bg-orange-400 hover:bg-orange-500"
                        resetButtonClassName="border-orange-400 text-orange-400"
                    >
                        <FormInput
                            name="categoryName"
                            label="Category Name"
                            placeholder=""
                            required
                            inputClassName="border-orange-400 focus:ring-orange-300"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {/* Multi-select for Sizes */}
                            <FormCheckboxGroup
                                name="sizes"
                                label="Sizes"
                                // options={['30 ML', '50 ML', '100 ML']}
                                options={sizes.map(f => ({ label: f.size, value: f.id }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Category Image <span className="text-red-500">*</span></label>
                            <div className="mt-1 border-2 border-dashed border-orange-400 rounded-md p-4 text-center">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="category-image"
                                />
                                <label htmlFor="category-image" className="cursor-pointer">
                                    <Upload className="mx-auto h-8 w-8 text-orange-400" />
                                    <p className="mt-2 text-sm text-gray-600">Drop file or click to upload</p>
                                    <p className="text-xs text-gray-500">JPG/PNG, Max: 25MB</p>
                                </label>
                            </div>
                            {preview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500">Preview:</p>
                                    <Image src={preview} alt="Preview" width={192} height={192} className="mt-1 max-h-48 rounded border border-gray-200 shadow" />
                                </div>
                            )}
                        </div>
                        <FormCheckbox name="published" label="Published" />
                    </FormWrapper>
                </CardContent>
            </Card>
        </div>
    );
}