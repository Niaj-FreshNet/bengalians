'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
    useGetAllFabricsQuery,
    useUpdateFabricMutation,
    useDeleteFabricMutation,
} from '@/redux/store/api/fabric/fabricApi';
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
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const fabricSchema = z.object({
    fabricName: z.string().min(1, 'Fabric name is required'),
});

export default function fabricList() {
    const { data, isLoading } = useGetAllFabricsQuery({});
    const [updateFabric] = useUpdateFabricMutation();
    const [deleteFabric] = useDeleteFabricMutation();
    const router = useRouter();

    const allFabrics = data?.data?.data || [];

    const [filteredFabrics, setFilteredFabrics] = useState(allFabrics);
    const [searchTerm, setSearchTerm] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingFabric, setEditingFabric] = useState<any>(null);

    useEffect(() => {
        const fabrics = data?.data?.data || [];
        if (searchTerm) {
            setFilteredFabrics(
                fabrics.filter((mat: any) =>
                    mat.fabricName.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredFabrics(fabrics);
        }
    }, [searchTerm, data]);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this fabric?');
        if (confirmed) {
            try {
                await deleteFabric(id).unwrap();
                toast.success('Fabric deleted successfully');
            } catch {
                toast.error('Failed to delete fabric');
            }
        }
    };

    const handleEdit = (fabric: any) => {
        setEditingFabric(fabric);
        setEditModalOpen(true);
    };

    const handleUpdate = async (data: z.infer<typeof fabricSchema>) => {
        try {
            await updateFabric({
                id: editingFabric.id,
                updatedData: { fabricName: data.fabricName }
            }).unwrap();
            setEditModalOpen(false);
        } catch (error) {
            console.error('Error updating fabric:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                    <Input
                        placeholder="Search fabrics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-orange-400"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
                <Link href="/dashboard/fabric-families/add">
                    <Button className="bg-orange-400 hover:bg-orange-500">
                        <Plus className="mr-2 h-4 w-4" /> Add Fabric
                    </Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                <TableCell className="flex gap-2">
                                    <Skeleton className="h-8 w-8 rounded" />
                                    <Skeleton className="h-8 w-8 rounded" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        filteredFabrics.map((fabric: any) => (
                            <TableRow key={fabric.id}>
                                <TableCell className="capitalize">{fabric.fabricName}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" onClick={() => handleEdit(fabric)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" className="text-red-600" onClick={() => handleDelete(fabric.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-orange-400">Edit Fabric</DialogTitle>
                    </DialogHeader>
                    <FormWrapper
                        resolver={zodResolver(fabricSchema)}
                        defaultValues={{ fabricName: editingFabric?.fabricName || '' }}
                        onSubmit={handleUpdate}
                        successMessage="Fabric updated successfully!"
                        errorMessage="Failed to update fabric"
                        submitButtonText="Update Fabric"
                        submitButtonClassName="bg-orange-400 hover:bg-orange-500"
                        resetButtonClassName="border-orange-400 text-orange-400"
                    >
                        <FormInput
                            name="fabricName"
                            label="Fabric Name"
                            placeholder="e.g., Oud, Amber"
                            required
                            inputClassName="border-orange-400"
                        />
                    </FormWrapper>
                </DialogContent>
            </Dialog>
        </div>
    );
}
