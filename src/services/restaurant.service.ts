import restaurantsData from "@/data/restaurants.json";

export interface Restaurant {
  id: string;
  countryId?: string;
  name: string;
  location: string;
  image: string;
  cuisine?: string;
  rating?: number;
  reviewCount?: number;
  priceLevel?: string;
  deliveryTime?: string;
  badge?: string;
  isOpen?: boolean;
}

const restaurants: Restaurant[] = restaurantsData as Restaurant[];

export async function getRestaurants(countryId?: string): Promise<Restaurant[]> {
  if (countryId) {
    const filtered = restaurants.filter(
      (r) => r.countryId?.toLowerCase() === countryId.toLowerCase()
    );
    if (filtered.length > 0) return filtered;
  }
  return restaurants.filter((r) => r.countryId === "bahamas" || !r.countryId);
}

export async function getRestaurantById(id: string): Promise<Restaurant | undefined> {
  return restaurants.find((r) => r.id === id);
}
