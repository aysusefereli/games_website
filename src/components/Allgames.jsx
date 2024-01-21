import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import './styles/AllGames.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import { addToFavorites } from '../store/slices/gameSlice.js'
import { removeFromFavorites } from '../store/slices/gameSlice.js';
import { useDispatch, useSelector } from 'react-redux';

export default function Allgames() {
  const [game, setGame] = useState([]);
  const [games, setGames] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const favorites = useSelector((state) => state.games.favorites);
  const dispatch = useDispatch();
  console.log(favorites);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);

  const indexOfLastGames = currentPage * gamesPerPage;
  const indexOfFirstGames = indexOfLastGames - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGames, indexOfLastGames);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(games.length / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(`Page changed to: ${pageNumber}`);
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetch("https://api.rawg.io/api/games/hogwarts-legacy/screenshots?key=442dd6be349248468289ed3abce8fc03")
      .then((response) => response.json())
      .then((data) => {
        setGame(data.results[0]);
        console.log(data.results);
      });

    fetchGames("https://api.rawg.io/api/games?key=442dd6be349248468289ed3abce8fc03");
  }, []);

  const fetchGames = async (url, page = 1) => {
    try {
      const response = await fetch(`${url}&page=${page}`);
      const data = await response.json();

      dispatch(addToFavorites(data.results[0].id));

      setGames((prevGames) => [...prevGames, ...data.results]);
      setNextPage(data.next);

      if (page < 40 && data.next !== null) {
        await fetchGames(url, page + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      const starColor = i <= roundedRating ? "#ffcc00" : "#ffffff";
      stars.push(<i key={i} className="fas fa-star" style={{ color: starColor }} />);
    }

    return stars;
  };

  const isGameInFavorites = (gameId) => {
    return favorites.some((game) => game.id === gameId);
  };

  const handleFavoriteClick = (game) => {
    if (isGameInFavorites(game.id)) {
      dispatch(removeFromFavorites(game));
    } else {
      dispatch(addToFavorites(game));
    }
  };

  return (
    <div className="allGames">
      <Header />
      <div className="games" style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game.image})`,}}>
        <h1>ALL GAMES</h1>
        <div>
          <ul>
            <li className="home">
              <span>
                <Link className="pages" to="/">
                  Home
                </Link>
              </span>
            </li>
            <li>
              <span property="name">All Games</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='gameList'>
        <div className="gameGroup">
          {currentGames.map((game) => (
            <div className="gameItem" key={game.id}>
              <img src={game.background_image} alt={game.name} />
                <div className="gameText">
                  <p className="nameText">{game.name}</p>
                  <p className="rating">{renderStars(game.rating)}</p>
                  <p className="releaseDate">Release Date: {game.released}</p>
                  <div className='details_favorites'>
                    <Link className="btn" to={`/games/${game.id}`}>See More</Link>
                    <button onClick={() => handleFavoriteClick(game)}>
                      <i title={isGameInFavorites(game.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        className={isGameInFavorites(game.id) ? 'fas fa-check' : 'fas fa-plus'} id='plus' aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNextPage} disabled={!nextPage}>Next</button>
          </div>
        </div>
      <Footer/>
    </div>
  );
}
