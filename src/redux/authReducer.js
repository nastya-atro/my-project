import { authApi } from "../api/api";
import { captchaApi } from './../api/api';

let SET_USER_DATA = 'SET_USER_DATA'
let GET_CAPTCHA = 'GET_CAPTCHA'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA:
            return {
                ...state,
                ...action.payload
            }



        default:
            return state;
    }
}





export const setUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth }
})

export const getCaptchaSuccess = (captcha) => ({
    type: GET_CAPTCHA,
    payload: { captcha }
})





export const getLogin = () => {
    return (dispatch) => {
        authApi.getLogin()
            .then(response => {

                if (response.data.resultCode === 0) {
                    let { id, email, login } = response.data.data;
                    dispatch(setUserData(id, email, login, true))
                }
            });
    }
}

export const login = (email, password, rememberMe, captcha) => (dispatch) => {

    authApi.login(email, password, rememberMe, captcha)

        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getLogin())
            } else if(response.data.resultCode === 10){
                dispatch(getCaptcha())
            }
        })
}

export const getCaptcha= () => async (dispatch) => {

   const response=await captchaApi.getCaptcha()
   const urlCaptcha=response.data.url
   dispatch(getCaptchaSuccess(urlCaptcha))

      
}

export const logout = () => {
    return (dispatch) => {
        authApi.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                }
            })
    }
}


export default authReducer;