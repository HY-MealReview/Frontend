export interface MyReview {
  id: number;
  name: string;
  ratings: { id: number; user: number; food: number; rating: number }[];
}
