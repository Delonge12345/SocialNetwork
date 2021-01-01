import React, {useEffect} from 'react';
import classes from "./Users.module.css";
import UserItem from "./UserItem/UserItem";
import Paginator from "../common/Paginator/Paginator";
import {UsersSearchForm} from "./UserSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter, getFollowFetching,
    getFollowingProcess, getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {followUserThunkCreator, getUsersThunkCreator, unFollorUserThunkCreator} from "../../redux/usersReducer";
import {getUsersAPI} from "../../api/api";


let Users = ({...props}) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const filter = useSelector(getFilter)
    const followingProcess = useSelector(getFollowingProcess)
    const isFetching = useSelector(getIsFetching)
    const followFetching = useSelector(getFollowFetching)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage,pageSize, filter,))

    },[])

    const onPageChanged = (page) => {
        dispatch(getUsersThunkCreator(page,pageSize, filter))
    }
    const onFilterChanged = (filter) => {
        dispatch(getUsersThunkCreator(1,pageSize, filter))
    }

    const followUserThunk=(id)=>{
        dispatch(followUserThunkCreator (id))
    }
    const unfollowUserThunk=(id)=>{
        dispatch(unFollorUserThunkCreator (id))
    }

    // let users = users;
    let UsersElements = users.map(u => <UserItem name={u.name}
                                                 status={u.status}
                                                 followed={u.followed}
                                                 location={u.location}
                                                 small={u.photos.small}
                                                 followUser={props.followUser}
                                                 unfollowUser={props.unfollowUser}
                                                 setFollowProcess={props.setFollowProcess}
                                                 followFetching={followFetching}
                                                 followingProcess={followingProcess}
                                                 followUserThunk={followUserThunk}
                                                 unfollowUserThunk={unfollowUserThunk}
                                                 key={u.id} id={u.id}/>)

    // let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize);
    // let pages = [];
    // for(let i = 1; i<=pagesCount;i++){
    //     pages.push(i)
    // }
    //
    // let paginationPages = pages.map(p=>{
    //     return <span onClick={(e)=>{props.onPageChanged(p)}} className={props.currentPage === p && classes.selectedPage}>{p}</span>
    // })




    return <div>

        <div className={classes.userPortion}>
            {/*{paginationPages}*/}
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount}
                       pageSize={pageSize}/>
            <div className={classes.users}>
                <div className={classes.userBlock}>
                    {UsersElements}
                </div>
            </div>
        </div>


    </div>
}





export default Users;