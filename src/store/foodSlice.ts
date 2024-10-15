import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMeals, fetchMealById } from '@/api/foodApi.ts';
import { Meal } from '@/api/foodApi';
import { Food } from '@/types';

export const loadMeals = createAsyncThunk('foodList/loadMeals', async () => {
  const meals = await fetchMeals();
  return meals;
});

export const loadMealById = createAsyncThunk(
  'foodDetail/loadMealById',
  async (id: string) => {
    const meal = await fetchMealById(id);
    return meal;
  }
);

interface FoodPosition {
  idMeal: number;
  position: number;
}

interface FoodState {
  foods: Meal[];
  foodDetail: Meal | null;
  positions: FoodPosition[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  selectedCards: number[];
  scrollOpacity: number;
  isHovered: boolean;
}

const initialState: FoodState = {
  foods: [],
  foodDetail: null,
  positions: [],
  loading: true,
  error: null,
  currentPage: 1,
  itemsPerPage: 9,
  selectedCards: [],
  scrollOpacity: 1,
  isHovered: false,
};

const foodSlice = createSlice({
  name: 'foodList',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    selectCard(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.selectedCards.includes(id)) {
        state.selectedCards = state.selectedCards.filter(
          (cardId) => cardId !== id
        );
      } else {
        state.selectedCards.push(id);
      }
    },
    removeSelected(state) {
      state.foods = state.foods.filter(
        (food) => !state.selectedCards.includes(food.idMeal)
      );
      state.selectedCards = [];
    },
    dragItem(
      state,
      action: PayloadAction<{ draggedId: number; droppedId: number }>
    ) {
      const { draggedId, droppedId } = action.payload;
      const draggedIndex = state.foods.findIndex(
        (food) => food.idMeal === draggedId
      );
      const droppedIndex = state.foods.findIndex(
        (food) => food.idMeal === droppedId
      );

      if (draggedIndex > -1 && droppedIndex > -1) {
        const [draggedFood] = state.foods.splice(draggedIndex, 1);
        state.foods.splice(droppedIndex, 0, draggedFood);

        state.positions = state.foods.map((food, index) => ({
          idMeal: food.idMeal,
          position: index,
        }));
      }
    },
    setScrollOpacity(state, action: PayloadAction<number>) {
      state.scrollOpacity = action.payload;
    },
    setHoverState(state, action: PayloadAction<boolean>) {
      state.isHovered = action.payload;
    },
    clearFoodDetail(state) {
      state.foodDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;

        state.positions = action.payload.map((food: Food, index: number) => ({
          idMeal: food.idMeal,
          position: index,
        }));
      })
      .addCase(loadMeals.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load meals.';
      })
      .addCase(loadMealById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMealById.fulfilled, (state, action: PayloadAction<Meal>) => {
        state.loading = false;
        state.foodDetail = action.payload;
      })
      .addCase(loadMealById.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load meal details.';
      });
  },
});

export const {
  setPage,
  selectCard,
  removeSelected,
  dragItem,
  setScrollOpacity,
  setHoverState,
  clearFoodDetail,
} = foodSlice.actions;

export default foodSlice.reducer;
