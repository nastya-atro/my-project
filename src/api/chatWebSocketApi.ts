export type ChatMessagesType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type SubscriberType = (messages: Array<ChatMessagesType>) => void

let subscribers = [] as Array<SubscriberType>
let ws: WebSocket | null = null

let closeHandler = () => {
    console.log('CLOSE WS')
    setTimeout(createChanal, 3000)
}
let messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChanal() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}



export const chatWebSocketApi = {
    start() {
        createChanal()
    },

    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },

    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },

    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },

    sendMessage(message: string) {
        ws?.send(message)
    }
}


