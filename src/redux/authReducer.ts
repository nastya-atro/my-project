import { ResultCodeEnum, ResultCodeEnumWithCaptcha } from "../api/api";
import { CommonActionsTypes, CommonThunkType } from "./redux-store";
import { authApi } from '../api/authApi';
import { captchaApi } from "../api/captchaApi";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null
}
type InitialStateType = typeof initialState

const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "auth/SET_USER_DATA":
        case "auth/GET_CAPTCHA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

const actions = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SET_USER_DATA',
        payload: { id, email, login, isAuth }} as const),
    getCaptchaSuccess: (captcha: string) => ({
        type: 'auth/GET_CAPTCHA',
        payload: { captcha }} as const)
}

type ActionsTypes=CommonActionsTypes<typeof actions>
type ThunkType=CommonThunkType<ActionsTypes>


export const getLogin = (): ThunkType => {
    return async (dispatch) => {
        let data = await authApi.getLogin()
        if (data.resultCode === ResultCodeEnum.Success) {
            let { id, email, login } = data.data;
            dispatch(actions.setUserData(id, email, login, true))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    
    return async (dispatch) => {

        let data = await authApi.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(getLogin())
        } else if (data.resultCode === ResultCodeEnumWithCaptcha.CaptchaIsRequired) {
            dispatch(getCaptcha())
        }
    }
}

export const getCaptcha = (): ThunkType => async (dispatch) => {
    const data = await captchaApi.getCaptcha()
    const urlCaptcha = data.url
    dispatch(actions.getCaptchaSuccess(urlCaptcha))
}

export const logout = (): ThunkType => {
    debugger
    return async (dispatch) => {
        
        let data = await authApi.logout()
        
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setUserData(null, null, null, false))
        }
    } 
}


export default authReducer;