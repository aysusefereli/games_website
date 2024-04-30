import React, { useEffect, useRef, useState } from 'react'
import './styles/Contact.css'
import Header from '../components/Header.jsx';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Footer from '../components/Footer.jsx';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [game, setGame] = useState([]);
  const form = useRef()
  const btn = useRef()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_tblmpac', 'template_wsbixiq', form.current, {
        publicKey: 'VuLT51HHpG5LZDnnl',
      })
      .then(
        () => {
          setName("")
          setEmail("")
          setMessage("")
          btn.current.innerText = "Submit"
          alert("email successfully sent check inbox");
        },
        (error) => {
          alert('FAILED...', error.text);
        },
      );
  };

  useEffect(() => {
    fetch("https://api.rawg.io/api/games/hogwarts-legacy/screenshots?key=442dd6be349248468289ed3abce8fc03")
      .then((response) => response.json())
      .then((data) => {
        setGame(data.results[0]);
        console.log(data.results);
      });

    const map = L.map('the-map', {
      center: [40.37747916152059, 49.85320528233953],
      zoom: 13,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.marker([40.37747916152059, 49.85320528233953], {
      draggable: true,
      opacity: 0.75,
    });

    marker.addTo(map).bindPopup('<p>Koordinatlar: 40.37747916152059, 49.85320528233953</p>').openPopup();
  }, []); 

  return (
    <div className='contactPage'>
      <Header />
      <div className="games" style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game.image})`,}}>
        <h1>CONTACT</h1>    
      </div>
      <div className='contact'>
        <div className='map'>
          <div id="the-map" style={{ height: '500px'}}></div>
        </div>
        <div className='form'>
          <div className='email'>
              <form onSubmit={sendEmail} ref={form}>
               <div className='nameAndEmail'>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name='sender_name'
                    id="sender_name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name='email'
                    id="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
               </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="message"
                    name='message'
                    rows={3}
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn" ref={btn}>Submit</button>
              </form>
          </div>
          <div className='information'>
            <div className='info'>
              <i className='fas fa-map-marker-alt'></i>
              <p>Af Business House, 2-ci mərtəbə, 203B Nizami St, Baku 1000</p>
            </div>
            <div className='info'>
              <i className='fas fa-envelope'></i>
              <a href='info@cloux.com'>info@cloux.com</a>
            </div>
            <div className='info'>
              <i className='fas fa-phone'></i>
              <p>0507662000</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}