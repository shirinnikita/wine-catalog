export interface User {
    alias: string;
    id: string;
    img: string;

}

export interface Review {
  id: number;
  user_id: number;
  vintage_id: number;
  note: string;
  rating: number;
  users: User;
}
