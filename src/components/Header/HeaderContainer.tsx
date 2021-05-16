import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {logout} from '../../redux/authReducer';

import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType={
    isAuth: boolean
    login:  string|null
}

type MapDispatchToPropsType={
    logout:()=>void
}


class HeaderContainer extends React.Component<MapStateToPropsType &MapDispatchToPropsType> {

    render() {
        return (
            <Header logout={this.props.logout} isAuth={this.props.isAuth} login={this.props.login}/>
        )
    } 
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    
    
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType >(mapStateToProps, { logout})(HeaderContainer)
