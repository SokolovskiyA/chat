import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogInForm.scss';
import ChatContext from '../../Context/ChatContext';
    

const LogInForm = () => {
    const {chatName, setChatName} = useContext(ChatContext)
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setChatName(e.target.value);
    };

    const handleFormSubmit = (e) => {
        if (chatName.trim() === '') {
            alert('Please enter a valid name')
        } else {
            e.preventDefault()

            navigate('/chat')
        }
    };

    return (
    <form className='form' onSubmit={handleFormSubmit}>
        <label htmlFor="chatName">Your Chat Name:</label>
        <input className='form__input'
            type="text"
            id="chatName"
            value={chatName}
            onChange={handleInputChange}
        />
        <button className='form__button' type="submit">Enter Chat</button>
    </form>
    );
};

export default LogInForm;
