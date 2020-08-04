import React from "react";
import classes from './User.module.css'
import {NavLink} from "react-router-dom";

const User = (props) => {

    let path = "/dialogs/" + props.id;
    return(
        <div className={classes.dialogsUsersBlock}>
            <div className={classes.dialogUser}>
                <NavLink to={path}>{props.username}</NavLink>
            </div>
        </div>
    )
}

export default User;