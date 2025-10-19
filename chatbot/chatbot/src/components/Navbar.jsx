import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { TbFilterSearch } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
import BarraBusqueda from "./BarraBusqueda";
export default function Navbar() {
  return (
   <header className=" p-4 text-white nvr-implementos" >
        <nav className="flex flex-col md:flex-row justify-around items-center">
            <a href="/"  ><img src="https://www.implementos.cl/assets/images/logos/logo_header.svg "className="md:w-70"  /></a>
            <BarraBusqueda/>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-0 md:space-x">
                
                <li className="p-3 hover:opacity-75"><Link  to="/" className=" flex-col flex items-center"><TbFilterSearch size='30'  /><div className="font-semibold">Buscador de Filtros</div></Link></li>
                <li className="p-3 hover:opacity-75 "><Link  to="/" className="hover:text-gray-400 flex-col flex items-center"><TbTruckDelivery size='30'  /><div>San Bernardo</div></Link></li>
                <li className="p-3 hover:opacity-75"><Link  to="/" className="hover:text-gray-400 flex-col flex items-center "><FaMapMarkedAlt size='30'  /><div>Siguimiento de pedido</div></Link></li>
                <li className="p-3 hover:opacity-75"><Link  to="/" className="hover:text-gray-400 flex-col flex items-center "><IoCartOutline   size='30'  /><div>Mi carro</div></Link></li>
                <li className="p-3 hover:opacity-75"><Link  to="/Login" className="hover:text-gray-400 flex-col flex items-center"><IoPersonSharp size='30'  /><div>Mi cuenta</div></Link></li>
            </ul>
            </nav>
   </header>
    )
}
