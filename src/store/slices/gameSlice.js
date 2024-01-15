import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favorites: [],
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
                }
            }
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter((game) => game.id !== action.payload.id);
        },
        clearFavorites: (state) => {
            state.favorites = [];
        },
    },
})

export const { addToFavorites , removeFromFavorites , clearFavorites } = gameSlice.actions

export default gameSlice.reducer