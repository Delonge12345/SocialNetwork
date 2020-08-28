import React from "react";
import classes from "./ProfileInfo.module.css";
import ProfileStatusHook from "./ProfileStatus/ProfileStatusHook";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";

const ProfileDataForm = ({userProfile, isOwner, onMainPhotoSelected, updateProfileStatusThunk, status, handleSubmit,error}) => {

    return <form onSubmit={handleSubmit} className={classes.description}>
        <div className={classes.blockName}>
            <div className={classes.descriptionItem}><i>FullName</i></div>
            <Field type={"text"} name={'fullName'} component={Input}></Field>
        </div>
        <div className={classes.descriptionItem}><i>lookingForAJob:</i>
            <Field type={"checkbox"} name={'lookingForAJob'} component={Input}/>
        </div>

        <div className={classes.descriptionItem}><i>AboutMe:</i>
            <Field type={"text"} name={'AboutMe'} component={Textarea}/>
        </div>

        <div className={classes.descriptionItem}><i> My professional skills:</i>
            <Field type={"text"} name={'lookingForAJobDescription'} component={Textarea}/>

        </div>
        <div>

        </div>
        {Object.keys(userProfile.contacts).map(key => {
            return <div className={classes.contacts}>
                <b>{key}:<Field type={"text"} name={'contacts.' + key} component={Input}></Field></b>
            </div>
        })}
        <button>Save</button>
        {error && <div className={classes.formSummaryError}> {error}</div>}
    </form>

}


const ProfileDataReduxForm = reduxForm({
    form: 'EditProfileData'
})(ProfileDataForm)

export default ProfileDataReduxForm