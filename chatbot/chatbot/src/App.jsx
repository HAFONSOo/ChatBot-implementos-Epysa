import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import SignUp from './components/SignUp.jsx'; // Corregí el typo "SingUp"
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Frontchatbot from './components/Receptor.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Frontchatbot />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registrarse" element={<SignUp />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;