import React from 'react';
import Footer from './Footer';
import { connect } from 'react-redux';

class FooterContainer extends React.Component{

    render(){
        return(
            <Footer  {...this.props}/>
        )
    }
}

const mapStateToProps=(state)=>({
})

export default connect(mapStateToProps, {})(FooterContainer)