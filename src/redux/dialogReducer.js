import UserImg from './../assets/images/user.png'
const SEND_MESSAGE_BODY = 'SEND-MESSAGE-BODY'


let initialState = {
    dialogs: [
        { name: 'Nastya', id: '1', photo: UserImg},
        { name: 'Maksim', id: '2',  photo: UserImg },
        { name: 'Sacha', id: '3', photo:UserImg },
        { name: 'Alina', id: '4', photo: UserImg },
        { name: 'Zenia', id: '5', photo: UserImg },
        { name: 'Veronika', id: '6', photo: UserImg }
    ],

    messages: [
        { id: 1, message: 'Hello, how are you?', name:'Nastya Atroshanka', time:'01.09.2021', photo: UserImg },
        { id: 2, message: 'Hi, i am fine!', name:'Nastya Atroshanka', time:'01.09.2021',photo: UserImg },
        { id: 3, message: 'What is you name?', name:'Nastya Atroshanka', time:'01.09.2021',photo: UserImg },
        { id: 4, message: 'My name is Nastya. What is your name?', name:'Nastya Atroshanka', time:'01.09.2021',photo: UserImg },
        { id: 5, message: 'My name is Maksim.', name:'Nastya Atroshanka', time:'01.09.2021',photo: UserImg }

    ]
}

const dialogReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE_BODY:
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


export const sendMessageBodyActionCreator = (newMessage) => ({
    type: SEND_MESSAGE_BODY, newMessage
})

export default dialogReducer;