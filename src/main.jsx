import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'; 
import store from './store/store.js';
import Allgames from './components/Allgames.jsx'
import Favorites from './components/Favorites.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import DetailsPage from './components/DetailsPage.jsx'
import Contact from './components/Contact.jsx'
import Creators from './components/Creators.jsx'
import Publishers from './components/Publishers.jsx'
import Developers from './components/Developers.jsx'
import StoresDetails from './components/StoresDetails.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/allgames" element={<Allgames/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/games/:gameId" element={<DetailsPage/>}/>
        <Route path="/creators" element={<Creators/>}/>
        <Route path="/publishers" element={<Publishers/>}/>
        <Route path="/developers" element={<Developers/>}/>
        <Route path='/stores/:storeId' element={<StoresDetails/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>

)
