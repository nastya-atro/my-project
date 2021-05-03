import { authApi } from "../api/api";

let SET_USER_DATA = 'SET_USER_DATA'
//let STOP_SUBMIT = 'STOP_SUBMIT'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
   // error: "i"
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

      //  case STOP_SUBMIT:
            return {
                ...state,
                error: state.action.error
            }

        default:
            return state;
    }
}





export const setUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth }
})

//export const stopSubmit = (error) => ({
//    type: STOP_SUBMIT, error
//})


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

export const login = (email, password, rememberMe) => (dispatch)=> {
    
    authApi.login(email, password, rememberMe)
    
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getLogin())
            } else{
              //  let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error"
            //dispatch(stopSubmit(response.data.messages[0]))
            }
        })
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