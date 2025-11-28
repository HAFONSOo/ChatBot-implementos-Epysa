import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

/**
 * SearchBar: Componente de barra de búsqueda que maneja la consulta y el envío.
 */
export default function SearchBar() {
  const [query, setQuery] = useState('');

  /**
   * handleSearch: Previene el envío por defecto y procesa la consulta (aquí se
   * loggea en consola; se podría conectar a rutas o filtros reales).
   */
  const handleSearch = (e) => {
    e.preventDefault(); 
    if (!query.trim()) return; 
    console.log('Buscando:', query);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      // AQUÍ ESTÁ EL CAMBIO CLAVE:
      // w-full en móvil (ocupa todo el ancho disponible)
      // md:w-[500px] en PC (fuerza el ancho fijo original)
      className='w-full md:w-[500px] px-2 md:px-0'
      role="search" 
    >
  
      <label htmlFor="search-input" className="sr-only">
        ¿Qué buscas?
      </label>
      
      <div className='relative'>
        <input 
          type="search" 
          id="search-input" 
          name="search" 
          placeholder="¿Qué buscas?" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full p-3 pr-10 rounded-full bg-white text-gray-800 border-2 border-transparent 
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300
                     transition-all duration-300 ease-in-out' 
        />
        <button 
          type="submit"
          aria-label="Buscar" 
          className='absolute right-2 top-1/2 -translate-y-1/2 p-3 colores-epysa rounded-full
                     text-white hover:bg-slate-700 focus:outline-none focus:ring-2 
                     focus:ring-slate-500 transition-colors duration-300'
        >
          <FaSearch size={10}/>
        </button>
      </div>
    </form>
  );
}