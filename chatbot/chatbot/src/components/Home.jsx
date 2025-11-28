import React from 'react'
import Carrusel from './Carrusel.jsx'
import SeccionInferior from './SeccionInferior.jsx'
import Body from './Body.jsx'
import Footer from './Footer.jsx'

/**
 * Home: Página principal que compone la app con Carrusel, Sección inferior,
 * Body y Footer. Actúa como contenedor de las secciones principales.
 */
export default function Home() {
  return (
    <>
      <Carrusel/>
      <SeccionInferior/>
      <Body/>
      <Footer/>
    </>
  )
}