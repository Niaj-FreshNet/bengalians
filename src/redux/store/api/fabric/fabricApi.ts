import { Fabric, FabricApiResponse, FabricFormValues } from '@/types/fabric.types';
import { baseApi } from '../baseApi';

export type FabricUpdateValues = Partial<FabricFormValues>;

export const fabricApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create fabric
        createFabric: builder.mutation<Fabric, FabricFormValues>({
            query: (data) => ({
                url: '/fabrics/create-fabric',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Fabric'],
        }),

        // Get all fabrics
        getAllFabrics: builder.query<FabricApiResponse, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 100 }) => ({
                url: '/fabrics/get-all-fabrics',
                params: { page, limit },
            }),
            providesTags: ['Fabric'],
        }),

        // Get single fabric by id
        getFabric: builder.query<Fabric, string>({
            query: (id: string) => `/fabrics/get-fabric/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Fabric', id }],
        }),

        // Update fabric
        updateFabric: builder.mutation<Fabric, { id: string; updatedData: FabricUpdateValues }>({
            query: ({ id, updatedData }) => ({
                url: `/fabrics/update-fabric/${id}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Fabric', id }, 'Fabric'],
        }),

        // Delete fabric
        deleteFabric: builder.mutation<void, string>({
            query: (id: string) => ({
                url: `/fabrics/delete-fabric/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Fabric'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateFabricMutation,
    useGetAllFabricsQuery,
    useGetFabricQuery,
    useUpdateFabricMutation,
    useDeleteFabricMutation,
} = fabricApi;