import { Dispatch } from "react";
import { ResultCodeEnum } from "../api/api";
import { UserType } from "../types/types";
import { CommonActionsTypes, CommonThunkType } from "./redux-store";
import { usersApi } from './../api/usersApi';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 48,
    totalUsersCount: 0,
    currentPage: 1,
    isfetcing: true,
    followingInProgress: [] as Array<number>, //array of users id
    term: '',
    friend: null as null | boolean
};
 
type InitialStateType = typeof initialState;

const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case 'SET_USERS':
            {
                return {
                    ...state, users: action.users
                }
            }
        case 'SET_CURRENT_PAGE':
            {
                return {
                    ...state, currentPage: action.currentPage
                }
            }
        case 'SET_TOTAL_CURRENT':
            {
                return {
                    ...state, totalUsersCount: action.totalCount
                }
            }
        case 'TOOGLE_IS_FETCING':
            {
                return {
                    ...state, isfetcing: action.isfetcing
                }
            }
        case 'TOOGLE_IS_FOLLOWING_PROGRESS':
            {
                return {
                    ...state,
                    followingInProgress: action.isfetcing ?
                        [...state.followingInProgress, action.userId] :
                        state.followingInProgress.filter(id => id !== action.userId)
                }
            }

        case 'SEARCH_USERS':{
            return {
                ...state, 
                term: action.term,
                friend: action.friend
            }
        }
        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalCount: (totalCount: number) => ({ type: 'SET_TOTAL_CURRENT', totalCount } as const),
    toogleIsFetcing: (isfetcing: boolean) => ({ type: 'TOOGLE_IS_FETCING', isfetcing } as const),
    setSearchUsers:(term: string, friend: null|boolean)=>({type: 'SEARCH_USERS', term, friend}as const),
    tooggleFollowingProgress: (isfetcing: boolean, userId: number) => ({ type: 'TOOGLE_IS_FOLLOWING_PROGRESS', isfetcing, userId } as const)

}

type ActionsTypes = CommonActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number, term:string, friend: null|boolean): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toogleIsFetcing(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setSearchUsers(term, friend))
        let data = await usersApi.getUsers(currentPage, pageSize, term, friend)
        dispatch(actions.toogleIsFetcing(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalCount(data.totalCount))
    }
}
export const followUnfollowChange = async (dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.tooggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))}
    dispatch(actions.tooggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowChange(dispatch, userId, usersApi.postFollow.bind(usersApi), actions.followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowChange(dispatch, userId, usersApi.deleteFollow.bind(usersApi), actions.unfollowSuccess)
    }
}

export default usersReducer