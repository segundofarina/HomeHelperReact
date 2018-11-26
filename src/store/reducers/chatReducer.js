import * as actionTypes from '../actions/actionTypes'

const initialState = {
    currentChat: 1,
    idCounter: 11,
    chats: [
        {
            chatId: 1,
            toName: 'Martin Victory',
            toUsername: 'tinchovictory',
            messages: [
                {
                    id: 1,
                    from: 'mine',
                    text: 'Hola',
                }, {
                    id: 2,
                    from: 'mine',
                    text: 'Como va?',
                }, {
                    id: 3,
                    from: 'yours',
                    text: 'Hola',
                }, {
                    id: 4,
                    from: 'yours',
                    text: 'Todo bien',
                }, {
                    id: 5,
                    from: 'yours',
                    text: 'Vos?',
                    isNewMsg: true
                },
            ]
        },
        {
            chatId: 2,
            toName: 'Martin Victory2',
            toUsername: 'tinchovictory2',
            messages: [
                {
                    id: 6,
                    from: 'mine',
                    text: 'Holaa',
                }, {
                    id: 7,
                    from: 'mine',
                    text: 'Como va??',
                }, {
                    id: 8,
                    from: 'yours',
                    text: 'Holaa',
                }, {
                    id: 9,
                    from: 'yours',
                    text: 'Todo bienn',
                }, {
                    id: 10,
                    from: 'yours',
                    text: 'Vos??',
                },
            ]
        },
    ],
}

const reducer = (state = initialState, action) => {
    let newMsg = {}
    switch(action.type) {
        case actionTypes.CHAT_CURRENT_CHAT_UPDATE:
            return {
                ...state,
                chats: getUpdatedChatListWithoutIsNew(state.chats),
                currentChat: action.payload.chatId
            }
        case actionTypes.CHAT_SEND_MSG:
            newMsg = {
                id: state.idCounter,
                from: 'mine',
                text: action.payload.newMsg,
                isNewMsg: true,
            }
            return {
                ...state,
                chats: getUpdatedChatListByCurrentChat(state.chats, newMsg, state.currentChat),
                idCounter: state.idCounter + 1,
            }
        case actionTypes.CHAT_RECV_MSG:
            newMsg = {
                id: state.idCounter,
                from: 'yours',
                text: action.payload.newMsg,
                isNewMsg: true,
            }
            return {
                ...state,
                chats: getUpdatedChatListByUsername(state.chats, newMsg, action.payload.username),
                idCounter: state.idCounter + 1,
            }
        default:
            return state
    }
}

const getUpdatedChatListByCurrentChat = (chats, newMsg, currentChat) => {
    const updatedChats = []
    chats.forEach(chat => {
        if(chat.chatId !== currentChat) {
            updatedChats.push({...chat})
        } else {
            const newMessages = [...chat.messages, {
                ...newMsg,
            }]
            const newChatObj = {
                ...chat,
                messages: newMessages,
            }
            updatedChats.push(newChatObj)
        }
    })

    return updatedChats
}

const getUpdatedChatListByUsername = (chats, newMsg, username) => {
    const updatedChats = []
    chats.forEach(chat => {
        if(chat.toUsername !== username) {
            updatedChats.push({...chat})
        } else {
            const newMessages = [...chat.messages, {
                ...newMsg,
            }]
            const newChatObj = {
                ...chat,
                messages: newMessages,
            }
            updatedChats.push(newChatObj)
        }
    })

    return updatedChats

}

const getUpdatedChatListWithoutIsNew = (chats) => {
    const updatedChats = []
    chats.forEach(chat => {
        const newMessages = chat.messages.map(message => {
            return {
                id: message.id,
                from: message.from,
                text: message.text,
            }
        })
        const newChatObj = {
            ...chat,
            messages: newMessages,
        }
        updatedChats.push(newChatObj)
    })

    return updatedChats
}

export default reducer