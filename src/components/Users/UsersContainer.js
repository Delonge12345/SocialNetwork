import React from "react";
import {connect} from "react-redux";
import {
    followedActionCreator, followingProcessActionCreator, followUserThunkCreator, getUsersThunkCreator,
    setCurrentPageActionCreator, setFetchingActionCreator, setTotalUsersCountActionCreator,
    setUsersActionCreator, unFollorUserThunkCreator,
    unFollowedActionCreator
} from "../../redux/usersReducer";
import UsersAPI from "./UsersAPI";
import {
    getCurrentPage, getFollowFetching,
    getFollowingProcess,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";




const mapStateToProps=(state)=>{
    return{
        users: getUsers(state),
        pageSize:getPageSize(state),
        totalUsersCount:getTotalUsersCount(state),
        currentPage:getCurrentPage(state),
        isFetching :getIsFetching(state),
        followingProcess:getFollowingProcess(state),
        followFetching:getFollowFetching(state)
    }
}



const mapDispatchToProps=(dispatch)=>{
    return{
        // followUser:(userId)=>{
        //     dispatch(followedActionCreator(userId));
        // },
        // unfollowUser:(userId)=>{
        //     dispatch(unFollowedActionCreator(userId));
        // },
        // setUsers:(users)=>{
        //     dispatch(setUsersActionCreator(users))
        // },
        // setCurrentPage:(currentPage)=>{
        //     dispatch(setCurrentPageActionCreator(currentPage))
        // },
        // setTotalUsersCount:(totalCount)=>{
        //     dispatch(setTotalUsersCountActionCreator(totalCount))
        // },
        // setFetching:(isFetching)=>{
        //     dispatch(setFetchingActionCreator(isFetching))
        // },
        // setFollowProcess:(userId,followFetching)=>{
        //     dispatch(followingProcessActionCreator(userId,followFetching))
        // },
        getUsersThunk:(currentPage,pageSize)=>{
            dispatch(getUsersThunkCreator(currentPage,pageSize))
        },
        followUserThunk:(id)=>{
            dispatch(followUserThunkCreator (id))
        },
        unfollowUserThunk:(id)=>{
            dispatch(unFollorUserThunkCreator(id))
        }
    }
}



export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(UsersAPI);