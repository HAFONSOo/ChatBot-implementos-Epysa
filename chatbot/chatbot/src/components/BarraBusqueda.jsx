import React from 'react'
import { FaSearch } from "react-icons/fa";
export default function BarraBusqueda() {
  return (
    <form className='w-[500px] relative'>
        <div className='relative'>
            <input type="search" placeholder="Que Buscas?" id="" className='w-full p-4
             rounded-full bg-white'/>
             <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full'>
                <FaSearch  className='colores-epysa'/>
             </button>
        </div>
    </form>
  )
}
