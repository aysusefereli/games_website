import React, { useState, useEffect } from 'react';
import './styles/MainSection.css';
import { Link } from 'react-router-dom';
import { addToFavorites } from '../store/slices/gameSlice.js'
import { removeFromFavorites } from '../store/slices/gameSlice.js';
import { useDispatch, useSelector } from 'react-redux';

export default function MainSection() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({});
  const [genres, setGenres] = useState([]);
  const [activeTab, setActiveTab] = useState({});
  const [tabButtonStatus, setTabButtonStatus] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [stores, setStores] = useState([]);
  const [featured, setFeatured] = useState([]);
  const favorites = useSelector((state) => state.games.favorites);
  const dispatch = useDispatch();
  const [showMessageAdd, setShowMessageAdd] = useState(false); 
  const [showMessageRemove, setShowMessageRemove] = useState(false); 

  const fetchGames = async (url, page = 1) => {
    try {
      const response = await fetch(`${url}&page=${page}`);
      const data = await response.json();
  
      setGames(prevGames => [...prevGames, ...data.results]);
      setNextPage(data.next);
  
      if (page < 85 && data.next !== null) {
        await fetchGames(url, page + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchGames("https://api.rawg.io/api/games?key=442dd6be349248468289ed3abce8fc03");

    fetch("https://api.rawg.io/api/games/hogwarts-legacy?key=442dd6be349248468289ed3abce8fc03")
      .then(response => response.json())
      .then(data => {
        setNewGame(data);
      });

    fetch("https://api.rawg.io/api/games?dates=2023-01-10%2C2023-12-10&key=442dd6be349248468289ed3abce8fc03&ordering=-added")
      .then(response => response.json())
      .then(data => {
        setFeatured(data.results);
      });

    fetch("https://api.rawg.io/api/genres?key=442dd6be349248468289ed3abce8fc03")
      .then(response => response.json())
      .then(data => {
        setGenres(data.results);
        setActiveTab(data.results[0] || {});
      });

    fetch("https://api.rawg.io/api/stores?key=442dd6be349248468289ed3abce8fc03")
      .then(response => response.json())
      .then(data => {
        setStores(data.results);
      });  
  }, []);

  const tabClickHandler = (id) => {
    const selectedGenre = genres.find(genre => genre.id === id);
    if (selectedGenre) {
      setActiveTab(selectedGenre);
    }
  };

  const tabButtonsHandler = () => setTabButtonStatus(prevStatus => !prevStatus);

  const isActive = (id) => {
    return activeTab.id === id;
  };

  const isGameInFavorites = (gameId) => {
    return favorites.some((game) => game.id === gameId);
  };

  const handleFavoriteClick = (game) => {
    if (isGameInFavorites(game.id)) {
      dispatch(removeFromFavorites(game));
      setShowMessageRemove(true); 
    } else {
      dispatch(addToFavorites(game));
      setShowMessageAdd(true); 
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessageAdd(false);
      setShowMessageRemove(false)
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [showMessageAdd, showMessageRemove]);

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      const starColor = i <= roundedRating ? '#ffcc00' : '#ffffff'; 
      stars.push(
        <i key={i} className="fas fa-star" style={{ color: starColor }} />
      );
    }

    return stars;
  }

  const getStarColorClass = (starIndex, rating) => {
    const percentage = (starIndex / 5) * 100;
    return rating >= percentage ? 'color5' : (rating >= percentage - 20 ? 'color4' : (rating >= percentage - 40 ? 'color3' : (rating >= percentage - 60 ? 'color2' : 'color1')));
  }

  return (
    <div>
      <section className='secondsection'>
        <div className='secondPage'>
          <div className='cloux_games'>
            <div className='texts' id='firstText'>
              <h1>CREATORS</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, itaque.</p>
              <Link className='pages' to={"/creators"}>Creators</Link>
            </div>
          </div>
          <div className='cloux_game_details'>
            <div className='texts' id='secondText'>
              <h1>PUBLISHERS</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, corporis.</p>
              <Link className='pages' to={"/publishers"}>Publishers</Link>
            </div>
          </div>
          <div className='cloux_contact'>
            <div className='texts' id='thirdText'>
              <h1>DEVELOPERS</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, cumque.</p>
              <Link className='pages' to={"/developers"}>Developers</Link>
            </div>
          </div>
        </div>
      </section>

      <section className='thirdsection'>
        <div className='ourTopGames'>
          <h1 className='ourGames'>FEATURED <span>GAMES</span></h1>
        <main className="page-content">
          {featured.slice(0, 9).map((game, index) => (
            <div className="card" key={index} style={{ backgroundImage: `url(${game.background_image})`}}>
              <div>
                <div className="content">
                  <h2 className="title">{game.name}</h2>
                  <div className="genres">
                    <i className="fas fa-tags" aria-hidden="true"></i>
                    <p id='genreName'>{game.genres[0].name}</p>
                    <p className="rating">{renderStars(game.rating)}</p>
                  </div>
                </div>
                <Link className="btn" to={`/games/${game.id}`}>See More</Link>
              </div>
            </div>
          ))}
        </main>
        </div>
      </section>

      <section className='fourthsection'>
        <div>
            <div className='newGame' style={{ backgroundImage: `url(${newGame.background_image_additional})` }}>
              <div className='newGameText'>
                <h1>THE GAME <span>IS RELEASED!</span></h1>
                <p>{newGame.name}</p>
                <Link className="pages" to={`/games/${newGame.id}`}>See More</Link>
              </div>
              <div>
                <img src={newGame.background_image}/>
              </div>
            </div>
        </div>
      </section>

      <section className='fifthsection'>
      {showMessageAdd && <div id="message">Game added to Favorites!</div>} 
      {showMessageRemove && <div id="message">Game removed from Favorites!</div>}
        <div>
          <h1>TOP <span>GENRES</span></h1>
        </div>
        <div className='topGenres'>
          <button className="dropbtn">Genres</button>
          <div className={`tabs-buttons ${tabButtonStatus ? "show" : ""}`} style={{background: `linear-gradient(#ffc10787, #ffc107b0), url(https://media.rawg.io/media/screenshots/723/7230cc1be966c19d2470a19d277b31e9.jpg)`}}>
            {genres.map((genre, index) => (
              <button onClick={() => { tabClickHandler(genre.id); tabButtonsHandler(); }} key={index}
              className={`tabs-button ${isActive(genre.id) ? 'tabs-active' : ''}`}>{genre?.name}</button>
            ))}
          </div>
          <div className='sidebar'>
            <div className='gameGroup'>
              {activeTab?.games?.map((gameData, index) => {
                const game = games.find(g => g.id === gameData.id) || {} ;
              
                return (
                  <div className='gameItem' key={index}>
                    <img src={game.background_image || 'default_background_image_url'} alt={game?.name} />
                    <div className='gameText'>
                      <p className='nameText'>{game?.name}</p>
                      <p className="rating">{renderStars(game?.rating)}</p>
                      <p className='releaseDate'><span>Release Date:</span> {game?.released}</p>
                      <div className='details_favorites'>
                        <Link className="btn" to={`/games/${game.id}`}>See More</Link>
                        <button onClick={() => handleFavoriteClick(game)}>
                          <i title={isGameInFavorites(game.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                           className={isGameInFavorites(game.id) ? 'fas fa-check' : 'fas fa-plus'} id='plus' aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className='sixthsection'>
        <div>
          <h1>OUR <span>GAME STORES</span></h1>
        </div>
        <div className='ourStores'>
          {stores.map((store, index) => (
            <div className='stores' key={index}>
              <div>
                <img src={store.image_background}/>
              </div>
              <div className='storesText'>
                <Link className='storeDetails' to={`/stores/${store.id}`}>{store.name}</Link>
                <p className='domain'>Domain: <span>{store.domain}</span></p>
                <p>Games: <span>{store.games[0].name},{store.games[1].name},{store.games[2].name},{store.games[3].name},{store.games[4].name},{store.games[5].name}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}