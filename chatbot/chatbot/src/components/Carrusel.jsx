import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
// Define el componente
function Carrusel() {
  
  // 1. Array de Slides
  const slides = [
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760966402159.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760733740043.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760537057353.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760640004057.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760536532610.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760536885217.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760536110884.jpg' },
  ];

  // 2. Estado
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Efecto para el carrusel automático
  useEffect(() => {
    const timer = setInterval(() => {
      // Usa la forma de callback para evitar dependencias
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000); // 10 segundos

    return () => clearInterval(timer);
  }, [slides.length]); // Depende solo de slides.length

  // 4. Funciones de navegación
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // 5. Función para los puntos
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // 6. JSX
  return (
    // Contenedor principal
    <div className="w-full">
      {/* Contenedor de la imagen: 'relative' para que los botones se posicionen sobre él */}
      <div className="relative w-full h-[500px] ">
        
        {/* Contenedor de la imagen (un solo div) */}
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full bg-center bg-cover duration-500"
        >
      </div>

      {/* Botones de flechas (deben ser hijos directos del 'relative') */}
      {/* Botón Izquierdo */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 focus:outline-none text-1xl cursor-pointer"
      >
        <IoIosArrowBack/>
      </button>

      {/* Botón derecho */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 focus:outline-none text-1xl cursor-pointer"
      >
       <IoIosArrowForward/>
      </button>

      </div>

      {/* Puntos de navegación (FUERA del div 'relative') */}
      <div className='w-full flex justify-center py-2'>
        {slides.map(( slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer  '
          >
            {/* Puntos creados con divs */}
            {currentIndex === slideIndex ? (
              <div className='w-2 h-2 rounded-full colores-epysa mx-1 hover:bg-gray-600'></div>
            ) : (
              <div className='w-2 h-2 rounded-full bg-blue-600 mx-1 hover:bg-gray-600'></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Exporta el componente
export default Carrusel;
