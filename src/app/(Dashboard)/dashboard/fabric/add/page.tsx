'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFabricMutation } from '@/redux/store/api/fabric/fabricApi';
import FormWrapper from '@/components/ReusableUI/FormWrapper';
import FormInput from '@/components/ReusableUI/FormInput';

const fabricSchema = z.object({
    fabricName: z.string().min(1, 'Fabric name is required'),
});

export default function AddFabricPage() {
    const [addFabric, { isLoading }] = useCreateFabricMutation();
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof fabricSchema>) => {
        try {
            await addFabric({ fabricName: data.fabricName }).unwrap();
            router.push('/dashboard/fabric');
        } catch (error) {
            console.error('Error adding fabric:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Fabric</h2>
            <FormWrapper
                resolver={zodResolver(fabricSchema)}
                defaultValues={{ name: '' }}
                onSubmit={onSubmit}
                // successMessage="Fabric added successfully!"
                errorMessage="Failed to add fabric"
                submitButtonText="Add Fabric"
                submitButtonClassName="bg-orange-400 hover:bg-orange-500"
                resetButtonClassName="border-orange-400 text-orange-400"
            >
                <FormInput
                    name="fabricName"
                    label="Fabric Name"
                    placeholder=" "
                    required
                    inputClassName="border-orange-400 focus:ring-orange-300"
                />
            </FormWrapper>
        </div>
    );
}