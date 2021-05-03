import React from 'react';
import { connect } from 'react-redux';
import { follow, getUsers, setCurrentPage, unfollow } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import { tooggleFollowingProgress } from './../../redux/usersReducer';
import { compose } from 'redux';
import { selectorPageSize, selectorUsers, selectorTotalUsersCount, selectorCurrentPage, selectorIsfetcing, selectorFollowingInProgress } from './../../redux/usersSelector';




class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (currentPage) => {
        this.props.getUsers(currentPage, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isfetcing ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}

            />
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        users: selectorUsers(state),
        pageSize: selectorPageSize(state),
        totalUsersCount: selectorTotalUsersCount(state),
        currentPage: selectorCurrentPage(state),
        isfetcing: selectorIsfetcing(state),
        followingInProgress: selectorFollowingInProgress(state)

    }

}


export default compose(connect(mapStateToProps,
    {
        follow, unfollow, setCurrentPage, tooggleFollowingProgress, getUsers
    }))(UsersContainer)