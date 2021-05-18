
import { Dispatch } from 'redux'
import { ChatMessagesType, chatWebSocketApi } from './../api/chatWebSocketApi'
import { CommonActionsTypes, CommonThunkType } from './redux-store'

let initialState = {
    messages: [] as Array<ChatMessagesType>
}
type InitialStateType = typeof initialState

const chatWebSocketReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'chat/MESSAGES_RECIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}

const actions = {
    messagesRecived: (messages: Array<ChatMessagesType>) => ({
        type: 'chat/MESSAGES_RECIVED',
        payload: { messages }
    } as const)
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


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatWebSocketApi.start()

    chatWebSocketApi.subscribe(newMessageHandlerCreator(dispatch))
}


export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatWebSocketApi.unsubscribe(newMessageHandlerCreator(dispatch))
    chatWebSocketApi.stop()
}


export const sendMessage = (messages: string): ThunkType => async (dispatch) => {
    chatWebSocketApi.sendMessage(messages)
}



export default chatWebSocketReducer;