import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, BrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx';
import SingUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';

import Navbar from './components/Navbar.jsx';
import Frontchatbot from './components/Receptor.jsx';


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/Navbar" element={<Navbar/>} />
        <Route path="/Login" element={<Login></Login>} />
       
        <Route path="/chat" element={<Frontchatbot/>}/>
        <Route path="/Registrarse" element={<SingUp></SingUp>} />
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

