import React from "react";
import {connect} from "react-redux";
import {
    addPostActionCreator,
    getProfileStatusCreator,
    getProfileThunkCreator,
    savePhotoThunkCreator,
    saveProfileThunkCreator,
    setUserProfileActionCreator,
    updateNewPostTextActionCreator,
    updateProfileStatusCreator
} from "../../redux/profileReducer";
import ProfileAPI from "./ProfileAPI";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


const mapStateToProps = (state) => {
    return {
        // posts:state.profilePage.posts,
        // newPostText: state.profilePage.newPostText,
        userProfile: state.profilePage.userProfile,
        status:state.profilePage.status,
        isAuth: state.authPage.isAuth,
        authUserId:state.authPage.id

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        // addPost:()=>{
        //     dispatch(addPostActionCreator());
        // },
        // updateNewMessageBody:(text)=>{
        //     dispatch(updateNewPostTextActionCreator(text))
        // },
        // setUserProfile:(profile)=>{
        //     dispatch(setUserProfileActionCreator(profile))
        // },
        getProfileThunk: (userId) => {
            dispatch(getProfileThunkCreator(userId))
        },
        getProfileStatusThunk:(userId)=>{
            dispatch(getProfileStatusCreator(userId))
        },
        updateProfileStatusThunk:(status)=>{
            dispatch(updateProfileStatusCreator(status))
        },
        savePhotoThunk: (file) =>{
            dispatch(savePhotoThunkCreator(file))
        },
        saveProfileThunk: (data) =>{
            dispatch(saveProfileThunkCreator(data))
        }
    }
}


// const withRouterContainer = withRouter(ProfileAPI); // Тут лежит компонент ProfileAPI с знаниями об url
//
// let RedirectHOC = withAuthRedirect(withRouterContainer); // Тут лежит ProfileAPI с знаниями об url и условием редиректа

// export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(RedirectHOC);



export const ProfileContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter,

)(ProfileAPI);