import React from 'react';
import classes from './LoginForm.module.css'
import {Field} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";

const LoginForm = ({handleSubmit,error}) => {
    return (
        <form onSubmit={handleSubmit} className={classes.loginForm}>
            <div className={classes.loginLog}>
                <Field type={"text"} placeholder={'Login'} name={'email'} component={Input} validate={[required]}/></div>
            <div className={classes.passwordLog}>
                <Field type={"text"} placeholder={'Password'} name={'password'} type={'password'} component={Input} validate={[required]}/></div>
            <div className={classes.loginCheck}>
                <Field type={"checkbox"} name={'rememberMe'} component={'input'}/>
                <span className={classes.checkMe}>Запомнить</span>
            </div>
            {error && <div className={classes.formSummaryError}> {error}</div>}
            <div className={classes.buttonLog}>
                <button>Login</button>
            </div>

        </form>
    )
}

export default LoginForm;