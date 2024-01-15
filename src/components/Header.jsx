import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form } from 'react-bootstrap';
import './styles/Header.css';
import Heart from '../assets/Heart.png';
import Search from '../assets/Search_button.png';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites , clearFavorites} from '../store/slices/gameSlice.js';

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const favorites = useSelector((state) => state.games.favorites);
  const dispatch = useDispatch();

  const fetchData = async (value) => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=442dd6be349248468289ed3abce8fc03`);
      const data = await response.json();

      const filteredResults = data.results.filter((game) => {
        return value && game && game.name && game.name.toLowerCase().includes(value.toLowerCase());
      });
      console.log(filteredResults)

      setResults(filteredResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleFavoritesClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  return (
    <div className='headerPage'>
      <header>
        <div className='header'>
          <Navbar className={`navbar ${expanded ? 'expanded' : ''}`} expand="lg" variant="light">
            <Navbar.Brand href="#home"><h1>CLOU<span>XGAME</span></h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" onClick={handleToggle}>
              {expanded ? (
                <i id='close' className='fas fa-times'></i>
              ) : (
                <div className='hamburger'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </Navbar.Toggle>
            <Navbar.Collapse id="navbarNav" className={expanded ? 'show' : ''}>
              <Nav className={`mx-auto ${expanded ? 'hidden' : ''}`}>
                <Link className="pages" to="/">Home</Link>
                <Link className="pages" to="/allgames">All Games</Link>
                <Link className="pages" to="/creators">Creators</Link>
                <Link className='pages' to='/contact'>Contact</Link>
                <Form className={`${expanded ? 'expanded' : ''}`}>
                  <div className="search">
                    <input placeholder="search" value={input} onChange={(e) => handleChange(e.target.value)}/>
                    <button>
                      <img src={Search} alt="Search" />
                    </button>
                  </div>
                  <div className='search-list'>
                    {results.map((game, index) => (
                      <Link  className='search-list-item' key={index} to={`/games/${game.id}`}>
                        <div className='search-item-img'>
                          <img src={game.background_image} alt={game.name} />
                        </div>
                        <div>
                          <h3>{game.name}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Form>
                <div className='favorites' title='Favorites' onClick={handleFavoritesClick}>
                  <img src={Heart} alt="Favorites" />
                  <p>Favorites</p>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
      <Modal show={showModal} onHide={handleCloseModal} className='modal'>
        <Modal.Header closeButton>
          <Modal.Title className='title'>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
          {favorites.length === 0 ? (
            <p>Nothing added yet.</p>
          ) : (
            <>
              {favorites.map((favorite, index) => (
                <div className='favorite-items' key={index}>
                  <div className='modal-favorite-item'>
                    <img className='img' src={favorite.background_image} alt={favorite.name}/>
                    <Link className="name" to={`/games/${favorite.id}`}>{favorite.name}</Link>
                    <button className='removeBtn' onClick={() => dispatch(removeFromFavorites(favorite))}>Remove</button>
                  </div>
                </div>
              ))}
              <div className='clear-all-button'>
                <button className='clearBtn' onClick={() => dispatch(clearFavorites())}>Clear All</button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
