import React from "react";
import {connect} from "react-redux";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

const mapStateToProps=(state)=>{
    return{
        posts:state.profilePage.posts,
        newPostText: state.profilePage.newPostText,

    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        addPost:(messageProfileForm)=>{
            dispatch(addPostActionCreator(messageProfileForm));
        },

    }
}

export const MyPostContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)