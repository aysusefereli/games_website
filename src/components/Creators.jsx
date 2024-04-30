import React, { useEffect, useState } from 'react';
import './styles/Creators.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Creators() {
  const [game, setGame] = useState([]);
  const [creators, setCreators] = useState([]);
  const [nextPage, setNextPage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [creatorsPerPage, setCreatorsPerPage] = useState(10);

  const indexOfLastCreators = currentPage * creatorsPerPage;
  const indexOfFirstCreators = indexOfLastCreators - creatorsPerPage;
  const currentCreators = creators.slice(indexOfFirstCreators, indexOfLastCreators);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(creators.length / creatorsPerPage); i++) {
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

    fetchCreators("https://api.rawg.io/api/creators?key=442dd6be349248468289ed3abce8fc03")
  }, []);

  const fetchCreators = async (url, page = 1) => {
    try {
      const response = await fetch(`${url}&page=${page}`);
      const data = await response.json();

      setCreators((prevCreators) => [...prevCreators, ...data.results]);
      setNextPage(data.next);

      if (page < 10 && data.next !== null) {
        await fetchCreators(url, page + 1);
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
    <div className='creatorsPage'>
      <Header />
      <div className="games" style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game.image})`,}}>
        <h1>CREATORS</h1>
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
              <span property="name">Creators</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='creators'>
        <div className='creators_list'>
          {currentCreators.map((creators, index) => (
            <div className='creator' key={index} style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${creators.image_background}) center/cover`}}>
              <div className='card-top'>
                <img className='creator_image' src={creators.image}/>
              </div>
              <div className='text'>
                <h1>{creators.name}</h1>
                <p>Games Count: <span>{creators.games_count}</span></p>
                <p>Position: <span>{creators.positions.slice(0, creators.positions.length).map(position => position.name).join(', ')}</span></p>
                <p>Games: <span>{creators.games.slice(0, creators.games.length).map(game => game.name).join(', ')}</span></p>
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
