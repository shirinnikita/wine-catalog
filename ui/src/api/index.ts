import { FoodPiece } from '../model';
const baseURL = 'http://localhost:5000/api';

const fetchFood = (): Promise<FoodPiece[]> => {
  const membersURL = `${baseURL}/list_food`;
  return fetch(membersURL)
    .then(response => response.json());
};

const fetchVintages = (): Promise<FoodPiece[]> => {
  const membersURL = `${baseURL}/list_vintages`;
  return fetch(membersURL)
    .then(response => response.json());
};

export const API = {
  fetchFood,
  fetchVintages,
};
