import React from "react";
import classes from './ProfileStatus.module.css'


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status:this.props.status
    }

    activateEditMode() {
        this.setState({
            editMode: true,
        })
    }

    deActivateEditMode() {
        this.setState({
            editMode: false
        });
        this.props.updateProfileStatusThunk(this.state.status);
    }

    onStatusChange(e){
        this.setState({
            status: e.currentTarget.value
        });
}
    componentDidUpdate(prevProps, prevState) {
        if (this.props.status !== prevProps.status) {
            this.setState({
                status:this.props.status
            })
        }
    }

    render() {
        return (

            <div>
                {
                    this.state.editMode
                        ? <div className={classes.descriptionItem}><i>Статус:</i><input autoFocus={true}
                                                                                        onBlur={this.deActivateEditMode.bind(this)}
                                                                                        onChange={this.onStatusChange.bind(this)}
                                                                                        value={this.state.status}/>
                        </div>
                        : <div className={classes.descriptionItem}><i>Статус:</i> <span
                            onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status || 'No status'}</span></div>

                }

            </div>
        )

    }
}

export default ProfileStatus;