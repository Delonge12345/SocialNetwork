import React from 'react';
import classes from "./Users.module.css";
import UserItem from "./UserItem/UserItem";
import Paginator from "../common/Paginator/Paginator";


let Users = ({currentPage,onPageChanged,totalUsersCount,pageSize,users,...props})=>{

    // let users = users;
    let UsersElements = users.map(u => <UserItem name={u.name}
                                                 status={u.status}
                                                 followed={u.followed}
                                                 location={u.location}
                                                 small={u.photos.small}
                                                 followUser={props.followUser}
                                                 unfollowUser={props.unfollowUser}
                                                 setFollowProcess={props.setFollowProcess}
                                                 followFetching={props.followFetching}
                                                 followingProcess={props.followingProcess}
                                                 followUserThunk={props.followUserThunk}
                                                 unfollowUserThunk={props.unfollowUserThunk}
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
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged}  totalUsersCount={totalUsersCount} pageSize={pageSize} />
            <div className={classes.users}>
                <div className={classes.userBlock}>
                    {UsersElements}
                </div>
            </div>
        </div>



    </div>
}


export default Users;