import React from "react";
import {connect} from "react-redux";
import {authMeActionCreator, getAuthMeThunkCreator, logOutThunkCreator} from "../../redux/authReducer";
import AuthMeAPI from "./authMeAPI";



let mapStateToProps =(state) =>{
    return {
        isAuth:state.authPage.isAuth,
        login:state.authPage.login
    }
}

let mapDispatchToProps =(dispatch) =>{
    return {
        // authorization:(id,email,login)=>{
        //     dispatch(authMeActionCreator(id,email,login))
        // },

        // getAuthMeThunk:(id,email,login)=>{
        //     dispatch(getAuthMeThunkCreator(id,email,login))
        // },
        logOutThunk:()=>{
            dispatch(logOutThunkCreator())
        }
    }
}


const AuthMeContainer = connect(mapStateToProps,mapDispatchToProps)(AuthMeAPI);

export default AuthMeContainer;