import { createSlice } from '@reduxjs/toolkit';

const storedState = JSON.parse(localStorage.getItem('reduxState')) || { favorites: [] };

const initialState = {
  ...storedState,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const newGame = action.payload;
      if (newGame && newGame.id) {
        const existingGame = state.favorites.find((game) => game.id === newGame.id);

        if (!existingGame) {
          state.favorites.push(newGame);
          updateLocalStorage(state.favorites);
        }
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((game) => game.id !== action.payload.id);
      updateLocalStorage(state.favorites);
    },
    clearFavorites: (state) => {
      state.favorites = [];
      updateLocalStorage(state.favorites);
    },
  },
});

const updateLocalStorage = (favorites) => {
  localStorage.setItem('reduxState', JSON.stringify({ favorites }));
};

export const { addToFavorites, removeFromFavorites, clearFavorites } = gameSlice.actions;

export default gameSlice.reducer;
