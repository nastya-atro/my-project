import { usersApi } from "../api/api";


const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_CURRENT = 'users/SET_TOTAL_CURRENT';
const TOOGLE_IS_FETCING = 'users/TOOGLE_IS_FETCING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'users/TOOGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [],
    pageSize: 48,
    totalUsersCount: 0,
    currentPage: 1,
    isfetcing: true,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
              //  users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                //users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
               users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS:
            {
                return {
                    ...state, users: action.users
                }
            }
        case SET_CURRENT_PAGE:
            {
                return {
                    ...state, currentPage: action.currentPage
                }
            }
        case SET_TOTAL_CURRENT:
            {
                return {
                    ...state, totalUsersCount: action.totalCount
                }
            }
        case TOOGLE_IS_FETCING:
            {
                return {
                    ...state, isfetcing: action.isfetcing
                }
            }
        case TOOGLE_IS_FOLLOWING_PROGRESS:
            {
                return {
                    ...state,
                    followingInProgress: action.isfetcing ?
                        [...state.followingInProgress, action.userId] :
                        state.followingInProgress.filter(id => id !== action.userId)
                }
            }
        default:
            return state
    }
}

export const followSuccess = (userId) => ({
    type: FOLLOW, userId
})

export const unfollowSuccess = (userId) => ({
    type: UNFOLLOW, userId
})

export const setUsers = (users) => ({
    type: SET_USERS, users
})

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE, currentPage
})

export const setTotalCount = (totalCount) => ({
        type: SET_TOTAL_CURRENT, totalCount
    })

export const toogleIsFetcing = (isfetcing) => ({
    type: TOOGLE_IS_FETCING, isfetcing
})

export const tooggleFollowingProgress = (isfetcing, userId) => ({
    type: TOOGLE_IS_FOLLOWING_PROGRESS, isfetcing, userId
})


export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toogleIsFetcing(true))
        dispatch(setCurrentPage(currentPage))
        let data = await usersApi.getUsers(currentPage, pageSize)

        dispatch(toogleIsFetcing(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalCount(data.totalCount))
    }
}

const followUnfollowChange = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(tooggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(tooggleFollowingProgress(false, userId))
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowChange(dispatch, userId, usersApi.postFollow.bind(usersApi), followSuccess)
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowChange(dispatch, userId, usersApi.deleteFollow.bind(usersApi), unfollowSuccess)
    }
}


export default usersReducer