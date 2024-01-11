import React, { useState, useEffect } from 'react'
import './styles/Footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {
    const [game, setGame] = useState({});

    useEffect(() => {   
        fetch("https://api.rawg.io/api/games/hogwarts-legacy?key=442dd6be349248468289ed3abce8fc03")
          .then(response => response.json())
          .then(data => {
            setGame(data);
        }); 
    }, []);

  return (
    <div className='clouxFooter'>
        <footer>
            <div className='footer'>
                <div className='clouxPages'>
                    <h1>CLOU<span>XGAME</span></h1>
                    <div className='links'>
                        <div className='link'>
                            <Link className="pages" to="/">Home</Link>
                            <Link className="pages" to="/allgames">All Games</Link>
                            <Link className='pages' to='/contact'>Contact</Link>
                        </div>
                        <div className='link'>
                            <Link className='pages' to={"/creators"}>Creators</Link>
                            <Link className='pages' to={"/publishers"}>Publishers</Link>
                            <Link className='pages' to={"/developers"}>Developers</Link>
                        </div>
                    </div>
                </div>
                <div className='newGame'>
                    <h1>NEW <span>GAME</span></h1>
                    <div className='hogwarts'> 
                        <img src={game.background_image}/>
                        <div>
                            <Link className="page" to="/details">Hogwarts Legacy</Link>
                        </div>
                    </div>
                </div>
                <div className='socialNetworks'>
                    <h1>OUR <span>SOCIAL NETWORKS</span></h1>
                    <div className='networks'>
                        <div className='network'>
                            <a href='#'><i className="fab fa-twitter social-icon twitter-icon"></i></a>
                            <p>Twitter</p>
                        </div>
                        <div className='network'> 
                            <a href='#'><i className="fab fa-facebook-f social-icon facebook-icon"></i></a>
                            <p>Facebook</p>
                        </div>
                        <div className='network'>
                            <a href='#'><i className="fab fa-instagram social-icon instagram-icon"></i></a>
                            <p>Instagram</p>
                        </div>
                        <div className='network'>
                            <a href='#'><i className="fab fa-skype social-icon skype-icon"></i></a>
                            <p>Skype</p>
                        </div>
                        <div className='network'>
                            <a href='#'><i className="fab fa-linkedin-in social-icon linkedin-icon"></i></a>
                            <p>Linkedin</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footerTwo'>
                <h1>CLOUX<span>GAME</span></h1>
                <p>Copyright © 2023 Cloux - All rights reserved.</p>
            </div>
        </footer>
    </div>
  )
}
