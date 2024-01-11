import React, { useEffect, useState } from 'react'
import './styles/Favorites.css'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function favorites() {
  const [game ,setGame] = useState([]);
  const favorites = useSelector((state) => state.game.favorites);
  console.log(favorites);
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("https://api.rawg.io/api/games/hogwarts-legacy/screenshots?key=442dd6be349248468289ed3abce8fc03")
      .then((response) => response.json())
      .then((data) => {
        setGame(data.results[0]);
        console.log(data.results[0]);
    });
  }, []);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <div className='favoritesPage'>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
          Full screen
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {favorites.map((f)=> (
          <div key={f.id}>
            <div className='item-img'>
              <img src={f.background_image} alt={f.name} />
            </div>
            <div>
              <h3>{f.name}</h3>
            </div>
          </div>
        ))}
        </Modal.Body>
      </Modal>
      </div>
  )
}
