import React from 'react';
import * as axios from "axios";
import Profile from "./Profile";
import {Redirect} from "react-router-dom";




class ProfileAPI extends React.Component {
    refreshProfile(){
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId;
        }

        this.props.getProfileThunk(userId);
        this.props.getProfileStatusThunk(userId);
    }
    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile();
        }
    }


    render() {
        //
        // if(!this.props.isAuth){
        //     return <Redirect to={'/login'}/>
        // }


        return <>
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userId}
                status={this.props.status}
                updateProfileStatusThunk={this.props.updateProfileStatusThunk}
                savePhotoThunk = {this.props.savePhotoThunk}
                userProfile={this.props.userProfile}
                saveProfileThunk={this.props.saveProfileThunk}
            />


        </>

    }


}

export default ProfileAPI;