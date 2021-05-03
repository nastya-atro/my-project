import React from 'react';
import { connect } from 'react-redux';
import UserPage from './UserPage';


class UserContainerPage extends React.Component{
    render(){
        return <UserPage users={this.props.users}/>
    }
}

let mapStateToProps=(state)=>{
    return{
        users: state.userP.users
    }
    
}

let mapDispatchToProps=(dispatch)=>{

}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainerPage)