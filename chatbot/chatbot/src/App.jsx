// App.tsx
import { useEffect } from 'react';

import { createChat } from '@n8n/chat';
import './index.css'
export const App = () => {
	useEffect(() => {
		createChat({
			webhookUrl: 'http://localhost:5678/webhook/b2c85a9d-be34-4bde-b18d-c7cd95d66558/chat',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Escribe para hablar con el Chatbot',
        
      ],
      i18n: {
        en: {
          title: 'Chatbot implementos',
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
        },
      },
      enableStreaming: false,

		});
	}, []);

	return (<div></div>);
};
export default App
