import React from "react";
import classes from './Message.module.css'

const Message = (props) => {
    return (
        <div className={classes.DialogsMessage}>
            <div className={classes.dialogsUserAva}>
                <img src="https://krot.info/uploads/posts/2019-10/1570968710_instagram-kevin-dzhejms-44.jpg" alt=""/>
                <p>{props.username}</p>
            </div>
            <div className={classes.dialogsMessageTextBlock}>
                <div className={classes.dialogsMessageText}>
                    <p>{props.message}</p>
                </div>
            </div>

        </div>
    )
}

export default Message;