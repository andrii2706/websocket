const WebSocket = require('ws');
const { log } = require('node:util');

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', socket => {
	console.log('Session started');

	socket.on('message', message => {
		if (Buffer.isBuffer(message)) {
			message = message.toString('utf8');
		}

		let response = '';
		const lowerMessage = message.toLowerCase(); 

		try {
			if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
				response = 'Hello, How can I help you?';
			} else if (lowerMessage.includes('how are you?') || lowerMessage.includes('how are you')) {
				response = 'I am doing alright, thanks for asking';
			} else if (lowerMessage.includes('what is your name') || lowerMessage.includes('what is your name?')) {
				response = 'I am your friendly assistant bot! You can call me Bot.';
			} else if (lowerMessage.includes('what you think about this game')) {
				response = `It depends what you like. But if you want to find more info about this game ${message}. Please click on the "Game Details" button and you'll see a lot about the game.`;
			} else if (lowerMessage.includes('can you help me?')) {
				response = 'If you have a question related to the application, I will answer it! Write me a question.';
			} else if (lowerMessage.includes('how I can save game into my profile') || lowerMessage.includes('how I can add game into my profile') || lowerMessage.includes('how I can add game into my wishList')) {
				response = 'To add your game to your profile, you need to click the "Push to WishList" button, and your game will be there.';
			} else if (lowerMessage.includes('good bye') || lowerMessage.includes('bye')) {
				response = 'Have a nice day!';
			} else {
				response = `Sorry, I don't have answers for your question. Please send another question.`;
			}

			socket.send(JSON.stringify({ response }));
		} catch (error) {
			console.error(error);
		}
	});

	socket.on('close', () => {
		console.log('Session stopped');
	});
});

console.log('WebSocket сервер запущено на порту 8080');
