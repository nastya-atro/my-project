import { getLogin } from './authReducer';

let INITIALISED_SUCCESS = 'INITIALISED_SUCCESS'

let initialState = {
    isInitialised: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALISED_SUCCESS:
            return {
                ...state,
                isInitialised: true
            }

        default:
            return state;
    }
}



export const initializedSuccess = () => ({
    type: INITIALISED_SUCCESS
})

export const initializeApp = () => (dispatch) => {
        let promise = dispatch(getLogin());
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess())
        })

    }



export default appReducer;