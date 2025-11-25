import { useState } from "react";
import { Link } from "react-router-dom";
import { IoPersonSharp, IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { TbFilterSearch, TbTruckDelivery } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";
import BarraBusqueda from "./BarraBusqueda";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { cartItems, toggleCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const totalItems = cartItems.reduce((total, item) => total + (Number(item.cantidad) || 0), 0); 

  return (
   <header className="text-white nvr-implementos relative z-50">
        {/* Usamos flex-col en móvil, pero en MD recuperamos el flex-row y el justify-around ORIGINAL */}
        <nav className="flex flex-col md:flex-row md:justify-around md:items-center p-2 md:p-0">
            
            {/* Cabecera Móvil: Logo + Botón Hamburguesa */}
            <div className="flex justify-between items-center w-full md:w-auto">
                <a href="/">
                    <img src="https://www.implementos.cl/assets/images/logos/logo_header.svg" className="w-40 md:w-60" />
                </a>
                
                {/* Botón menú solo visible en móvil */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="md:hidden text-3xl focus:outline-none"
                >
                    {isMenuOpen ? <IoClose /> : <IoMenu />}
                </button>
            </div>

            {/* Barra de búsqueda: width full en móvil, margen en móvil. En PC se comporta normal */}
            <div className={`w-full md:w-auto mt-2 md:mt-0 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
                 <BarraBusqueda/>
            </div>
            
            {/* Menú de Iconos */}
            {/* En móvil: flex-col y space-y. 
                En PC: flex-row y space-x (RECUPERANDO TU ESTILO ORIGINAL) */}
            <ul className={`
                flex flex-col md:flex-row 
                space-y-4 md:space-y-0 md:space-x-4 
                items-center 
                w-full md:w-auto 
                mt-4 md:mt-0
                transition-all duration-300
                ${isMenuOpen ? 'flex' : 'hidden md:flex'} 
            `}>
                
                <li className="p-2 md:p-3 hover:opacity-75"><Link to="/" className="flex-col flex items-center"><TbFilterSearch size='30' /><div className="font-semibold text-sm md:text-base">Buscador de Filtros</div></Link></li>
                <li className="p-2 md:p-3 hover:opacity-75"><Link to="/" className="hover:text-gray-400 flex-col flex items-center"><TbTruckDelivery size='30' /><div className="text-sm md:text-base">San Bernardo</div></Link></li>
                <li className="p-2 md:p-3 hover:opacity-75"><Link to="/" className="hover:text-gray-400 flex-col flex items-center "><FaMapMarkedAlt size='30' /><div className="text-sm md:text-base">Seguimiento de pedido</div></Link></li>
                <li className="p-2 md:p-3 hover:opacity-75"><Link to="/" className="hover:text-gray-400 flex-col flex items-center"><IoPersonSharp size='30' /><div className="text-sm md:text-base">Mi cuenta</div></Link></li>
                
                {/* Carrito */}
                <li 
                  className="p-2 md:p-3 hover:opacity-75 cursor-pointer" 
                  onClick={toggleCart} 
                >
                  <div className="hover:text-gray-400 flex-col flex items-center relative">
                    <IoCartOutline size='30' />
                    <div className="text-sm md:text-base">Mi carro</div>
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </li>

            </ul>
        </nav>
   </header>
  )
}