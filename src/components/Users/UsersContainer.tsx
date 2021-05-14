import React from 'react';
import { connect } from 'react-redux';
import { follow, getUsers, unfollow } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import { compose } from 'redux';
import { selectorPageSize, selectorUsers, selectorTotalUsersCount, selectorCurrentPage, selectorIsfetcing, selectorFollowingInProgress } from '../../redux/usersSelector';
import { AppStateType } from '../../redux/redux-store';
import { UserType } from '../../types/types';

type MapStatePropsType={
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isfetcing: boolean
    followingInProgress: Array<number>
} 
type MapDispatchPropsType={
    follow:(userId: number)=>void
    unfollow:(userId: number)=>void
    getUsers:(currentPage: number, pageSize: number)=>void
} 
type OwnStatePropsType={}
type PropsType= MapStatePropsType & MapDispatchPropsType & OwnStatePropsType


class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (currentPage:number) => {
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

let mapStateToProps = (state: AppStateType) => {
    return {
        users: selectorUsers(state),
        pageSize: selectorPageSize(state),
        totalUsersCount: selectorTotalUsersCount(state),
        currentPage: selectorCurrentPage(state),
        isfetcing: selectorIsfetcing(state),
        followingInProgress: selectorFollowingInProgress(state)
    }
}
//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnStatePropsType, AppStateType>(mapStateToProps,
    {follow, unfollow, getUsers}))(UsersContainer)