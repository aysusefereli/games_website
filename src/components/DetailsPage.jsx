import React, { useEffect, useState } from 'react'
import './styles/DetailsPage.css'
import Header from '../components/Header.jsx'
import { Link, useParams } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from '../components/Footer.jsx';

export default function DetailsPage() {
  const [details, setDetails] = useState([]);
  const [detailsImages, setDetailsImages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [description, setDescription] = useState([]);
  let { gameId } = useParams();

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${gameId}?key=442dd6be349248468289ed3abce8fc03`)
      .then((response) => response.json())
      .then((data) => { 
        setDetails(data);
        setGenres(data.genres[0])
        setDevelopers(data.developers[0])
        setPublishers(data.publishers[0])
        setPlatforms(data.platforms[0].platform)
        setDescription(data.description_raw.split('.').slice(0, 10).join('.'))
      });  

    fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=442dd6be349248468289ed3abce8fc03`)
      .then((response) => response.json())
      .then((data) => { 
        setDetailsImages(data.results);
        console.log(data.results)
      }); 
  }, []);

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
    <div className='detailsPage'>
      <Header/>
      <div className="games" style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${details.background_image})`,}}>
        <h1>{details.name}</h1>
        <div>
          <ul>
            <li className="home">
              <span>
                <Link className="pages" to="/">
                  Home
                </Link>
              </span>
            </li>
            <li className="all">
              <span>
                <Link className="pages" to="/allgames">
                  All Games
                </Link>
              </span>
            </li>
            <li>
              <span property="name">{details.name}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='gameDetails'>
        <div className='slider_about'>
          <div className='slider'>
            <Carousel className='image_slider' useKeyboardArrows={true}>
              {detailsImages.map((image, index) => (
                <div key={index} className="slide">
                  <img alt={`slide-${index}`} src={image.image}/>
                </div>
              ))}
            </Carousel>
          </div>
          <div className='about'>
            <h1>ABOUT <span>{details.name}</span></h1>
            <p>{description}</p>
          </div>
        </div>
        <div className='details_poster'>
          <div className='details'>
            <h1>GAME <span>DETAILS</span></h1>
            <div className='detail'>
              <i className="fas fa-tags" aria-hidden="true"></i>
              <p>GENRE: <span>{genres.name}</span></p>
            </div>
            <div className='detail'>
              <i className="far fa-clock" aria-hidden="true"></i>
              <p>RELEASE DATE: <span>{details.released}</span></p>
            </div>
            <div className='detail'>
              <i className="fas fa-cogs" aria-hidden="true"></i>
              <p>DEVELOPER: <span>{developers.name}</span></p>
            </div>
            <div className='detail'>
              <i className="fas fa-globe" aria-hidden="true"></i>
              <p>PUBLISHER: <span>{publishers.name}</span></p>
            </div>
            <div className='detail'>
              <i className="fas fa-tv" aria-hidden="true"></i>
              <p>PLATFORM: <span>{platforms.name}</span></p>
            </div>
            <div className='detail'>
              <i className="fas fa-share-alt" aria-hidden="true"></i>
              <p>WEBSITE: <span>{details.website}</span></p>
            </div>
            <div className='detail'>
              <p>{renderStars(details.rating)}</p>
            </div>
          </div>
          <div className='poster'>
            <h1>GAME <span>POSTER</span></h1>
            <img src={details.background_image}/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
