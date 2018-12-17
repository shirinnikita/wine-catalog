import {Review} from "./review";
import {Wine} from "./wine";

export interface Vintage {
  id: string;
  name: string;
  year: string;
  img: string;
  wines: Wine;

  ratings_count: number;
  ratings_sum: number;
  price: number;
  reviews_collection: Review[],
}
