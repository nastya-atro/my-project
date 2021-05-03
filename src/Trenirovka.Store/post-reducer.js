const ADD_POST = 'ADD_POST'
const CHANGE_POST = 'CHANGE_POST'

let initialState={
    posts: [
        { name: "Nastya", avatar: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg", post: "Today is Monday", likesCount: "22" },
        { name: "Nastya", avatar: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg", post: "Today is Friday", likesCount: "133" },
        { name: "Nastya", avatar: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg", post: "Today is Saturday", likesCount: "21" },
        { name: "Nastya", avatar: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg", post: "Today is ...", likesCount: "1" }
    ],
    newPostText: "post"
}

const postReducer=(state=initialState, action)=>{
    switch (action.type) {
       
        case ADD_POST:
            return{
                ...state,
                newPostText:'',
                posts:[...state.posts, {
                    name: "Nastya",
                    avatar:
                        "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg",
                    post: state.newPostText,
                    likesCount: "1"
                }]
            }
            
        case CHANGE_POST:
            return{
                ...state,
                newPostText:action.newPost
            }
           
        default:
            return state
    }
    
}
export const addPostActionCreator = () => ({
    type: ADD_POST
})

export const changePostActionCreator = (newPost) => ({
    type: CHANGE_POST,
    newPost: newPost
})

export default postReducer