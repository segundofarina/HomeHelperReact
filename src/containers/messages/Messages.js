import React, { Component } from 'react'
import styles from './Messages.module.css'
import SockJsClient from 'react-stomp'
import { connect } from 'react-redux'
import ContactList from '../../components/Messages/ContactList/ContactList'
import Chat from '../../components/Messages/Chat/Chat'
import * as chatActions from '../../store/actions/chatActions'

class Messages extends Component {

    websocketRef = React.createRef()
    token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aW5jaG92aWN0b3J5IiwianRpIjoiMSJ9.5jxlU2uCoV_xWl9IAL-CDPJePYUSmXe-CNlPifNUBU5b4guDWJT6eHCMKuXUdZp6AEQ4Tc0BQ-e6Hjg4DSiMXg'

    handleContactClick = (chatId) => {
        this.props.currentChatUpdate(chatId)
    }

    handleRecvMsg = (msg) => {
        console.log('recv: ')
        console.log(msg)
        this.props.chatRecvMsg(msg.username, msg.text)
    }

    handleSendMsg = (msg) => {
        this.websocketRef.current.sendMessage('/app/messages', JSON.stringify(msg), {'X-Authorization' : this.token})
    }

    render () {
        const currentChat = this.props.chats.filter((chat) => {
            return chat.chatId === this.props.currentChat
        })
        let currentChatMessages = []
        let currentContactName = ''
        let currentToUsername = ''
        if(currentChat[0]) {
            currentChatMessages = currentChat[0].messages
            currentContactName = currentChat[0].toName
            currentToUsername = currentChat[0].toUsername
        }

        const contacts = this.props.chats.map(chat => {
            const msg = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : ''
            return {
                id: chat.chatId,
                name: chat.toName,
                msg: msg,
            }
        })

        return (
            <div className={styles.Container}>
                <SockJsClient url='http://localhost:8080/websocket'
                                ref={this.websocketRef}
                                topics={['/user/queue/messages']}
                                onMessage={this.handleRecvMsg}
                                headers={{'X-Authorization' : this.token}}
                                subscribeHeaders={{'X-Authorization' : this.token}}
                                autoReconnect />
                <ContactList contacts={contacts} handleContactClick={this.handleContactClick} activeChat={this.props.currentChat} />
                <Chat websocketSendHandler={this.handleSendMsg}
                        chatMessages={currentChatMessages}
                        username={currentToUsername}
                        contactName={currentContactName} />
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        currentChat: state.chat.currentChat,
        chats: state.chat.chats,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        currentChatUpdate: (chatId) => dispatch(chatActions.currentChatUpdate(chatId)),
        chatRecvMsg: (username, msg) => dispatch(chatActions.chatRecvMsg(username, msg)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)