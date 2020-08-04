import React from "react";
import * as axios from "axios";
import AuthMe from "./AuthMe";
import {getAuthMe} from "../../api/api";


class AuthMeAPI extends React.Component {
    // componentDidMount() {
    //
    //     this.props.getAuthMeThunk()
    // }


    render() {
        return (

            <AuthMe {...this.props}/>
        )

    }
}

export default AuthMeAPI;