import { trenirovkaApi } from "../api/api"

let GET_AUTH_DATA = 'GET_AUTH_DATA'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}


const HeaderTrReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH_DATA:
            return {
                ...state,
                ...action.data
            }



        default:
            return state
    }

}

export const getAuthData = (id, email, login, isAuth) => ({
    type: GET_AUTH_DATA, data: { id, email, login, isAuth }
})

export const getAuthDataThunk = () => {
    return (dispatch) => {
        trenirovkaApi.getAuth()
            .then(response => {
                dispatch(getAuthData(response.data.data.id, response.data.data.email, response.data.data.login, true))
            })
    }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        trenirovkaApi.login(email, password, rememberMe)
            .then(response => {
                if (response.resultCode === 0)
                    dispatch(getAuthDataThunk())
            })
    }
}

export const logout= () => {
    return (dispatch) => {
        trenirovkaApi.logout()
            .then(response => {
                if (response.resultCode === 0)
                    dispatch(getAuthData(
                        null, null, null, false
                    ))
            })
    }
}

export default HeaderTrReducer