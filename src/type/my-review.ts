export interface MyReview {
  id: number;
  restaurant: string;
  name: string;
  ratings: { id: number; user: number; food: number; rating: number }[];
}
