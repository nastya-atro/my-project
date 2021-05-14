import { DialogsType, MessagesType } from '../types/types'
import UserImg from './../assets/images/user.png'
import { CommonActionsTypes } from './redux-store'


let initialState = { 
    dialogs: [
        { name: 'Nastya', id: 1, photo: UserImg},
        { name: 'Maksim', id: 2,  photo: UserImg },
        { name: 'Sacha', id: 3, photo:UserImg },
        { name: 'Alina', id: 4, photo: UserImg },
        { name: 'Zenia', id: 5, photo: UserImg },
        { name: 'Veronika', id: 6, photo: UserImg }
    ] as Array<DialogsType>,

    messages: [
        { id: 1, message: 'Hello, how are you?', name:'Nastya Atroshanka', time:'01.09.2021', photo: UserImg },
        { id: 2, message: 'Hi, i am fine!', name:'Nastya Atroshanka', time:'01.09.2021',photo: UserImg },
        { id: 3, message: 'What is you name?', name:'Nastya Atroshanka', time:'01.09.2021',photo: UserImg },
        { id: 4, message: 'My name is Nastya. What is your name?', name:'Nastya Atroshanka', time:'01.09.2021',photo: UserImg },
        { id: 5, message: 'My name is Maksim.', name:'Nastya Atroshanka', time:'01.09.2021',photo: UserImg }
    ] as Array<MessagesType>
}

export type InitialStateType= typeof initialState

const dialogReducer = (state:InitialStateType = initialState, action:ActionsTypes):InitialStateType => {

    switch (action.type) {
        case 'dialog/SEND-MESSAGE-BODY':
            let body = action.newMessage;
            return {
                ...state,
                messages: [...state.messages, 
                    {id: 5, message: body, 
                    name:'Nastya Atroshanka', 
                    time:'01.09.2021',
                    photo: UserImg }]
            }
        default:
            return state;
    }
}

type ActionsTypes=CommonActionsTypes<typeof actions>

export const actions={
    sendMessageBody:(newMessage:string) => ({
        type: 'dialog/SEND-MESSAGE-BODY', newMessage} as const)
}


export default dialogReducer;