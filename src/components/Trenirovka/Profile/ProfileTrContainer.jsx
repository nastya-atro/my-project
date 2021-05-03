import React from 'react';
import { connect } from 'react-redux';
import ProfileTr from './ProfileTr';
import { setProfilePage, getProfilePageThunk, getStatusThunk, updateStatusThunk} from './../../../Trenirovka.Store/profile-reducer';
import * as axios from 'axios';
import { withRouter } from 'react-router';
import { trenirovkaApi } from '../../../api/api';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';




class ProfileTrContainer extends React.Component  {
    componentDidMount(){
        let userId=this.props.match.params.userId
        if(!userId){userId=16364}
        
        this.props.getProfilePageThunk(userId)
        this.props.getStatusThunk(userId)
        
    }

    render(){
        return(
            <ProfileTr {...this.props} 
            profile={this.props.profile} 
            status={this.props.status} 
            updateStatusThunk={this.props.updateStatusThunk}/>
        )
    }


}

let mapStateToProps=(state)=>{
    return{
        profile: state.profileTr.profile,
        status: state.profileTr.status
}}
    


export default compose(
    connect(mapStateToProps, {setProfilePage, getProfilePageThunk, getStatusThunk, updateStatusThunk}), 
    withAuthRedirect,
    withRouter
)(ProfileTrContainer)