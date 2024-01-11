import { createSlice } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react';

// const GameComponent = () => {
//     const [games, setGames] = useState([]);
//     const [nextPage, setNextPage] = useState('');
  
//     useEffect(() => {
//       fetchGames("https://api.rawg.io/api/games?key=6f51649af373481d9600f6f20a13d884");
//     }, []);
  
//     const fetchGames = async (url, page = 1) => {
//       try {
//         const response = await fetch(`${url}&page=${page}`);
//         const data = await response.json();
  
//         setGames((prevGames) => [...prevGames, ...data.results]);
//         setNextPage(data.next);
  
//         if (page < 40 && data.next !== null) {
//           await fetchGames(url, page + 1);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
// }
  
const initialState = {
  game: [],
  favorites: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const gameToAdd = state.game.find((game) => game.id === action.payload);
            if (gameToAdd) {
                state.favorites.push(gameToAdd);
            }
        },
    },
})

export const { addToFavorites } = gameSlice.actions

export default gameSlice.reducer
