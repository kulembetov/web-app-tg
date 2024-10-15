import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './foodSlice.ts';

const store = configureStore({
  reducer: {
    foodList: foodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
