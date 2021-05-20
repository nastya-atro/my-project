
import { Dispatch } from 'redux'
import { ChatMessagesType, chatWebSocketApi } from './../api/chatWebSocketApi'
import { CommonActionsTypes, CommonThunkType } from './redux-store'

let initialState = {
    messages: [] as Array<ChatMessagesType>,
    status: 'penging' as StatusType
}
type InitialStateType = typeof initialState
type StatusType='penging' | 'ready'

const chatWebSocketReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'chat/MESSAGES_RECIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        case 'chat/CHANGE_STATUS':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

const actions = {
    messagesRecived: (messages: Array<ChatMessagesType>) => ({
        type: 'chat/MESSAGES_RECIVED',
        payload: {messages}
    } as const),
    statusChange:(status: 'penging' | 'ready')=>({
        type: 'chat/CHANGE_STATUS',
        payload: {status}
    }as const)
}

type ActionsTypes = CommonActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes>

let _newMessageHandler: ((messages: Array<ChatMessagesType>) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statuaChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChange(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatWebSocketApi.start()
    chatWebSocketApi.subscribe('messages-recived', newMessageHandlerCreator(dispatch))
    chatWebSocketApi.subscribe('status-changed', statuaChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatWebSocketApi.unsubscribe('messages-recived', newMessageHandlerCreator(dispatch))
    chatWebSocketApi.unsubscribe('status-changed', statuaChangedHandlerCreator(dispatch))
    chatWebSocketApi.stop()
}

export const sendMessage = (messages: string): ThunkType => async (dispatch) => {
    chatWebSocketApi.sendMessage(messages)
}


export default chatWebSocketReducer;