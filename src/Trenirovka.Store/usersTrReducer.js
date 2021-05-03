import { trenirovkaApi } from "../api/api"

let FOLLOWED = 'FOLLOWED'
let UNFOLLOWED = 'UNFOLLOWED'
let SET_USERS ='SET_USERS'
let SET_SELECTED_PAGE='SET_SELECTED_PAGE'
let SET_TOTAL_USERS_COUNT='SET_TOTAL_USERS_COUNT'
let IS_FETCHING='IS_FETCHING'
let FOLLOWING_IN_PROGRESS='FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [ ],
    totalCountUser: 0,
    pageSize:5,
    selectedPage:1,
    isFetching: true,
    followingProgress: []
}

const usertsTrReducer = (state=initialState, action) => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                //users:updateObjectInArray(state.users, action.userId, "id", {followed: true})

               users: state.users.map(u => {
                    if (action.usersId === u.id) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case UNFOLLOWED:
            return {
                ...state,
               // users:updateObjectInArray(state.users, action.userId, "id", {followed: false})
                users: state.users.map(u => {
                    if (action.usersId === u.id) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
               users: action.users
            }
        case SET_SELECTED_PAGE:
            return {
                ...state,
                selectedPage: action.selectedPage  
            }

        case SET_TOTAL_USERS_COUNT:
            return{
                ...state,
                totalCountUser: action.totalCountUser

            }

        case IS_FETCHING:
            return{
                ...state,
                isFetching: action.isFetching
            }

        case FOLLOWING_IN_PROGRESS:
            return{
                ...state,
                followingProgress: action.isFetching ? 
                [...state.followingProgress, action.userId ] : 
                state.followingProgress.filter(id=>id !==action.userId)
            }

        default:
            return state
    }




}

export const follow = (usersId) => ({
    type: FOLLOWED, usersId

})

export const unfollow = (usersId) => ({
    type: UNFOLLOWED, usersId

})

export const setUsers =(users)=>({
    type: SET_USERS, users
})

export const setSelectedPage=(selectedPage)=>({
    type: SET_SELECTED_PAGE, selectedPage
})

export const setTotalUsersCount=(totalCountUser)=>({
    type: SET_TOTAL_USERS_COUNT, totalCountUser
})

export const toogleIsFetching=(isFetching)=>({
    type: IS_FETCHING, isFetching
})

export const followingInProgress=(isFetching , userId)=>({
    type: FOLLOWING_IN_PROGRESS, isFetching, userId
})


export const getUsersThunk=(pageSize, selectedPage)=>{
    return (dispatch)=>{
        dispatch(toogleIsFetching(true))

        trenirovkaApi.getUsersTr(pageSize, selectedPage)

        .then(response => {
                dispatch(toogleIsFetching(false))
                dispatch(setUsers(response.data.items))
                dispatch(setTotalUsersCount(response.data.totalCount))
            })
    }
}

export const setSelectedPageThunk=(pageSize, p)=>{
    return (dispatch)=>{
       dispatch(setSelectedPage(p))
        dispatch(toogleIsFetching(true))
        
        trenirovkaApi.getUsersTr(pageSize, p)
            .then(response => {
                dispatch(toogleIsFetching(false))
                dispatch(setUsers(response.data.items))
            })
    }
}

export const unfollowThunk=(userId)=>{
    return (dispatch)=>{
        dispatch(followingInProgress(true, userId))
        trenirovkaApi.unfollow(userId)
        .then(response=>{

            if(response.data.resultCode===0){
                dispatch(unfollow(userId))
            }
            dispatch(followingInProgress(false, userId))
        })
    }
}

export const followThunk=(userId)=>{
    return (dispatch)=>{
        dispatch(followingInProgress(true, userId))
        trenirovkaApi.follow(userId)
        .then(response=>{

            if(response.data.resultCode===0){
                dispatch(follow(userId))
            }
            dispatch(followingInProgress(false, userId))
        })
    }
}


export default usertsTrReducer