import * as actionTypes from './actionTypes'

export const currentChatUpdate = (chatId) => {
    return {
        type: actionTypes.CHAT_CURRENT_CHAT_UPDATE,
        payload: {
            chatId: chatId,
        }
    }
}

export const chatSendMsg = (msg) => {
    return {
        type: actionTypes.CHAT_SEND_MSG,
        payload: {
            newMsg: msg,
        }
    }
}

export const chatRecvMsg = (username, msg) => {
    return {
        type: actionTypes.CHAT_RECV_MSG,
        payload: {
            username: username,
            newMsg: msg,
        }
    }
}