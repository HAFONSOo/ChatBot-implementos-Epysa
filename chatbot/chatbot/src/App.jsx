import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';

import Navbar from './components/Navbar.jsx';
import Frontchatbot from './components/Receptor.jsx';
import Carrusel from './components/Carrusel.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Frontchatbot />
   
      

      <Routes>
        <Route path="/" element={<Home />} />
      
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;