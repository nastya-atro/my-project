const SEND_MESSAGE_BODY = 'SEND-MESSAGE-BODY'

let initialState = {
    dialogs: [
        { name: 'Nastya', id: '1' },
        { name: 'Maksim', id: '2' },
        { name: 'Sacha', id: '3' },
        { name: 'Alina', id: '4' },
        { name: 'Zenia', id: '5' },
        { name: 'Veronika', id: '6' }
    ],

    messages: [
        { id: 1, message: 'Hello, how are you?' },
        { id: 2, message: 'Hi, i am fine!' },
        { id: 3, message: 'What is you name?' },
        { id: 4, message: 'My name is Nastya. What is your name?' },
        { id: 5, message: 'My name is Maksim.' }

    ]
}

const dialogReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE_BODY:
            let body = action.newMessage;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            }

        default:
            return state;
    }
}


export const sendMessageBodyActionCreator = (newMessage) => ({
    type: SEND_MESSAGE_BODY, newMessage
})

export default dialogReducer;