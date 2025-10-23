import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { FiX, FiSend } from 'react-icons/fi';
import { TbMessageChatbotFilled } from "react-icons/tb";


// --- LÓGICA DE COMUNICACIÓN (SIN CAMBIOS) ---
async function sendMessageToN8n(message, sessionId) {
  const webhookUrl = 'http://localhost:5678/webhook/80a5663d-7186-4f19-8b15-316f7aac4965';
  const data = { text: message, sessionId: sessionId };
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result.output;
  } catch (error) {
    console.error('Error al contactar el webhook:', error);
    return "Lo siento, no pude conectarme. Inténtalo de nuevo.";
  }
}

// --- COMPONENTE DEL CHATBOT ---
export default function Frontchatbot({ iconClosed }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSessionId(nanoid());
    setMessages([{
      sender: 'bot',
      text: '¡Hola! Soy Epybot. ¿Cómo puedo ayudarte?'
    }]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    const botResponseText = await sendMessageToN8n(currentInput, sessionId);
    setIsLoading(false);
    if (botResponseText) {
      const botMessage = { sender: 'bot', text: botResponseText };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end font-sans ">
      
      {/* Ventana del Chat (se muestra u oculta) */}
      <div
        className={`
          w-80 sm:w-96 h-[500px] max-h-[70vh] mb-4 bg-white rounded-2xl shadow-2xl
          flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? ' translate-x-0' : 'hidden translate-x-1000 pointer-events-none'}
        `}
      >
        {/* Encabezado del Chat */}
        <div className="p-4 colores-epysa text-white rounded-t-2xl flex items-center justify-between shadow-md">
           <TbMessageChatbotFilled className='w-8 h-8'/>
          <div className="flex items-center">

          
            <div>
              <p className="text-lg font-semibold">Epybot</p>
              <p className="text-xs text-gray-300">Asistente de Implementos EPYSA</p>
            </div>
          </div>
          <button onClick={toggleChat} className="p-1 -mr-0 rounded-full hover:bg-white/20 ">
            <FiX size={24} />
          </button>
        </div>

        {/* Área de Mensajes */}
        <div className="flex-1 p-2 sm:p-6 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 bg-gray-200 rounded-2xl shadow rounded-bl-none">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-0"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-200"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-400"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Área de Entrada de Texto */}
        <form onSubmit={handleFormSubmit} className="p-3 border-t bg-gray-50 rounded-b-2xl">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje aquí..."
              className="flex-1 w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 disabled:bg-gray-400"
              disabled={!input.trim() || isLoading}
            >
              <FiSend className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
        
      {/* Botón Flotante principal para abrir/cerrar */}
      <button
        
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-slate-700 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-transform transform hover:scale-110"
        aria-label="Toggle Chatbot"
      >
        {/* Lógica para mostrar el ícono de cerrado */}
        <div className={`transition-opacity duration-300 absolute ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
          {!isOpen && iconClosed}
          < TbMessageChatbotFilled className='w-8 h-8'/>
        </div>
        
        {/* Lógica para mostrar la 'X' de abierto */}
        <div className={`transition-opacity duration-300 absolute ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {isOpen && <FiX size={32} />}
        </div>
      </button>
    </div>
  );
}
