import React, { useEffect, useState } from 'react';
import s from './ChatPages.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { startMessagesListening, stopMessagesListening, sendMessage } from './../../redux/chatWebSocketReducer';
import { AppStateType } from '../../redux/redux-store';


type ChatMessagesType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}


const Chat: React.FC = () => {
    let dispatch = useDispatch()
    useEffect(() => {

        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div className={s.chatPage}>
            <h3>Chat online</h3>
            <Messages />
            <FormMessageBlock />
        </div>)
}




const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    let messageElement = messages.map((m, index) => <Message key={index} message={m} />)
    return (
        <div style={{ height: '500px', overflowY: 'auto' }}>
            {messageElement}
        </div>
    )

}

const Message: React.FC<{ message: ChatMessagesType }> = ({ message }) => {
    return (
        <div>
            <div className={s.imgUser}><img src={message.photo}></img></div>
            <div>{message.userName}</div>
            <div>{message.message}</div>
        </div>)

}

const FormMessageBlock: React.FC = () => {
    const [message, setMessages] = useState('')
    const [readyStatus, setReadyStatys] = useState<'pending' | 'ready'>('pending')

    let dispatch = useDispatch()

    const sendMessages = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessages('')
    }

    return (
        <div>
            <div><textarea value={message} onChange={(e) => setMessages(e.currentTarget.value)} /></div>
            <div><button disabled={false} onClick={sendMessages}>Send</button></div>
        </div>
    )
}



export default ChatPage