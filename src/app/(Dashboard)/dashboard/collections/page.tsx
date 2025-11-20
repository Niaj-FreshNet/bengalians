'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
    useGetAllCollectionsAdminQuery,
    useDeleteCollectionMutation,
    useUpdateCollectionMutation,
} from '@/redux/store/api/collection/collectionApi';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FormWrapper from '@/components/ReusableUI/FormWrapper';
import FormInput from '@/components/ReusableUI/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { FormCheckbox } from '@/components/ReusableUI/FormCheckbox';
import { collectionSchema } from '@/schemas/collection.schema';
import { FormCheckboxGroup } from '@/components/ReusableUI/FormCheckboxGroup';
import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionList() {
    const { data, isLoading } = useGetAllCollectionsAdminQuery();
    const [deleteCollection] = useDeleteCollectionMutation();
    const [updateCollection, { isLoading: isUpdating }] = useUpdateCollectionMutation();
    const router = useRouter();

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

    const allCollections = data?.data?.data || [];
    const meta = data?.data?.meta;

    const [filteredCollections, setFilteredCollections] = useState(allCollections);
    const [searchTerm, setSearchTerm] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingCollection, setEditingCollection] = useState<any>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (searchTerm) {
            const filtered = allCollections.filter((cat: any) =>
                cat.collectionName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCollections(filtered);
        } else {
            setFilteredCollections(allCollections);
        }
    }, [searchTerm, allCollections]);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this collection?');
        if (confirmed) {
            try {
                await deleteCollection(id).unwrap();
                toast.success('Collection deleted successfully');
            } catch {
                toast.error('Failed to delete collection');
            }
        }
    };

    const handleEdit = (collection: any) => {
        setEditingCollection(collection);
        setEditModalOpen(true);
        setImagePreview(collection.imageUrl || null);
        setImageFile(null);
    };

    const handleUpdate = async (data: z.infer<typeof collectionSchema>) => {
        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append('collectionName', data.collectionName);
                formData.append('image', imageFile);
                formData.append('published', JSON.stringify(data.published));
                if (editingCollection?.imageUrl) {
                    formData.append('existingImageUrl', editingCollection.imageUrl);
                }
                await updateCollection({ id: editingCollection.id, updatedData: formData }).unwrap();
            } else {
                await updateCollection({
                    id: editingCollection.id,
                    updatedData: {
                        collectionName: data.collectionName,
                        published: data.published,
                        imageUrl: editingCollection.imageUrl,
                    },
                }).unwrap();
            }
            toast.success('Collection updated successfully');
            setEditModalOpen(false);
            setImageFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error updating collection:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
            const isValidSize = file.size <= 25 * 1024 * 1024;
            if (!isValidType) {
                toast.error('Only JPG/PNG files are allowed!');
                return;
            }
            if (!isValidSize) {
                toast.error('Image must be smaller than 25MB!');
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                    <Input
                        placeholder="Search collections..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-orange-400"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
                <Link href="/dashboard/collections/add">
                    <Button className="bg-orange-400 hover:bg-orange-500">
                        <Plus className="mr-2 h-4 w-4" /> Add Collection
                    </Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Sizes</TableHead>
                        {/* <TableHead>Unit</TableHead> */}
                        <TableHead>Publish</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        // ✅ Skeleton loader rows
                        Array.from({ length: 6 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-10 w-16 rounded" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-12 rounded-full" /></TableCell>
                                <TableCell className="flex gap-2">
                                    <Skeleton className="h-8 w-8 rounded" />
                                    <Skeleton className="h-8 w-8 rounded" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        filteredCollections.map((collection: any) => (
                            <TableRow key={collection.id}>
                                <TableCell className="capitalize">{collection.collectionName.toLowerCase()}</TableCell>
                                <TableCell>
                                    <Image
                                        src={collection.imageUrl || '/placeholder.svg'}
                                        alt="Collection"
                                        width={60}
                                        height={40}
                                        className="rounded object-cover"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={collection.published}
                                        onCheckedChange={async (checked) => {
                                            try {
                                                await updateCollection({
                                                    id: collection.id,
                                                    updatedData: { published: checked },
                                                }).unwrap();
                                                toast.success('Status updated successfully');
                                            } catch {
                                                toast.error('Failed to update status');
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" onClick={() => handleEdit(collection)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" className="text-red-600" onClick={() => handleDelete(collection.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Edit Modal */}
            <Dialog open={editModalOpen} onOpenChange={(open) => {
                setEditModalOpen(open);
                if (!open) {
                    setImageFile(null);
                    setImagePreview(null);
                }
            }}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-orange-400">Edit Collection</DialogTitle>
                    </DialogHeader>
                    <FormWrapper
                        resolver={zodResolver(collectionSchema)}
                        defaultValues={{
                            collectionName: editingCollection?.collectionName || '',
                            sizes: editingCollection?.sizes || [],
                            unit: editingCollection?.unit,
                            published: editingCollection?.published || false,
                        }}
                        onSubmit={handleUpdate}
                        onReset={() => {
                            setEditModalOpen(false);
                            setImageFile(null);
                            setImagePreview(null);
                        }}
                        errorMessage="Failed to update collection"
                        submitButtonText="Update Collection"
                        resetButtonText="Reset"
                        submitButtonClassName="bg-orange-400 hover:bg-orange-500"
                        resetButtonClassName="border-orange-400 text-orange-400"
                    >
                        <FormInput
                            name="collectionName"
                            label="Collection Name"
                            placeholder=""
                            required
                            inputClassName="border-orange-400"
                        />
                        <FormCheckboxGroup
                            name="sizes"
                            label="Sizes"
                            options={sizes.map(f => ({ label: f.size, value: f.id }))}
                        />
                        <FormInput
                            name="unit"
                            label="Unit"
                            type="select"
                            required
                            options={[
                                { value: 'ML', label: 'ML' },
                                { value: 'GM', label: 'GM' },
                                { value: 'PIECE', label: 'PIECE' },
                            ]}
                            inputClassName="border-orange-400 focus:ring-orange-300"
                        />
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Collection Image <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 border-2 border-dashed border-orange-400 rounded-md p-4 text-center">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="edit-collection-image"
                                />
                                <label htmlFor="edit-collection-image" className="cursor-pointer">
                                    <Upload className="mx-auto h-8 w-8 text-orange-400" />
                                    <p className="mt-2 text-sm text-gray-600">Drop file or click to upload</p>
                                    <p className="text-xs text-gray-500">JPG/PNG, Max: 25MB</p>
                                </label>
                            </div>
                            {imagePreview && (
                                <div className="mt-4">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={80}
                                        height={80}
                                        className="max-h-20 rounded"
                                    />
                                </div>
                            )}
                        </div>
                        <FormCheckbox name="published" label="Published" />
                    </FormWrapper>
                </DialogContent>
            </Dialog>
        </div>
    );
}
