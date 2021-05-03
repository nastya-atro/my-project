

export const selectorUsers=(state)=>{
    return state.usersPage.users
}

export const selectorPageSize=(state)=>{
    return state.usersPage.pageSize
}

export const selectorTotalUsersCount=(state)=>{
    return state.usersPage.totalUsersCount
}

export const selectorCurrentPage=(state)=>{
    return state.usersPage.currentPage
}

export const selectorIsfetcing=(state)=>{
    return state.usersPage.isfetcing
}

export const selectorFollowingInProgress=(state)=>{
    return state.usersPage.followingInProgress
}