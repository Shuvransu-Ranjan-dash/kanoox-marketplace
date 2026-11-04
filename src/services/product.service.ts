import productsData from "@/data/products.json";
import { Product } from "@/types/product";

const products: Product[] = productsData as Product[];

/**
 * Retrieves all products.
 */
export async function getProducts(): Promise<Product[]> {
  return products;
}

/**
 * Retrieves a single product by ID.
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

/**
 * Retrieves featured products for homepage highlights.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.isFeatured);
}

/**
 * Retrieves popular/best-selling products.
 */
export async function getPopularProducts(): Promise<Product[]> {
  return products.filter((p) => p.isPopular);
}

/**
 * Retrieves products belonging to a specific category.
 */
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return products.filter((p) => p.categoryId === categoryId);
}

/**
 * Searches products by keyword (name, description, brand, or category).
 */
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.categoryName.toLowerCase().includes(lowerQuery) ||
      (p.brand && p.brand.toLowerCase().includes(lowerQuery))
  );
}
