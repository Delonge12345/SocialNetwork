import React from 'react';
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {useSelector} from "react-redux";
import {getIsFetching} from "../../redux/users-selectors";





const UsersPage = (props) => {


    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>

}





export default UsersPage