import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  // 1. Estado para controlar el valor del input
  const [query, setQuery] = useState('');

  // 2. Función para manejar el envío del formulario
  const handleSearch = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!query.trim()) return; // No hacer nada si la búsqueda está vacía
    console.log('Buscando:', query);
    // Aquí iría la lógica para ejecutar la búsqueda (ej: llamar a una API)
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className='w-120 '
      role="search" // 3. Rol de accesibilidad
    >
  
      <label htmlFor="search-input" className="sr-only">
        ¿Qué buscas?
      </label>
      
      <div className='relative'>
        <input 
          type="search" 
          id="search-input" // Conecta el input con el label
          name="search" // Nombre para el campo del formulario
          placeholder="¿Qué buscas?" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full p-3 pr-10 rounded-full bg-white text-gray-800 border-2 border-transparent 
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300
                     transition-all duration-300 ease-in-out' // 5. Estilos mejorados
        />
        <button 
          type="submit"
          aria-label="Buscar" // 6. Aria-label para el botón de icono
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