import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// Tu función para llamar a n8n (sin cambios)
async function sendMessageToN8n(message, sessionId) {
    const webhookUrl = 'http://localhost:5678/webhook/80a5663d-7186-4f19-8b15-316f7aac4965';

    const data = {
        text: message,
        sessionId: sessionId
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log("Respuesta completa de n8n:", result);
        return result.output;

    } catch (error) {
        console.error('Error al contactar el webhook:', error);
        return "Lo siento, no pude conectarme. Inténtalo de nuevo.";
    }
}

// --- Componente de Chat con Interfaz Mejorada ---
export default function Frontchatbot() {
    // --- LÓGICA Y ESTADOS (SIN CAMBIOS) ---
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado adicional para el indicador "escribiendo..."

    useEffect(() => {
        setSessionId(nanoid());
        // Mensaje inicial del bot
        setMessages([{
            sender: 'bot',
            text: '¡Hola! Soy Epybot. ¿Cómo puedo ayudarte?'
        }]);
    }, []);

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
            handleSendMessage();
        }
    };

    // --- INTERFAZ VISUAL (JSX MEJORADO) ---
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="w-full max-w-2xl h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl">
                
                {/* Cabecera del Chat */}
                <div className="p-4 border-b bg-slate-900 text-white rounded-t-2xl flex items-center shadow-md">
                    <img src="src/assets/chatboticon.png" alt="Logo EPYSA" className="w-10 h-10 mr-4 " />
                    <div>
                        <p className="text-lg font-semibold">Epybot</p>
                        <p className="text-xs text-gray-300">Asistente de Implementos EPYSA</p>
                    </div>
                </div>

                {/* Área de Mensajes */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
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
                </div>

                {/* Área de Entrada de Texto */}
                <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
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
                            onClick={handleSendMessage}
                            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 disabled:bg-gray-400"
                            disabled={isLoading}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}