import './App.css';
import { useState, useEffect } from 'react';

import io from 'socket.io-client';
import { nanoid } from 'nanoid';
const userName = nanoid(4);
const socket = io.connect('http://localhost:5000');
function App() {
	const [message, setmessage] = useState('');
	const [chat, setchat] = useState([]);
	const sendMessage = (e) => {
		e.preventDefault();
		socket.emit('chat', { message, userName });
		setmessage('');
	};

	useEffect(() => {
		socket.on('chat', (payload) => {
			setchat([...chat, payload]);
		});
	});
	return (
		<div className="App">
			<header className="App-header">
				<h1>FabDiary App</h1>
				{chat.map((payload, index) => {
					return (
						<p key={index}>
							{payload.message} <span> id: {payload.userName}</span>
						</p>
					);
				})}
				<form onSubmit={sendMessage}>
					<input
						type="text"
						name="chat"
						placeholder="Type Message"
						value={message}
						onChange={(e) => {
							setmessage(e.target.value);
						}}
						required
					/>
					<button type="submit">Send</button>
				</form>
			</header>
		</div>
	);
}

export default App;
