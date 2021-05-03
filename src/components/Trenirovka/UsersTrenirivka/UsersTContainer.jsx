import React from 'react';
import { connect } from 'react-redux';
import {follow, unfollow, toogleIsFetching, followingInProgress, getUsersThunk, setSelectedPageThunk, followThunk, unfollowThunk } from './../../../Trenirovka.Store/usersTrReducer';
import UsersT from './UsersT';
import * as axios from 'axios';
import Preloader from './../../common/preloader/Preloader';

import { compose } from 'redux';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';




class UsersTContainer extends React.Component {

    componentDidMount() {

        this.props.getUsersThunk(this.props.pageSize, this.props.selectedPage)
        
    }

    setSelectedPage = (p) => {
        this.props.setSelectedPageThunk(this.props.pageSize, p)
    }

    render() {
        return (<>
            {this.props.isFetching ? <Preloader /> : null}
            <UsersT
                totalCountUser={this.props.totalCountUser}
                pageSize={this.props.pageSize}
                selectedPage={this.props.selectedPage}
                setSelectedPage={this.setSelectedPage}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingProgress={this.props.followingProgress}
                followingInProgress={this.props.followingInProgress}
                followThunk={this.props.followThunk}
                unfollowThunk={this.props.unfollowThunk}
                

            />
        </>)
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersTr.users,
        totalCountUser: state.usersTr.totalCountUser,
        pageSize: state.usersTr.pageSize,
        selectedPage: state.usersTr.selectedPage,
        isFetching: state.usersTr.isFetching,
        followingProgress: state.usersTr.followingProgress,

    }
}

export default compose(
    connect(mapStateToProps, {  getUsersThunk, setSelectedPageThunk, followThunk, unfollowThunk}),
    withAuthRedirect
)(UsersTContainer)


