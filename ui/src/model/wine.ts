import {FoodPiece} from "./foodPiece";
import {Grape} from "./grape";

export interface Wine {
  id: string;
  name: string;
  style: string;
  styles: {name:string, food_collection: FoodPiece[], grapes_collection: Grape[]};
  ratings_count: number;
  ratings_sum: number;
}
