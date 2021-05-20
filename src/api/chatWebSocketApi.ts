export type ChatMessagesType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type EventType= 'messages-recived' | 'status-changed'
 
let subscribers={
    'messages-recived':[] as Array<SubscriberType>,
    'status-changed': [] as Array<StatusChangedType>

}


type SubscriberType = (messages: Array<ChatMessagesType>) => void
type StatusChangedType=(status: 'penging' | 'ready')=>void


let ws: WebSocket | null = null

let closeHandler = () => {
    notifySubscribersAboutStatus('penging')
    console.log('CLOSE WS')
    setTimeout(createChanal, 3000)
}
let messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-recived'].forEach(s => s(newMessages))
}

let notifySubscribersAboutStatus=(status:'penging' | 'ready')=>{
    subscribers['status-changed'].forEach(s=>s(status))
}

let openHandler=()=>{
    notifySubscribersAboutStatus('ready')
}

let cleanUp=()=>{
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
}

function createChanal() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('penging')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
}



export const chatWebSocketApi = {
    start() {
        createChanal()
    },

    stop() {
        subscribers['messages-recived'] = []
        subscribers['status-changed'] = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },

    subscribe(eventName:EventType, callback: SubscriberType|StatusChangedType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
        //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    unsubscribe(eventName:EventType, callback: SubscriberType|StatusChangedType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    sendMessage(message: string) {
        ws?.send(message)
    }
}


