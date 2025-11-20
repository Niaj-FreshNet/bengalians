// Collection-related types
export interface Collection {
  id: string;
  collectionName: string;
  imageUrl?: string;
  sizes: string[];
  specification: 'male' | 'female' | 'unisex';
  published: boolean;
}

export interface CollectionFormValues {
  collectionName: string;
  sizes: string[];
  specification: 'male' | 'female' | 'unisex';
  published: boolean;
  imageUrl?: string;
}

export interface CollectionApiResponse {
  data: {
    data: Collection[];
    meta: {
      page: number;
      limit: number;
      total: number;
    };
  };
}

