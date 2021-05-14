import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/redux-store';

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapStateToPropsType={
    isAuth:boolean
}

export function withAuthRedirect<WCP>(Component:React.ComponentType<WCP>){
    const RedirectComponent: React.FC<MapStateToPropsType>=(props)=> {
        let {isAuth, ...restProps}=props
            if(!props.isAuth) return <Redirect to={'/login'} />
            return <Component {...restProps as WCP} />
         
    }
    let ConnectedAuthRedirectComponent = connect<MapStateToPropsType, {}, WCP, AppStateType>(mapStateToProps)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}
