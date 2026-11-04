import bannersData from "@/data/banners.json";
import { HeroBanner, PromoBanner } from "@/types/banner";

/**
 * Retrieves hero carousel banners.
 */
export async function getHeroBanners(): Promise<HeroBanner[]> {
  return bannersData.heroBanners as HeroBanner[];
}

/**
 * Retrieves promotional banners.
 */
export async function getPromoBanners(): Promise<PromoBanner[]> {
  return bannersData.promoBanners as PromoBanner[];
}
