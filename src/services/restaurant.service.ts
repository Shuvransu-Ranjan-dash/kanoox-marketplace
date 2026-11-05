import restaurantsData from "@/data/restaurants.json";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  deliveryTime: string;
  location: string;
  image: string;
  badge?: string;
  isOpen: boolean;
}

const restaurants: Restaurant[] = restaurantsData as Restaurant[];

export async function getRestaurants(): Promise<Restaurant[]> {
  return restaurants;
}

export async function getRestaurantById(id: string): Promise<Restaurant | undefined> {
  return restaurants.find((r) => r.id === id);
}
