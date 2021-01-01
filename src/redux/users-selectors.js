export const getUsers = (state) =>{
    return state.usersPage.users
}

export const getPageSize = (state) =>{
    return state.usersPage.pageSize
}


export const getTotalUsersCount = (state) =>{
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) =>{
    return state.usersPage.currentPage
}

export const getIsFetching = (state) =>{
    return state.usersPage.isFetching
}

export const getFollowingProcess= (state) =>{
    return state.usersPage.followingProcess
}

export const getFollowFetching= (state) =>{
    return state.usersPage.followFetching
}

export const getFilter= (state) =>{
    return state.usersPage.filter
}
