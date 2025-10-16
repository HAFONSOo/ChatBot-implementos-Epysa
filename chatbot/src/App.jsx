
// App.jsx
import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import './index.css';

export const App = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'http://localhost:5678/webhook-test/7dab3386-5829-4004-a3cb-3268a2e98174', // Asegúrate que este sea tu Webhook URL
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: true, // Mostrar la pantalla de bienvenida para la autenticación
      defaultLanguage: 'es',
      initialMessages: [
        '¡Hola! Para comenzar, por favor ingresa tu RUT (ej: 12345678-9).',
      ],
      i18n: {
        es: {
          title: 'Epybot',
          subtitle: 'Tu asistente virtual de Implementos Epysa',
          footer: 'Powered by Implementos Epysa',
          getStarted: 'Comenzar',
          inputPlaceholder: 'Escribe tu consulta aquí...' // Un pequeño ajuste para más claridad
  },
        en: { // Se mantiene la configuración en inglés como fallback
          title: 'Chatbot implementos',
          subtitle: "Please identify yourself to continue.",
          footer: '',
          getStarted: 'Get Started',
          inputPlaceholder: 'Enter your RUT...',
        },
      },
      enableStreaming: false,
    });
  }, []);

  return (<div></div>);
};
export default App;