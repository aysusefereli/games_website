import React, { useEffect, useState } from 'react'
import './styles/FirstSection.css'
import { Link } from 'react-router-dom';

export default function () {
  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://media.rawg.io/media/games/044/044b2ee023930ca138deda151f40c18c.jpg' },
    { id: 2, url: 'https://media.rawg.io/media/screenshots/723/7230cc1be966c19d2470a19d277b31e9.jpg' },
    { id: 3, url: 'https://media.rawg.io/media/screenshots/057/057e7fffd4798fdb336e6aaca40204ba.jpg' },
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(1);
  
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(photos.length / photosPerPage); i++) {
    pageNumbers.push(i);
  }
  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(`Page changed to: ${pageNumber}`);
  };

  return (
    <div>
      <section className='firstsection'>
        <div className='title'  style={{ display: currentPage === 1 ? 'block' : 'none' }}>
          <h1>CLOUX <span>GAMES</span></h1>
          <p>
            Are you looking for hot trending new games to play? You can start
            exploring and discovering over 500,000 game titles, Right now!
          </p>
          <Link className="pages" to="/allgames">All Games</Link>
        </div>
        <div className='title' style={{ display: currentPage === 2 ? 'block' : 'none' }}>
          <h1>GAME <span>CREATORS</span></h1>
          <p>
            Are you looking for hot trending new games to play? You can start
            exploring and discovering over 500,000 game titles, Right now!
          </p>
          <Link className="pages" to="/creators">Game Creators</Link>
        </div>
        <div className='title' style={{ display: currentPage === 3 ? 'block' : 'none' }}>
          <h1>CLOUX <span>CONTACT</span></h1>
          <p>
            Are you looking for hot trending new games to play? You can start
            exploring and discovering over 500,000 game titles, Right now!
          </p>
          <Link className="pages" to="/contact">Contact</Link>
        </div>
        <div>
          {currentPhotos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.url} alt={`Photo ${photo.id}`} />
            </div>
          ))}
          <ul>
            {pageNumbers.map((number) => (
              <li key={number}>
                <button onClick={() => handlePageClick(number)} className={currentPage === number ? "active" : ""}>
                  <span></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
