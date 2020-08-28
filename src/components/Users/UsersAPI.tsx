import React from 'react';
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {getUsersAPI} from "../../api/api";
import {UsersType} from "../../types/types";




type PropsType = {
    currentPage:number,
    pageSize:number,
    isFetching:boolean,
    totalUsersCount:number,
    setFollowProcess:(userId:number)=>void
    users:Array<UsersType>
    getUsersThunk: (currentPage:number,pageSize:number) => void,
    followingProcess:Array<Number>,
    unfollowUser:()=>void,
    followUser:()=>void,
    followFetching:boolean,
    followUserThunk:(userId:number)=>void,
    unfollowUserThunk:(userId:number)=>void,

}

class UsersAPI extends React.Component<PropsType> {



    componentDidMount() {
        // this.props.setFetching(true);
        // getUsersAPI.getUsers(this.props.currentPage,this.props.pageSize)
        //     .then(data => {
        //         this.props.setFetching(false    );
        //         this.props.setUsers(data.items);
        //         this.props.setTotalUsersCount(data.totalCount)
        //     });

        const {currentPage,pageSize} = this.props;
        this.props.getUsersThunk(currentPage,pageSize)
    }
    onPageChanged = (page:number) => {
        const {pageSize} = this.props;
        this.props.getUsersThunk(page,pageSize)
        // this.props.setCurrentPage(page)
        // this.props.setFetching(true);
        // getUsersAPI.getUsers(page,this.props.pageSize)
        //     .then(data => {
        //         this.props.setFetching(false);
        //         this.props.setUsers(data.items);
        //     });
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
        <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            currentPage={this.props.currentPage}
            followUser={this.props.followUser}
            unfollowUser={this.props.unfollowUser}
            setFollowProcess={this.props.setFollowProcess}
            followFetching={this.props.followFetching}
            followingProcess={this.props.followingProcess}
            followUserThunk={this.props.followUserThunk}
            unfollowUserThunk = {this.props.unfollowUserThunk}
        />
        </>

    }
}

export default UsersAPI;