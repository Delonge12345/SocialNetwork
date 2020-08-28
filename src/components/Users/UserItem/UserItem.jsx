import React from 'react';
import classes from './UserItem.module.css'
import userLogo from './1.png'
import {NavLink} from "react-router-dom";

const UserItem = (props) => {
    return (

        <div className={classes.userBlockInfo}>
            <div className={classes.userInfo}>
                <div className={classes.userFollow}>
                    <img src={props.small != null ? props.small : userLogo}/>
                    <div className={classes.followButtonBlock}>
                        {props.followed
                            ? <button className={classes.followButton}
                                      disabled={props.followingProcess.some(id => id === props.id)}
                                      onClick={() => {
                                          props.unfollowUserThunk(props.id)


                                      }}>UnFollow</button>

                            : <button className={classes.followButton}

                                      disabled={props.followingProcess.some(id => id === props.id)}
                                      onClick={() => {
                                          props.followUserThunk(props.id)


                                      }}>Follow</button>

                        }
                    </div>
                </div>

                <div className={classes.userSub}>
                    <span><i>Name: </i> {props.name}</span>
                    <span><i>Status: </i>{props.status}</span>
                    <span><i>City: </i> {'props.location.city'}</span>
                    <span><i>Country: </i> {'props.location.country'}</span>
                </div>
            </div>

            <div className={classes.clickProfile}>
                <NavLink to={'/profile' + '/' + props.id}>
                    <button className={classes.profileButton}> Move on to profile</button>
                </NavLink>
            </div>

        </div>
    )
}

export default UserItem;