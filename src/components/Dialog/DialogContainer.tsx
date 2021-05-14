import { connect } from 'react-redux';
import { actions } from '../../redux/dialogReducer';
import Dialog from './Dialog';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { DialogsType, MessagesType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
type MapDispatchToPropsType = {
    sendMessageBody: (newMessage: string) => void
}
type OwnPropsType = {

}


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialog)