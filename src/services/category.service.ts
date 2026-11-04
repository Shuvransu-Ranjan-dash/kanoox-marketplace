import categoriesData from "@/data/categories.json";
import { Category } from "@/types/category";

const categories: Category[] = categoriesData as Category[];

/**
 * Retrieves all categories.
 */
export async function getCategories(): Promise<Category[]> {
  return categories;
}

/**
 * Retrieves featured categories for homepage carousel/grid.
 */
export async function getFeaturedCategories(): Promise<Category[]> {
  return categories.filter((c) => c.featured);
}

/**
 * Retrieves a category by ID or slug.
 */
export async function getCategoryById(id: string): Promise<Category | undefined> {
  return categories.find((c) => c.id === id || c.slug === id);
}
