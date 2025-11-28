import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';

import Navbar from './components/Navbar.jsx';
import Frontchatbot from './components/Receptor.jsx';
import Carrusel from './components/Carrusel.jsx';
import CartModal from './components/CartModal.jsx';
/**
 * App: Punto de entrada principal de la app. Configura Router, Navbar, Chat
 * y el modal del carrito, y define las rutas de la aplicación.
 */
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Frontchatbot />
      <CartModal />
      

      <Routes>
        <Route path="/" element={<Home />} />
      
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;