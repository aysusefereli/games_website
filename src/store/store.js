import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice.js';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  }, 
});

export default store;
