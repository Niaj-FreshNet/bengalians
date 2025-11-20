// Fabric-related types
export interface Fabric {
  id: string;
  fabricName: string;
}

export interface FabricFormValues {
  fabricName: string;
}

export interface FabricApiResponse {
  data: {
    data: Fabric[];
    meta: {
      page: number;
      limit: number;
      total: number;
    };
  };
}