import React from 'react';
import {connect} from "react-redux";
import Login from "./Login";
import {loginThunkCreator,logOutThunkCreator} from "../../redux/authReducer";



const mapStateToProps=(state)=>{
    return{
        isAuth: state.authPage.isAuth
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        loginThunk:(email,password,rememberMe,captcha)=>{
            dispatch(loginThunkCreator(email,password,rememberMe,captcha))
        },

    }
}



export const LoginContainer = connect(mapStateToProps,mapDispatchToProps)(Login)