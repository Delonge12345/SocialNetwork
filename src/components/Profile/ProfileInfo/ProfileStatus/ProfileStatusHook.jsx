import React from "react";
import classes from './ProfileStatus.module.css'


const ProfileStatusHook = (props) => {

    let [editMode, setEditMode] = React.useState(false);
    let [status,setStatus] = React.useState(props.state)

    React.useEffect(()=>{
        setStatus(props.status)
    },[props.state])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateProfileStatusThunk(status);
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    return (

        <div>
            {

                editMode
                    ? <div className={classes.descriptionItem}><i>Статус:</i><input
                        autoFocus={true}
                        onBlur={deActivateEditMode}
                        onChange={onChangeStatus}
                        value={status}


                    /></div>
                    : <div className={classes.descriptionItem}><i>Статус:</i>
                        <span onDoubleClick={activateEditMode}> {props.status || 'No status'}</span></div>

            }

        </div>
    )

}


export default ProfileStatusHook;