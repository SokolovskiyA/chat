import React from 'react'
import './ChatMessage.scss'
import { useContext } from 'react'
import ChatContext from '../../Context/ChatContext'


function ChatMessage({message, index}) {
    const {chatName} = useContext(ChatContext)

    return (
    <div className={chatName === message.sender ? 'myMessage'  : 'message'}  key={index}>
        <div className='message__name'>{message.sender}:</div>
        <div className='Message__text'>{message.text}</div>
    </div>
    )
}

export default ChatMessage