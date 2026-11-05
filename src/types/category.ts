export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  itemCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image?: string;
  itemCount: number;
  featured?: boolean;
  subcategories?: SubCategory[];
  badge?: string;
  color?: string;
}
