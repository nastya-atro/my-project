import React from 'react';
import { connect } from 'react-redux';
import FriendPage from './FriendPage';
import { getFollowedUserThunk} from '../../redux/friendPageReducer';
import {unfollow } from '../../redux/usersReducer';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType={
    currentPage: number
    pageSize: number
    friend: boolean
    users: Array<UserType>
    totalFriendCount: number
}
type MapDispatchToPropsType={
    getFollowedUserThunk:(currentPage: number, pageSize:number, friend:boolean)=>void
    unfollow:(userId: number)=>void
}
type OwnType={ 
}
type PropsType=MapStateToPropsType & MapDispatchToPropsType & OwnType


class FriendPageContainer extends React.Component<PropsType>{

    componentDidMount(){
        this.props.getFollowedUserThunk(this.props.currentPage, this.props.pageSize, this.props.friend)
    }

    componentDidUpdate(prevProps:any) {
        if (this.props.users !== prevProps.users) {
            this.props.getFollowedUserThunk(this.props.currentPage, this.props.pageSize, this.props.friend)
        }
    }

    changePageFriends=(currentPage:number)=>{
        this.props.getFollowedUserThunk(currentPage, this.props.pageSize, this.props.friend)
    }
        
    render(){
        
        return(<>
            <FriendPage users={this.props.users} 
            pageSize={this.props.pageSize} 
            changePageFriends={this.changePageFriends} 
            totalFriendCount={this.props.totalFriendCount} 
            currentPage={this.props.currentPage}
            friend={this.props.friend}
            unfollow={this.props.unfollow}
            />
          </>  
        )
    }
}

let mapStateToProps=(state:AppStateType)=>({
    currentPage: state.friendPage.currentPage,
    pageSize: state.friendPage.pageSize,
    friend: state.friendPage.friend,
    users: state.friendPage.users,
    totalFriendCount: state.friendPage.totalFriendCount,
    


})

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnType, AppStateType>
(mapStateToProps,{getFollowedUserThunk, unfollow})(FriendPageContainer)