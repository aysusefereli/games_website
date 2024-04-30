import React, { useEffect, useState } from 'react';
import './styles/Publishers.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Publishers() {
  const [game, setGame] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [nextPage, setNextPage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [publishersPerPage, setPublishersPerPage] = useState(10);

  const indexOfLastPublishers = currentPage * publishersPerPage;
  const indexOfFirstPublishers = indexOfLastPublishers - publishersPerPage;
  const currentPublishers = publishers.slice(indexOfFirstPublishers, indexOfLastPublishers);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(publishers.length / publishersPerPage); i++) {
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

    fetchPublishers("https://api.rawg.io/api/publishers?key=442dd6be349248468289ed3abce8fc03")  
  }, []);

  const fetchPublishers = async (url, page = 1) => {
    try {
      const response = await fetch(`${url}&page=${page}`);
      const data = await response.json();

      setPublishers((prevPublishers) => [...prevPublishers, ...data.results]);
      setNextPage(data.next);

      if (page < 10 && data.next !== null) {
        await fetchPublishers(url, page + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className='publishersPage'>
      <Header />
      <div className="games" style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game.image})`,}}>
        <h1>PUBLISHERS</h1>
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
              <span property="name">Publishers</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='publishers'>
        <div className='publishers_list'>
          {currentPublishers.map((publishers, index) => (
            <div className='publisher' key={index} style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${publishers.image_background}) center/cover`}}>
              <div className='text'>
                <h1>{publishers.name}</h1>
                <p>Games Count: <span>{publishers.games_count}</span></p>
                <p>Games: <span>{publishers.games.slice(0, publishers.games.length).map(game => game.name).join(', ')}</span></p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
            <Stack spacing={2}>
              <Pagination count={10} variant="outlined" onChange={(event, page) => {handlePageClick(page); scrollToTop();}}/>
            </Stack>
          </div>
      </div>
      <Footer/>
    </div>
  )
}
