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

		try {
			let response = '';
				switch (message) {
					case message.toLowerCase().includes('hello') ||
					message.toLowerCase().includes('hi') :
						response = 'Hello, How can I help you?';
					break;
					case message.toLowerCase().includes('how are you?') :
						response = 'I am doing alright, thanks for asking';
					break;
					case message.toLowerCase().includes('what is your name') ||
					message.toLowerCase().includes('what is your name?') ||
					message.toLowerCase().includes('how are you?') ||
					message.toLowerCase().includes('how are you') :
						response = 'I am your friendly assistant bot! You can call me Bot.';
					break;
					case message.toLowerCase().includes('what you think about this game') :
						response = `It depends what you like. But if what want to find more info about this game ${message}.
				 Please click on Game Details button and you see a lot of about game `;
					break;
					case message.toLowerCase().includes('Can you help me? ') :
						response = 'If you have a question related to application ' +
							'I will give it to you! ' +
							'Write me a question which you have?';
					break;
					case message.toLowerCase().includes('how I can save game into my profile') ||
					message.toLowerCase().includes('how I can add game into my profile') ||
					message.toLowerCase().includes('how I can add game into my wishList') :
						response = 'To add your game to your profile you need to click on button Push to WishList and after that your game will be their';
					break;
					case message.toLowerCase().includes('good bye') || message.toLowerCase().includes('bye') :
						response = 'Have nice day!';
					break;
					default :
						response = `Sorry, I don't have answers on your question. Please send another question.`;
				}

			socket.send(JSON.stringify({ response }));
		} catch (error) {
			console.error(error);
		}
	});

	socket.on('close', () => {
		console.log('Session stop');
	});
});

console.log('WebSocket сервер запущено на порту 8080');
