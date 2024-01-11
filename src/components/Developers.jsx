import React, { useEffect, useState } from 'react'
import './styles/Developers.css'
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Developers() {
  const [game, setGame] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [nextPage, setNextPage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [developersPerPage, setDevelopersPerPage] = useState(10);

  const indexOfLastDevelopers = currentPage * developersPerPage;
  const indexOfFirstDevelopers = indexOfLastDevelopers - developersPerPage;
  const currentDevelopers = developers.slice(indexOfFirstDevelopers, indexOfLastDevelopers);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(developers.length / developersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(`Page changed to: ${pageNumber}`);
  };

  const handleNextPage = () => {
    if (nextPage && currentPage < 10) {
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

    fetchDevelopers("https://api.rawg.io/api/developers?key=442dd6be349248468289ed3abce8fc03")  
  }, []);

  const fetchDevelopers = async (url, page = 1) => {
    try {
      const response = await fetch(`${url}&page=${page}`);
      const data = await response.json();

      setDevelopers((prevDevelopers) => [...prevDevelopers, ...data.results]);
      setNextPage(data.next);

      if (page < 10 && data.next !== null) {
        await fetchDevelopers(url, page + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className='developersPage'>
      <Header />
      <div className="games" style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game.image})`,}}>
        <h1>DEVELOPERS</h1>
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
              <span property="name">Developers</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='developers'>
        <div className='developers_list'>
          {currentDevelopers.map((developers, index) => (
            <div className='developer' key={index} style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${developers.image_background}) center/cover`}}>
              <div className='text'>
                <h1>{developers.name}</h1>
                <p>Games Count: <span>{developers.games_count}</span></p>
                <p>Games: <span>{developers.games.slice(0, developers.games.length).map(game => game.name).join(', ')}</span></p>
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
  )
}
