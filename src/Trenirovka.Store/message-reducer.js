const ADD_MESSAGE = 'ADD_MESSAGE'


let initialState={
    dialog: [
        { name: "Nastya", userId: "1" },
        { name: "Maksim", userId: "2" },
        { name: "Lida", userId: "3" },
        { name: "Igor", userId: "4" },
        { name: "Vasilisa", userId: "5" },
    ],

    messages: [
        { message: "HI", id: "1" },
        { message: "Yooooooooo :)", id: "2" },
        { message: "Nihao...", id: "3" },
        { message: "I am fine!!!!!!!!!", id: "4" },
        { message: "Kukuuuuuuu", id: "5" },
    ],
    newMessageText: "message"
}

const messageReducer=(state=initialState, action)=>{
    switch (action.type) {
        case ADD_MESSAGE:

            return{
                ...state,
                messages:[...state.messages, {
                    id: 6,
                    message: action.newMessage
                }]
            }
            
    
            
        default:
             return state
       
    }

}

export const addMessageActionCreator = (newMessage) => ({
    type: ADD_MESSAGE, newMessage
})


export default messageReducer