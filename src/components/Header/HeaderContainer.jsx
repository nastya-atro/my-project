import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {logout} from './../../redux/authReducer';

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header {...this.props} profile={this.props.profile} authUserId={this.props.authUserId} />
        )
    } 
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profile: state.profilePage.profile,
    authUserId: state.auth.id,
})

export default connect(mapStateToProps, { logout })(HeaderContainer)
