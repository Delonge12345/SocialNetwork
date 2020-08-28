import React from "react";
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div className={classes.profile}>
            <ProfileInfo  userProfile={props.userProfile}
                          isOwner={props.isOwner}
                          status={props.status}
                          updateProfileStatusThunk={props.updateProfileStatusThunk}
                          savePhotoThunk = {props.savePhotoThunk}
                          saveProfileThunk={props.saveProfileThunk}
            />
            <MyPostContainer/>
        </div>
    )
}

export default Profile;