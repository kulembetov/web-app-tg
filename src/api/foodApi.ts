import axios from 'axios';

export interface Meal {
  idMeal: number;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchMeals = async () => {
  try {
    const response = await axios.get(`${API_URL}/search.php?s=`);
    return response.data.meals;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchMealById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    return response.data.meals[0];
  } catch (e) {
    console.error(e);
    throw e;
  }
};
