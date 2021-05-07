import { profileApi, usersApi } from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DEL_POST='profile/DEL_POST'
const PUT_PHOTO='profile/PUT_PHOTO'

let initialState = {
    posts: [
        { id: 1, message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat.', likesNumber: '22' },
       
        { id: 2, message: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ', likesNumber: '18' },
        { id: 3, message: 'Nothing, everything, anything, something: if you have nothing, then you have everything, because you have the freedom to do anything, without the fear of losing something.', likesNumber: '18' },
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
        case PUT_PHOTO:
            return {
                ...state,
                profile:{...state.profile, photos: action.photos}
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

export const putPhotoSuccess=(photos)=>({
    type: PUT_PHOTO, photos
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

export const putPhotos = (photos) => {
    return async (dispatch) => {
        let response=await profileApi.putPhotos(photos)
             {
                if (response.data.resultCode === 0) {
                    dispatch(putPhotoSuccess(response.data.data.photos))
                }
            }
    }
}

export const changeProfile = (profile) => {
    debugger
    return async (dispatch, getState) => {
        const userId=getState().auth.id
        const response=await profileApi.changeProfile(profile)
             {
                if (response.data.resultCode === 0) {
                    dispatch(getProfile(userId))
                }
            }
    }
}


export default profileReducer;

