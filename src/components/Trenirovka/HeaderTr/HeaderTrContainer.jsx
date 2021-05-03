import React from 'react';
import HeaderTr from './HeaderTr';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { getAuthDataThunk } from './../../../Trenirovka.Store/header-reducer';
import { trenirovkaApi } from '../../../api/api';
import { compose } from 'redux';

class HeaderContainer extends React.Component {

    componentDidMount(){
        
        this.props.getAuthDataThunk()
        
    }

    render(){ 
        return(
            <HeaderTr {...this.props}/>
        )
    }
}

let mapStateToProps=(state)=>{
    return{
        login: state.authTr.login,
        isAuth: state.authTr.isAuth
    }
}



export default compose(
    connect(mapStateToProps, {getAuthDataThunk})
)(HeaderContainer)