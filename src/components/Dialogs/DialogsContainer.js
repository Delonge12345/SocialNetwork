import React from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


let mapStateToProps = (state)=>{
    return{
        dialogsPage: state.dialogsPage,
        isAuth:state.authPage.isAuth
    }
}

let mapDispatchToProps = (dispatch)=>{
    return {
        sendMessage: (messageBody) => {
            dispatch(sendMessageCreator(messageBody))
        }
    }
}


let RedirectHOC =  withAuthRedirect(Dialogs); // здесь лежит Dialogs с условие редиректа

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(RedirectHOC);
export default DialogsContainer;