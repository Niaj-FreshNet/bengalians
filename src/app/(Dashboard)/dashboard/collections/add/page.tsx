'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCreateCollectionMutation } from '@/redux/store/api/collection/collectionApi';
import FormWrapper from '@/components/ReusableUI/FormWrapper';
import FormInput from '@/components/ReusableUI/FormInput';
import { FormCheckbox } from '@/components/ReusableUI/FormCheckbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { FormCheckboxGroup } from '@/components/ReusableUI/FormCheckboxGroup';
import { collectionSchema } from '@/schemas/collection.schema';

export default function AddCollectionPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [addCollection, { isLoading }] = useCreateCollectionMutation();
    const router = useRouter();

    // ✅ Dummy sizes array to render map
    const sizes = [
        { id: '3', size: '3' },
        { id: '6', size: '6' },
        { id: '10', size: '10' },
        { id: '12', size: '12' },
        { id: '15', size: '15' },
        { id: '25', size: '25' },
        { id: '30', size: '30' },
        { id: '50', size: '50' },
        { id: '100', size: '100' },
        { id: '500', size: '500' },
        { id: '1000', size: '1000' },
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

    const onSubmit = async (data: z.infer<typeof collectionSchema>) => {
        if (!file) {
            toast.error('Please upload an image');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('collectionName', data.collectionName);
            formData.append('image', file);
            formData.append('published', data.published.toString());

            await addCollection(formData).unwrap();
            router.push('/dashboard/collections');
        } catch (error) {
            console.error('Error adding collection:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card className="border-none shadow-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-900">Add Collection</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormWrapper
                        resolver={zodResolver(collectionSchema)}
                        defaultValues={{
                            name: '',
                            sizes: [],
                            published: true,
                        }}
                        onSubmit={onSubmit}
                        // successMessage="Collection added successfully!"
                        errorMessage="Failed to add collection"
                        submitButtonText="Add Collection"
                        submitButtonClassName="bg-orange-400 hover:bg-orange-500"
                        resetButtonClassName="border-orange-400 text-orange-400"
                    >
                        <FormInput
                            name="collectionName"
                            label="Collection Name"
                            placeholder=""
                            required
                            inputClassName="border-orange-400 focus:ring-orange-300"
                        />
                        <div>
                            <label className="text-sm font-medium text-gray-700">Collection Image <span className="text-red-500">*</span></label>
                            <div className="mt-1 border-2 border-dashed border-orange-400 rounded-md p-4 text-center">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="collection-image"
                                />
                                <label htmlFor="collection-image" className="cursor-pointer">
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