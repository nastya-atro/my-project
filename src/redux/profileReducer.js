import { profileApi, usersApi } from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DEL_POST='profile/DEL_POST'

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesNumber: '22' },
        { id: 2, message: 'I am fine!', likesNumber: '18' },
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesNumber: 0
            }

            return {
                ...state,
                posts: [...state.posts, newPost]
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        
        case DEL_POST:
            return {
                ...state,
                posts: state.posts.filter(p=>p.id !==action.id)
            }

        default:
            return state;


    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })

export const deletePostActionCreator=(id)=>({
    type: DEL_POST, id
})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE, profile
})

export const setStatus = (status) => ({
    type: SET_STATUS, status
})

export const getProfile = (userId) => {
    return async(dispatch) => {

        let response=await usersApi.getProfile(userId)
            { dispatch(setUserProfile(response.data)) }
    }
}

export const getStatus = (userId) => {
    return async(dispatch) => {
        let response=await profileApi.getStatus(userId)
             { dispatch(setStatus(response.data)) }
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        let response=await profileApi.updateStatus(status)
             {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            }
    }
}

export default profileReducer;

