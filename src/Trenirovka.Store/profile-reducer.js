import { trenirovkaApi } from "../api/api"

let SET_PROFILE_PAGE='SET_PROFILE_PAGE'
let SET_STATUS='SET_STATUS'


let initialState={
    profile: null,
    status:''
}

const profileTrReducer =(state=initialState, action)=>{
    switch(action.type){
        case SET_PROFILE_PAGE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }    

        default:
                return state
    }
    

}


export const setProfilePage=(profile)=>({
    type: SET_PROFILE_PAGE, profile
})

export const setStatus=(status)=>({
    type: SET_STATUS, status
})

export const getProfilePageThunk=(userId)=>{
    return (dispatch)=>{
        
        trenirovkaApi.getProfilePage(userId)
        .then(response=>{
            dispatch(setProfilePage(response.data))
        })
    }
}

export const getStatusThunk=(userId)=>{
    return (dispatch)=>{
        trenirovkaApi.getStatus(userId)
        .then(response=>{
            dispatch(setStatus(response.data))
        })
    }
}

export const updateStatusThunk=(status)=>{
    return (dispatch)=>{
        trenirovkaApi.updateStatus(status)
        .then(response=>{
            if(response.resultCode===0){
                dispatch(setStatus(status))
            }
            
        })
    }
}

export default profileTrReducer