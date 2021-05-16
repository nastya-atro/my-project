import React from 'react';
import Footer from './Footer';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

class FooterContainer extends React.Component{

    render(){
        return(
            <Footer/>
        )
    }
}

const mapStateToProps=(state: AppStateType)=>({
})

export default connect(mapStateToProps, {})(FooterContainer)