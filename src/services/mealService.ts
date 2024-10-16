import { supabase } from '@/db/supabaseClient';
import { Food } from '@/types';

export const fetchMeals = async (): Promise<Food[]> => {
  try {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .then((response) => {
        return {
          data: response.data as Food[],
          error: response.error,
        };
      });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
};

export const fetchMealById = async (id: number): Promise<Food | null> => {
  try {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('id', id)
      .single()
      .then((response) => {
        return {
          data: response.data as Food | null, // Assert the type here
          error: response.error,
        };
      });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching meal by ID:', error);
    throw error;
  }
};
