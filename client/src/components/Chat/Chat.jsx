import React, { useState, useEffect} from 'react';
import './Chat.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ChatContext from '../../Context/ChatContext';
import io from 'socket.io-client';


const Chat = () => {
    const navigate = useNavigate();
    const {chatName} = useContext(ChatContext)
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const socket = io('http://localhost:5001');
        setSocket(socket);
        return () => {
            socket.disconnect();
        };
    }, []);

    const [message, setMessage] = useState({
        name: chatName,
        text: '',
    });

    const handleInputChange = (e) => {
        setMessage({...message, text: e.target.value})
    }

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('send_message', message); 
        console.log(message);
        setMessage({...message, text: ''});
    };

    const handleLeave = () => {
        console.log(message);  
        socket.disconnect();
        navigate('/');
    };


    return (
        <div className='chat'>
            <div className='chat__window'>
                <div className='chat__header'>In chat as: {chatName}!</div>
            </div>
            <textarea placeholder='enter your message here' className='chat__input' value={message.text} type="text" onChange={handleInputChange}/>
            <div className='chat__buttons'>
                <button className='chat__send' onClick={e => sendMessage(e)}>Send</button>
                <button className='chat__leave' onClick={handleLeave}>Leave</button>
            </div>
    </div>
    );
};

export default Chat;
