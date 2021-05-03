import React from 'react';
import { connect } from 'react-redux';
import { sendMessageBodyActionCreator} from '../../redux/dialogReducer';
import Dialog from './Dialog';

import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


let mapSetToProps=(state)=>{
return {
    messagesPage: state.messagesPage,
}
}

let mapDispatchToProps=(dispatch)=>{
    return{
        sendMessageBody: (newMessage) => {
            dispatch(sendMessageBodyActionCreator(newMessage))
        }
    }
    
}


export default compose(
    connect(mapSetToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialog)