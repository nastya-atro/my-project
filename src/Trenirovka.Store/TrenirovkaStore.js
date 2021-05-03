import commentReducer from "./comment-reducer"
import messageReducer from "./message-reducer"
import postReducer from "./post-reducer"


let storeT = {
    _storeTrenirovka: {
        messagePage: {
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
        },

        postPage: {
            posts: [
                { name: "Nastya", avatar: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg", post: "Today is Monday", likesCount: "22" },
                { name: "Nastya", avatar: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg", post: "Today is Friday", likesCount: "133" },
                { name: "Nastya", avatar: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg", post: "Today is Saturday", likesCount: "21" },
                { name: "Nastya", avatar: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg", post: "Today is ...", likesCount: "1" }
            ],
            newPostText: "post"
        },
        commentPage: {
            comment: [
                { id: "Nastya", comment: "Beautiful!" },
                { id: "Zenia", comment: "So preeeeeeeeeeeeeeeeetty!" },
                { id: "Veronika", comment: "I love you!" },
                { id: "Evgeni", comment: "woooooooooowwwww!" },

            ],
            newCommentText: "comment"
        }


    },
    getStoreTrenirovka() {
        return this._storeTrenirovka
    },

    _rerenderEntireThree() {
        console.log('State changed')

    },
    subscribe(observer) {
        this._rerenderEntireThree = observer
    },

    dispatch(action) {
        messageReducer(this._storeTrenirovka.messagePage, action)
        commentReducer(this._storeTrenirovka.commentPage, action)
        postReducer(this._storeTrenirovka.postPage, action)
        this._rerenderEntireThree(this._storeTrenirovka)
    }
}




export default storeT