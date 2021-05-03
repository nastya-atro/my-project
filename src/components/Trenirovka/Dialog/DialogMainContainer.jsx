import React from 'react';
import s from './../Trenirovka.module.css'
import { addMessageActionCreator, changeMessageActionCreator } from '../../../Trenirovka.Store/message-reducer';
import DialogMain from './DialogMain';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        dialog: state.messagePage.dialog,
        message: state.messagePage.messages,
        newMessageText: state.messagePage.newMessageText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    
        buttonMessageContainer: (newMessage) => {
            dispatch(addMessageActionCreator(newMessage))
        }


    }
}


const DialogMainContainer = connect(mapStateToProps, mapDispatchToProps)(DialogMain)

export default DialogMainContainer