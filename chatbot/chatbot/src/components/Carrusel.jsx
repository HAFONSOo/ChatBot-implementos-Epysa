import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Carrusel() {
  const slides = [
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760966402159.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760733740043.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760537057353.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760640004057.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760536532610.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760536885217.jpg' },
    { url: 'https://images.implementos.cl/uploads/cms/slides/1760536110884.jpg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full group"> {/* group para hover effects si quieres */}
      {/* Altura responsiva: h-48 (móvil), md:h-80 (tablet), lg:h-[500px] (desktop) */}
      <div className="relative w-full h-48 sm:h-80 lg:h-[500px]">
        
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full bg-center bg-cover duration-500"
        ></div>

        {/* Botones */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-2 md:left-5 transform -translate-y-1/2 text-white p-1 md:p-2 rounded-full bg-black/30 hover:bg-black/50 focus:outline-none cursor-pointer"
        >
          <IoIosArrowBack size={24}/>
        </button>

        <button
          onClick={goToNext}
          className="absolute top-1/2 right-2 md:right-5 transform -translate-y-1/2 text-white p-1 md:p-2 rounded-full bg-black/30 hover:bg-black/50 focus:outline-none cursor-pointer"
        >
         <IoIosArrowForward size={24}/>
        </button>
      </div>

      <div className='w-full flex justify-center py-2 gap-2'>
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === slideIndex ? 'bg-orange-500 w-4' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;