import React from 'react';
import * as axios from "axios";
import Profile from "./Profile";
import {Redirect} from "react-router-dom";



class ProfileAPI extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId;
        }

        this.props.getProfileThunk(userId);
        this.props.getProfileStatusThunk(userId);
    }


    render() {
        //
        // if(!this.props.isAuth){
        //     return <Redirect to={'/login'}/>
        // }


        return <>
            <Profile
                {...this.props}
                status={this.props.status}
                updateProfileStatusThunk={this.props.updateProfileStatusThunk}
                userProfile={this.props.userProfile}/>

        </>

    }


}

export default ProfileAPI;