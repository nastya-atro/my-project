import { AppStateType } from "./redux-store"

export const selectorUsers=(state: AppStateType)=>{
    return state.usersPage.users
}
export const selectorPageSize=(state: AppStateType)=>{
    return state.usersPage.pageSize
}
export const selectorTotalUsersCount=(state:AppStateType)=>{
    return state.usersPage.totalUsersCount
}
export const selectorCurrentPage=(state:AppStateType)=>{
    return state.usersPage.currentPage
}
export const selectorIsfetcing=(state:AppStateType)=>{
    return state.usersPage.isfetcing
}
export const selectorFollowingInProgress=(state:AppStateType)=>{
    return state.usersPage.followingInProgress
}

export const selectorTerm=(state:AppStateType)=>{
    return state.usersPage.term
}

export const selectorFriend=(state:AppStateType)=>{
    return state.usersPage.friend
}