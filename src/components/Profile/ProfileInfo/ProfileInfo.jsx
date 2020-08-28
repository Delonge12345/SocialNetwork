import React, {useState} from "react";
import classes from './ProfileInfo.module.css'
import Preloader from "../../Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusHook from "./ProfileStatus/ProfileStatusHook";
import userLogo from './../../Users/UserItem/1.png'
import ProfileDataReduxForm from "./ProfileDataForm";


const ProfileInfo = ({userProfile, status, updateProfileStatusThunk, isOwner, savePhotoThunk, saveProfileThunk}) => {

    let [editMode, setEditMode] = React.useState(false)


    if (!userProfile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhotoThunk(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfileThunk(formData)

        setEditMode(false)

    }

    return (
        <>
            <div className={classes.line}></div>
            <div className={classes.infoProfile}>
                <div className={classes.userBlock}>
                    <h2 className={classes.user}>Пользователь сайта</h2>
                    <div className={classes.ava}>
                        <img src={userProfile.photos.large || userLogo} className={classes.mainPhoto}></img>
                    </div>
                    <div className={classes.blockName}>
                        <div className={classes.name}>{userProfile.fullName}</div>
                    </div>


                </div>

                <div className={classes.descPosition}>
                    <div className={classes.statusUploadBlock}>
                        {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                        <ProfileStatusHook status={status}
                                           updateProfileStatusThunk={updateProfileStatusThunk}

                        />
                    </div>
                    {
                        editMode
                            ? <ProfileDataReduxForm initialValues={userProfile}
                                                    userProfile ={userProfile}
                                                    onSubmit={onSubmit} isOwner={isOwner}
                                                    onMainPhotoSelected={onMainPhotoSelected}
                                                    updateProfileStatusThunk={updateProfileStatusThunk}
                                                    status={status}/>
                            : <ProfileData userProfile={userProfile} isOwner={isOwner} goToEditMode={() => {
                                setEditMode(true)
                            }} onMainPhotoSelected={onMainPhotoSelected} updateProfileStatusThunk={updateProfileStatusThunk}
                                           status={status}

                            />
                    }
                </div>
            </div>




        </>
    )
}


const ProfileData = ({userProfile, isOwner, onMainPhotoSelected, updateProfileStatusThunk, status, goToEditMode}) => {
    return (


        <div className={classes.description}>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div className={classes.descriptionItem}><i>lookingForAJob:</i>
                {userProfile.lookingForAJob ? 'yes' : 'no'}
            </div>

            <div className={classes.descriptionItem}><i>About Me:</i>
                {userProfile.AboutMe}
            </div>
            {
                userProfile.lookingForAJob &&
                <div className={classes.descriptionItem}><i>Работаю/в поиске:</i>
                    {userProfile.lookingForAJobDescription}</div>
            }

            {Object.keys(userProfile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={userProfile.contacts[key]}/>
            })}


        </div>

    )
}


const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={classes.descriptionItem}><i>{contactTitle}:</i>{contactValue}</div>
    )
}

export default ProfileInfo