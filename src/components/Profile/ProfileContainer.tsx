import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, updateStatus, getStatus, putPhotos, changeProfile } from '../../redux/profileReducer';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { PhotosType, ProfileType } from '../../types/types';

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    getProfile:(userId: number |null)=>void
    updateStatus:(status: string)=>void
    getStatus:(userId: number|null)=>void
    putPhotos:(photos: File)=>void
    changeProfile:(profile: ProfileType)=>void
}
type PathParamsType={
    userId: string
}
type PropsTypes=MapStateToPropsType & MapDispatchToPropsType &RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsTypes> {

    updateProfile() {
        let userId:number|null= +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.updateProfile()
    }
    componentDidUpdate(prevProps:PropsTypes, prevState:PropsTypes) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
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

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getProfile, updateStatus, getStatus, putPhotos, changeProfile }),
    withRouter
)(ProfileContainer)