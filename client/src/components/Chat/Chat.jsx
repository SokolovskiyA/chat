import React, { useState, useEffect} from 'react';
import './Chat.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ChatContext from '../../Context/ChatContext';
import io from 'socket.io-client';


const Chat = () => {
    const navigate = useNavigate();
    const {chatName, setChatName} = useContext(ChatContext)
    const [chatHistory, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
    // Connect to the Socket.io server
    const newSocket = io('http://localhost:3000'); // Replace with your server URL

    // Set up event listeners
    newSocket.on('connect', () => {
        console.log('Connected to the server');
    });

    newSocket.on('message', (message) => {
        setMessages((messages) => [...messages, message]);
        
    });

    newSocket.on('disconnect', () => {
        console.log('Disconnected from the server');
    });

    setSocket(newSocket);

    // Cleanup socket connection when the component unmounts
    return () => {
        newSocket.disconnect();
    };
}, []);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    }
    

    const sendMessage = () => {
    if (socket) {
        socket.emit('message', message);
        setMessage('');
    }
    };

    const handleLeave = () => {
        socket.emit('leave', chatName)
        setChatName('')
        navigate('/')
    }


    return (
        <div className='chat'>
            <div className='chat__window'>
                <div className='chat__header'>In chat as: {chatName}!</div>
                {chatHistory.map((msg, index) => (
                <div key={index}>{msg}</div>
                ))}
            </div>
            <textarea placeholder='enter your message here' className='chat__input' value={message} type="text" onChange={handleInputChange}/>
            <div className='chat__buttons'>
                <button className='chat__send' onClick={sendMessage}>Send</button>
                <button className='chat__leave' onClick={handleLeave}>Leave</button>
            </div>
    </div>
    );
};

export default Chat;
