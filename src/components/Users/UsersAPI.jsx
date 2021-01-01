import React from 'react';
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {getUsersAPI} from "../../api/api";
import {useSelector} from "react-redux";
import {getIsFetching} from "../../redux/users-selectors";





const UsersAPI = (props) => {


    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>

}





export default UsersAPI;