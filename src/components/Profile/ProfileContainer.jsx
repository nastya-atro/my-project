import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, updateStatus, getStatus, putPhotos, changeProfile } from './../../redux/profileReducer';
import { withRouter } from 'react-router';

import { compose } from 'redux';
import { withAuthRedirect } from './../../hoc/withAuthRedirect';

 
class ProfileContainer extends React.Component {

    updateProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId
            if (!userId) {
                this.props.history.push("/login") }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.updateProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props} 
            profile={this.props.profile} 
            status={this.props.status} 
            updateStatus={this.props.updateStatus} 
            isOwner={!this.props.match.params.userId}
            putPhotos={this.props.putPhotos}
            changeProfile={this.props.changeProfile}
            
            />
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
    connect(mapStateToProps, { getProfile, updateStatus, getStatus, putPhotos, changeProfile }),
    withRouter
)(ProfileContainer) 