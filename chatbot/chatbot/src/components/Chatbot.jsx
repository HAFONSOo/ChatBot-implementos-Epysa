import { createChat } from '@n8n/chat';
import { useEffect } from 'react';
function Chatbot() {
	useEffect(() => {
		createChat({
			webhookUrl: 'http://localhost:5678/webhook/a5a10de9-f789-469f-b07e-fea9c36435dd/chat',
			webhookConfig: {
				method: 'POST',
				headers: {}
			},
			target: '#n8n-chat',
			mode: 'window',
			chatInputKey: 'chatInput',
			chatSessionKey: 'sessionId',
			loadPreviousSession: true,
			metadata: {},
			showWelcomeScreen: false,
			defaultLanguage: 'en',
			initialMessages: [
				'hola'],
			i18n: {
				en: {
					title: 'Hi there! 👋',
					subtitle: "Start a chat. We're here to help you 24/7.",
					footer: '',
					getStarted: 'New Conversation',
					inputPlaceholder: 'Type your question..',
				},
			},
			enableStreaming: false,
		});
		},[]);
return (<div></div>);
}

export default Chatbot;