import React from 'react';
import classes from './Login.module.css'
import LoginForm from "./LoginForm/LoginForm";
import {reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";


const Login = (props) => {

    const onSubmit=(formData)=>{
        console.log(formData)
        props.loginThunk(formData.email,formData.password,formData.rememberMe,formData.captcha)
    }

    if(props.isAuth){
        return <Redirect to ={'/profile'}/>
    }
    return <>
        <div className={classes.loginPage}>
            <div className={classes.LoginBlockForm}>
                <div><h2>Authorization</h2></div>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    </>
}

const LoginReduxForm=reduxForm({
    form:'loginAuth'
})(LoginForm)

export default Login;