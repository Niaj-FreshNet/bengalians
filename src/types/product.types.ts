// =======================
// ENUMS (sync with Prisma)
// =======================
export type ClothingSize =
  | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
  | '28' | '30' | '32' | '34' | '36' | '38' | '40' | '42' | '44'
  | '15' | '15.5' | '16' | '16.5' | '17' | '17.5' | '18'
  | 'KIDS_0_3M' | 'KIDS_3_6M' | 'KIDS_6_12M'
  | 'KIDS_1_2Y' | 'KIDS_2_3Y' | 'KIDS_3_4Y' | 'KIDS_4_5Y'
  | 'KIDS_5_6Y' | 'KIDS_7_8Y' | 'KIDS_9_10Y';

export type Gender = 'MEN' | 'WOMEN' | 'UNISEX' | 'BOYS' | 'GIRLS';
export type FitType = 'SLIM' | 'REGULAR' | 'RELAXED' | 'OVERSIZED' | 'TAILORED';


// =======================
// DISCOUNT TYPE
// =======================
export interface IDiscount {
  id: string;
  productId: string;
  code?: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxUsage?: number;
  startDate?: string;
  endDate?: string;
  variantId?: string;
}


// =======================
// COLOR
// =======================
// export interface IColor {
//   id: string;
//   colorName: string;
//   hexCode?: string;
//   imageUrl?: string;
// }


// =======================
// FABRIC
// =======================
export interface IFabric {
  id: string;
  fabricName: string;
  imageUrl?: string;
  description?: string;
}


// =======================
// COLLECTION
// =======================
export interface ICollection {
  id: string;
  collectionName: string;
  imageUrl?: string;
  description?: string;
  season?: string;
}


// =======================
// PRODUCT VARIANT (frontend)
// =======================
export interface IProductVariant {
  id?: string;
  sku: string;
  size: ClothingSize;
  color: string;
  price: number;
  costPrice?: number;
  stock: number;
  images?: string[];

  productId?: string;
  createdAt?: string;
  updatedAt?: string;

  discounts?: IDiscount[];
}

// For forms where size must be string
export interface VariantForForm extends Omit<IProductVariant, 'size'> {
  size: string;
  color: string;
}


// =======================
// REVIEW
// =======================
export interface IReview {
  id: string;
  rating: number;
  title: string;
  comment: string;
  isPublished: boolean;
  productId: string;
  userId?: string;
  user?: {
    name: string;
    imageUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
}


// =======================
// PRODUCT CREATION / RESPONSE
// =======================
export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  primaryImage: string;
  otherImages?: string[];
  videoUrl?: string;
  tags: string[];

  // Apparel specs
  brand?: string;
  gender?: Gender;
  fitType?: FitType;
  pattern?: string;
  neckline?: string;
  sleeveType?: string;
  occasion?: string[];
  careInstructions?: string;
  sustainable?: boolean;
  madeIn?: string;

  categoryId: string;
  collectionId?: string;

  published: boolean;

  fabricIds?: string[];
  fabrics?: IFabric[];

  reviews: IReview[];
  averageRating: number;
  reviewCount: number;

  supplier?: string;

  variants: IProductVariant[];
  discounts?: IDiscount[];

  // Computed
  minPrice: number;
  maxPrice: number;
  totalStock: number;
  inStock: boolean;

  createdAt: string;
  updatedAt: string;
}


export interface IProductResponse extends IProduct {
  data: any;
  category?: {
    id: string;
    categoryName: string;
    imageUrl?: string;
    description?: string;
  };

  collection?: ICollection;

  availableSizes?: ClothingSize[];
  availableColors?: string[];

  relatedProducts?: IProductResponse[];
}


// =======================
// PRODUCT UPDATE
// =======================
export interface IUpdateProduct {
  name?: string;
  description?: string;
  primaryImage?: string;
  otherImages?: string[];
  videoUrl?: string;
  tags?: string[];

  brand?: string;
  gender?: Gender;
  fitType?: FitType;
  pattern?: string;
  neckline?: string;
  sleeveType?: string;
  occasion?: string[];
  careInstructions?: string;
  sustainable?: boolean;
  madeIn?: string;

  categoryId?: string;
  collectionId?: string;
  published?: boolean;

  fabricIds?: string[];

  imagesToKeep?: string[];
  newImages?: string[];

  variants?: IProductVariant[];
  supplier?: string;
}


// =======================
// QUERY
// =======================
export interface IProductQuery {
  search?: string;
  category?: string;
  categories?: { id: string; name: string }[];
  collection?: string;
  brand?: string;
  gender?: Gender | string;
  fitType?: FitType | string;
  color?: string;
  size?: ClothingSize | string;
  pattern?: string;
  occasion?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
  stock?: 'in' | 'out';
  sustainable?: boolean;
  sortBy?: 'name' | 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'popularity' | 'rating_asc' | 'rating_desc';
  page?: number;
  limit?: number;

  [key: string]: unknown;
}


// =======================
// ANALYTICS
// =======================
export interface IProductAnalytics {
  totalProducts: number;
  publishedProducts: number;
  unpublishedProducts: number;
  totalVariants: number;
  lowStockVariants: number;
  outOfStockVariants: number;
  totalValue: number;
  averagePrice: number;
  topCategories: {
    categoryName: string;
    productCount: number;
    percentage: number;
  }[];
  topBrands: {
    brand: string;
    productCount: number;
    percentage: number;
  }[];
  topCollections?: {
    collectionName: string;
    productCount: number;
    percentage: number;
  }[];
}


// =======================
// STOCK UPDATE
// =======================
export interface IStockUpdate {
  variantId: string;
  addedStock: number;
  reason?: string;
  notes?: string;
}


// =======================
// SEARCH RESULT
// =======================
export interface IProductSearchResult {
  data: IProductResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: {
    brands: string[];
    categories: { id: string; name: string }[];
    collections: { id: string; name: string }[];
    priceRange: { min: number; max: number };
    genders: Gender[];
    fitTypes: FitType[];
    colors?: string[];
    sizes?: ClothingSize[];
  };
}


// =======================
// TRENDING
// =======================
export interface ITrendingProduct extends IProductResponse {
  totalSold: number;
  trendingScore: number;
}


// =======================
// RELATED PRODUCTS
// =======================
export interface IRelatedProductsResponse {
  sameBrand: IProductResponse[];
  sameCategory: IProductResponse[];
  sameGender: IProductResponse[];
  sameCollection: IProductResponse[];
  recentlyViewed?: IProductResponse[];
}


// =======================
// LOW STOCK
// =======================
export interface ILowStockProduct {
  id: string;
  name: string;
  category: string;
  lowStockVariants: Array<{
    id: string;
    sku: string;
    size: ClothingSize;
    color: string;
    stock: number;
    lowStockThreshold?: number;
  }>;
}


// =======================
// OUT OF STOCK
// =======================
export interface IOutOfStockProduct {
  id: string;
  name: string;
  category: string;
  variants: {
    id: string;
    sku: string;
    size: ClothingSize;
    color: string;
    stock: number;
  }[];
}


// =======================
// STOCK LOG
// =======================
export interface IStockLog {
  id: string;
  productId: string;
  variantId: string;
  change: number;
  reason: string;
  notes?: string;
  createdAt: string;
  product: { name: string };
  variant?: { sku: string; size: ClothingSize; color: string };
}


// =======================
// NAVBAR PRODUCTS
// =======================
export interface INavbarProducts {
  trendingByCategory: Record<string, { id: string; name: string }[]>;
  overallTrending: { id: string; name: string }[];
}
