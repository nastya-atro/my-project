import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {logout} from './../../redux/authReducer';

class HeaderContainer extends React.Component {
    
    render() {
        debugger
        return (
            
            <Header {...this.props}/>
        )
    } 
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profile: state.profilePage.profile,

})

export default connect(mapStateToProps, { logout })(HeaderContainer)
