export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage?: string;
  categoryId: string;
  categoryName: string;
  brand?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  inStock: boolean;
  stockCount?: number;
  discountPercentage?: number;
  badge?: string;
  tags?: string[];
}
