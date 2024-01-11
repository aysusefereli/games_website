import React, { useEffect, useState } from 'react'
import './styles/StoresDetails.css'
import Header from '../components/Header.jsx'
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

export default function StoresDetails() {
  const [stores, setStores] = useState([]);
  const [description, setDescription] = useState([]);
  let { storeId } = useParams();

  useEffect(() => {
    fetch(`https://api.rawg.io/api/stores/${storeId}?key=442dd6be349248468289ed3abce8fc03`)
      .then((response) => response.json())
      .then((data) => { 
        setStores(data);
      });  
  }, []);

  return (
    <div className='storesDetails'>
      <Header/>
      <div className="games" style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${stores.image_background})`,}}>
        <h1>{stores.name}</h1>
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
              <span property="name">{stores.name}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='stores'>
        <div className='store_img'>
          <img src={stores.image_background}/>
        </div>
        <div className='text'>
          <h1>{stores.name}</h1>
          <h4>Domain: <span>{stores.domain}</span></h4>
          <h4>Games Count: <span>{stores.games_count}</span></h4>
          <div dangerouslySetInnerHTML={{__html: (stores.description)}}></div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
