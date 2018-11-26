import * as actionTypes from './actionTypes'
import axios from 'axios'

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

export const loadingChats = () => {
    return {
        type: actionTypes.CHAT_INIT_LOADING,
    }
}

export const errorChats = () => {
    return {
        type: actionTypes.CHAT_INIT_ERROR,
    }
}

export const saveChats = (chats) => {
    return  {
        type: actionTypes.CHAT_INIT_DONE,
        payload: {
            chats: chats,
        },
    }
}

export const chatInit = () => {
    return async dispatch => {
        dispatch(loadingChats())
        /* Async fetch the api */
        try {
            const resp = await axios.get('/messages')
            const chats = resp.data.chats
            dispatch(saveChats(chats))
        } catch(error) {
            dispatch(errorChats())
            console.log(error)
        }
    }
}