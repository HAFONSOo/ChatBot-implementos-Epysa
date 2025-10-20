import React from 'react'
import Frontchatbot from './Receptor.jsx'
import { FaRobot } from 'react-icons/fa';

// Componente para el ícono
const EpybotIcon = () => <FaRobot size={32} />;


 function Home() {
  return (
    <div>
      <Frontchatbot iconClosed={<EpybotIcon />} />
      <Frontchatbot/>
      </div>
  )
}
export default Home