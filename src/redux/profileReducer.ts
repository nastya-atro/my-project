import { ResultCodeEnum} from "../api/api";
import { PostsType } from './../types/types'
import { ProfileType } from './../types/types'
import { PhotosType } from './../types/types'
import { CommonActionsTypes, CommonThunkType } from "./redux-store";
import { usersApi } from './../api/usersApi';
import { profileApi } from './../api/profileApi';
 
let initialState = {
    posts: [
        { id: 1, message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat.', likesNumber: 22 },

        { id: 2, message: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ', likesNumber: '18' },
        { id: 3, message: 'Nothing, everything, anything, something: if you have nothing, then you have everything, because you have the freedom to do anything, without the fear of losing something.', likesNumber: '18' },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ""
}
export type InitialStateType = typeof initialState


const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "profile/ADD-POST":
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesNumber: 0
            }

            return {
                ...state,
                posts: [...state.posts, newPost]
            }

        case "profile/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }

        case "profile/SET_STATUS":
            return {
                ...state,
                status: action.status
            }

        case "profile/DEL_POST":
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }
        case "profile/PUT_PHOTO":
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state;
    }
}

export const actions={
    addPost: (newPostText: string) => ({ type: 'profile/ADD-POST', newPostText } as const),
    deletePostActionCreator: (id: number) => ({
        type: 'profile/DEL_POST', id
    } as const),
    setUserProfile:(profile: ProfileType)=> ({
        type: 'profile/SET_USER_PROFILE', profile
    } as const),
    setStatus: (status: string) => ({
        type: 'profile/SET_STATUS', status
    } as const),
    putPhotoSuccess: (photos: PhotosType) => ({
        type: 'profile/PUT_PHOTO', photos
    } as const),
}

type ActionsTypes =CommonActionsTypes<typeof actions>
type ThunkType= CommonThunkType<ActionsTypes>

export const getProfile = (userId: number |null):ThunkType => {
    return async (dispatch) => {
        let data = await usersApi.getProfile(userId)
        dispatch(actions.setUserProfile(data))
    }
}
export const getStatus = (userId: number):ThunkType => {
    return async (dispatch) => {
        let data = await profileApi.getStatus(userId)
        dispatch(actions.setStatus(data))
    }
}
export const updateStatus = (status: string):ThunkType => {
    return async (dispatch) => {
        let data = await profileApi.updateStatus(status)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setStatus(status))
        }
    }
}
export const putPhotos = (photos: PhotosType):ThunkType => {
    return async (dispatch) => {
        let data = await profileApi.putPhotos(photos)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.putPhotoSuccess(data.data.photos))
        }
    }
}
export const changeProfile = (profile: ProfileType):ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id
        const data = await profileApi.changeProfile(profile)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(getProfile(userId))
        }
    }
}

export default profileReducer;

