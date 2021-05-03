import dialogReducer from "./dialogReducer"
import profileReducer from "./profileReducer"
import sidebarReducer from "./sidebarReducer"


let store = {
    _state: {

        messagesPage: {
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

            ],
            newMessageBody: ''

        },

        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesNumber: '22' },
                { id: 2, message: 'I am fine!', likesNumber: '18' },
            ],

            newPostText: "It-kamasutra"
        },
        sidebar: {}

    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('...')
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)

        this._state.messagesPage = dialogReducer(this._state.messagesPage, action)

        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state);

    }

}





export default store;
window.store = store;


