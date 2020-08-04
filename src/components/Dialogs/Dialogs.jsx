import React from "react";
import classes from './Dialogs.module.css'
import Message from "./Message/Message";
import User from "./User/User";
import navigation from "../Profile/MyPosts/img/navigation.png";
import {Redirect} from "react-router-dom";
import handleSubmit from "redux-form/lib/handleSubmit";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLength, minLength, required} from "../../utils/validators/validators";


const Dialogs = (props) => {


    let state = props.dialogsPage;
    let isAuth = props.isAuth

    let dialogsElements = state.dialogs.map(d => <User username={d.username} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message id={m.id} message={m.message} key={m.id}
                                                            username={m.username}/>);


    // let onSendMessageClick = () => {
    //     props.sendMessage();
    // }
    // let onNewMessageChange = (e) => {
    //     let body = e.target.value;
    //     props.updateNewMessageBody(body);
    // }

    const onSubmit = (formData) => {
        props.sendMessage(formData.messageBody);
    }

    // if(!isAuth){
    //     return <Redirect to ={'/login'}/>
    // }


    return (
        <div className={classes.dialogs}>
            <div className={classes.listUsers}>
                <h2>Friends</h2>
                {dialogsElements}
            </div>
            <div className={classes.chatBlock}>
                <h2>Чат</h2>
                <div className={classes.dialogsMessageBlock}>
                    {messagesElements}
                </div>
                <div className={classes.newMessage}>
                    <DialogReduxForm onSubmit={onSubmit}/>
                </div>
            </div>

        </div>
    )
}
const maxLength15 = maxLength(15);
const minLength2 = minLength(2)

const DialogForm = (props) => {



    return (
        <form onSubmit={props.handleSubmit} className={classes.textNewMessage}>
            <Field className={classes.messageTextarea}
                   placeholder={'Enter your message!'}
                   component={Textarea}
                   name={'messageBody'}
                   validate={[required, maxLength15, minLength2]}


            ></Field>
            <button className={classes.addButton}>
                <span className={classes.addIcon}><img src={navigation} alt=""/></span>
            </button>
        </form>
    )
}

const DialogReduxForm = reduxForm({
    form: 'dialogMessage', // имя формы в state (state.form.post)
})(DialogForm);

export default Dialogs;