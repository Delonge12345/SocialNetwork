import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./AuthMe.module.css";
import logOut from "./exit.png"

let AuthMe = (props) => {
    return <>
        <div className={classes.loginBlock}>
            {props.isAuth
                ? <span className={classes.loginName}>{props.login} -
                    <button className={classes.buttonLogOut} onClick={props.logOutThunk}><img  className={classes.imgLogOut} src={logOut } alt=""/></button></span>
                : <NavLink to={'/login'}></NavLink>}

        </div>
    </>

}

export default AuthMe;