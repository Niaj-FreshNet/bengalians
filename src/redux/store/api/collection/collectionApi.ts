import { Collection, CollectionApiResponse, CollectionFormValues } from '@/types/collection.types';
import { baseApi } from '../baseApi';

export type CollectionUpdateValues = Partial<CollectionFormValues>;

export const CollectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create collection (with image upload)
    createCollection: builder.mutation<Collection, FormData>({
      query: (data: FormData) => ({
        url: '/collection/create-collection',
        method: 'POST',
        body: data,
      }),
    invalidatesTags: ['Collection'],
  }),

    // Get collections (public)
    getAllCollections: builder.query<CollectionApiResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/collection/get-collections',
        params: { page, limit },
      }),
      providesTags: ['Collection'],
    }),

    // Get all collections (admin)
    getAllCollectionsAdmin: builder.query<CollectionApiResponse, void>({
      query: () => '/collection/get-all-collections',
      providesTags: ['Collection'],
    }),

    // Get single collection by id
    getCollection: builder.query<Collection, string>({
      query: (id: string) => `/collection/get-collection/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Collection', id }],
    }),

    // Update collection (with optional image)
    updateCollection: builder.mutation<Collection, { id: string; updatedData: FormData | CollectionUpdateValues }>({
      query: ({ id, updatedData }) => ({
        url: `/collection/update-collection/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Collection', id }, 'Collection'],
    }),

    // Delete collection
    deleteCollection: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/collection/delete-collection/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collection'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCollectionMutation,
  useGetAllCollectionsQuery,
  useGetAllCollectionsAdminQuery,
  useGetCollectionQuery,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} = CollectionApi;