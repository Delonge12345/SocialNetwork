import React from "react";
import classes from './ProfileInfo.module.css'
import Preloader from "../../Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusHook from "./ProfileStatus/ProfileStatusHook";

const ProfileInfo = ({userProfile,status,updateProfileStatusThunk}) => {
 if(!userProfile){
     return <Preloader/>
 }


    return (
        <>
            <div className={classes.line}></div>
            <div className={classes.infoProfile}>
                <div className={classes.userBlock}>
                    <h2 className={classes.user}>Пользователь сайта</h2>
                    <div className={classes.ava}>
                        <img src={userProfile.photos.large}></img>

                    </div>
                    <div className={classes.name}>{userProfile.fullName}</div>
                </div>
                <div className={classes.description}>
                    {/*<div className={classes.descriptionItem}><i>Статус:</i>{props.userProfile.aboutMe}</div>*/}
                    <ProfileStatusHook status={status}
                                   updateProfileStatusThunk={updateProfileStatusThunk}

                    />
                    <div className={classes.descriptionItem}><i>VK:</i><p>{userProfile.contacts.vk}</p></div>
                    <div className={classes.descriptionItem}><i>Twitter:</i><p>{userProfile.contacts.twitter}</p></div>
                    <div className={classes.descriptionItem}><i>Instagram:</i><p>{userProfile.contacts.instagram}</p></div>
                    <div className={classes.descriptionItem}><i>Youtube:</i><p>{userProfile.contacts.youtube}</p></div>
                    <div className={classes.descriptionItem}><i>GitHub:</i><p>{userProfile.contacts.github}</p></div>
                    <div className={classes.descriptionItem}><i>FaceBook:</i><p>{userProfile.contacts.facebook}</p></div>
                    <div className={classes.descriptionItem}><i>Работаю/в поиске:</i><p>{userProfile.lookingForAJobDescription}</p></div>
                </div>
            </div>

        </>
    )
}

export default ProfileInfo