import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, updateStatus, getStatus } from './../../redux/profileReducer';
import { withRouter } from 'react-router';

import { compose } from 'redux';
import { withAuthRedirect } from './../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.match.params.userId;
        
        if (!userId) { 
            userId = this.props.authUserId 
        if(!userId){
            this.props.history.push("/login")
        }
        }


        this.props.getProfile(userId);
        this.props.getStatus(userId);
        
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}


export default compose(
    connect(mapStateToProps, { getProfile, updateStatus, getStatus}),
    withRouter
)(ProfileContainer)