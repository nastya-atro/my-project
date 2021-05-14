import { UserType } from '../types/types';
import { CommonActionsTypes,  CommonThunkType } from './redux-store';
import { usersApi } from './../api/usersApi';

let initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    pageSize: 5,
    totalFriendCount: 0,
    friend: true,
}

type InitialStateType=typeof initialState

const friendPageReducer = (state:InitialStateType = initialState, action:ActionsTypes):InitialStateType => {
    switch (action.type) {
        case 'friendPage/GET_FOLLOWED_USER':
            {
                return {
                    ...state, users: action.users
                }
            }
        case 'friendPage/SER_TOTAL_FRIEND_COUNT': {
            return {
                ...state, totalFriendCount: action.totalFriendCount
            }
        }
        case 'friendPage/CHANGE_PAGE': {
            return {
                ...state, currentPage: action.page
            }
        }
        default:
            return state
    }
}

export const actions={
    getFollowedUserAC: (users: Array<UserType>) => ({
        type: 'friendPage/GET_FOLLOWED_USER', users
    } as const),
    
    setTotalFriendCount: (totalFriendCount:number) => ({
        type: 'friendPage/SER_TOTAL_FRIEND_COUNT', totalFriendCount
    }as const),
    
    changePage: (page:number) => ({
        type: 'friendPage/CHANGE_PAGE', page
    }as const)
}

type ActionsTypes= CommonActionsTypes<typeof actions>
type ThunkType= CommonThunkType<ActionsTypes>

export const getFollowedUserThunk = (page:number, pageSize:number, friend:boolean):ThunkType =>{
    return async (dispatch) => {
        dispatch(actions.changePage(page))
        let data = await usersApi.getFollowedUsers(page, pageSize, friend)
        dispatch(actions.getFollowedUserAC(data.items))
        dispatch(actions.setTotalFriendCount(data.totalCount))
        
    }
}

export default friendPageReducer