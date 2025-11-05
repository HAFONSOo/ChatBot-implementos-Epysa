import liquidacionImg from "../assets/liquidacion.jpg";
import nuevosProductosImg from "../assets/nuevosproductos.jpg";
import cotizaImg from "../assets/cotiza.jpg";
import nuestrasTiendasImg from "../assets/nuestrastiendas.jpg";
import ventaTelefonicaImg from "../assets/ventatelefonica.jpg";

import lubricantesImg from "../assets/lubricantes.webp";
import seguridadImg from "../assets/seguridad.jpg";
import bateriasImg from "../assets/baterias.jpg";

export default function SeccionInferior() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white py-6">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center">

        {/*  Fila 1 */}
        <div className="flex flex-wrap justify-center items-center gap-1 w-full mb-1">
          {[liquidacionImg, nuevosProductosImg, cotizaImg].map((imgSrc, i) => (
            <a
              key={i}
              href="#"
              className="relative w-[32.8%] bg-white flex justify-center items-center overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={imgSrc}
                alt={`Banner ${i + 1}`}
                className="w-full h-auto object-contain border-none shadow-none"
              />
            </a>
          ))}
        </div>

        {/* Fila 2 */}
        <div className="flex flex-wrap justify-center items-center gap-1 w-full mb-4">
          {[nuestrasTiendasImg, ventaTelefonicaImg].map((imgSrc, i) => (
            <a
              key={i}
              href="#"
              className="relative w-[49.5%] bg-white flex justify-center items-center overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={imgSrc}
                alt={`Banner grande ${i + 1}`}
                className="w-full h-auto object-contain border-none shadow-none"
              />
            </a>
          ))}
        </div>

        {/* Fila 3 */}
        <div className="flex flex-wrap justify-center items-center gap-1 w-full">
          {[lubricantesImg, seguridadImg, bateriasImg].map((imgSrc, i) => (
            <a
              key={i}
              href="#"
              className="relative w-[32.8%] bg-white flex justify-center items-center overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={imgSrc}
                alt={`Categoría ${i + 1}`}
                className="w-full h-auto object-contain border-none shadow-none"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  

);
}
