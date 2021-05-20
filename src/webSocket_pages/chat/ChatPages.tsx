import React, { useEffect, useRef, useState } from 'react';
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
    const messagesAncorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setAutoScroll] = useState(true)


    let messageElement = messages.map((m, index) => <Message key={index} message={m} />)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {

        if (isAutoScroll) {
            messagesAncorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }

    }, [messages])



    return (
        <div style={{ height: '500px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messageElement}
            <div ref={messagesAncorRef}></div>
        </div>
    )

}

const Message: React.FC<{ message: ChatMessagesType }> = React.memo(({ message }) => {
    return (
        <div>
            <div className={s.imgUser}><img src={message.photo}></img></div>
            <div>{message.userName}</div>
            <div>{message.message}</div>
        </div>)

})

const FormMessageBlock: React.FC = () => {
    const [message, setMessages] = useState('')
    const status = useSelector((state: AppStateType) => state.chat.status)

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
            <div><button disabled={status !== 'ready'} onClick={sendMessages}>Send</button></div>
        </div>
    )
}



export default ChatPage