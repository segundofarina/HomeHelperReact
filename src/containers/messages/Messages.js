import React, { Component, Fragment } from 'react'
import styles from './Messages.module.css'
import SockJsClient from 'react-stomp'
import { connect } from 'react-redux'
import ContactList from '../../components/Messages/ContactList/ContactList'
import Chat from '../../components/Messages/Chat/Chat'
import Status from '../../components/Messages/Status/Status'
import SelectChatMsg from '../../components/Messages/SelectChatMsg/SelectChatMsg'
import * as chatActions from '../../store/actions/chatActions'
import * as apiStatus from '../../store/apiStatus'

class Messages extends Component {
    state = {
        socketConnected: true,
    }

    websocketRef = React.createRef()
    token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aW5jaG92aWN0b3J5IiwianRpIjoiMSJ9.5jxlU2uCoV_xWl9IAL-CDPJePYUSmXe-CNlPifNUBU5b4guDWJT6eHCMKuXUdZp6AEQ4Tc0BQ-e6Hjg4DSiMXg'

    componentDidMount() {
        if(this.props.status === apiStatus.API_STATUS_NONE) {
            this.props.chatInit()
        }
    }

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

    handleSocketConnect = () => {
        if(!this.state.socketConnected) {
            this.setState({socketConnected: true})
        }
    }

    handleSocketDisconnect = () => {
        if(this.state.socketConnected) {
            this.setState({socketConnected: false})
            this.props.chatUpdateIsNewMsg()
        }
    }

    reconnectHandler = () => {
        this.props.chatInit()
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

        let sideElem = (<SelectChatMsg />)
        if(this.props.currentChat !== null) {
            sideElem = (
                <Chat websocketSendHandler={this.handleSendMsg}
                        chatMessages={currentChatMessages}
                        username={currentToUsername}
                        contactName={currentContactName} />
            )
        }

        let element = (<Status text='Loading...' type='loading' />)
        if(this.props.status === apiStatus.API_STATUS_ERROR) {
            element = (<Status text='Error while connecting to the server' type='error' reconnectHandler={this.reconnectHandler} />)
        }
        if(this.props.status === apiStatus.API_STATUS_DONE) {
            if(this.props.chats.length === 0) {
                element = (<Status text="You don't have any messages yet..." type='empty' />)
            } else if(!this.state.socketConnected) {
                element = (<Status text='Lost connection to the server. Trying to reconnect...' type='loading' />)
            } else {
                element = (
                    <Fragment>
                        <SockJsClient url="http://localhost:8080/websocket" 
                                    ref={this.websocketRef} 
                                    topics={["/user/queue/messages"]} 
                                    onMessage={this.handleRecvMsg} 
                                    headers={{ "X-Authorization": this.token }} 
                                    subscribeHeaders={{ "X-Authorization": this.token}}
                                    autoReconnect
                                    onConnect={this.handleSocketConnect}
                                    onDisconnect={this.handleSocketDisconnect} />
                        <ContactList contacts={contacts} 
                                    handleContactClick={this.handleContactClick} 
                                    activeChat={this.props.currentChat} />
                        {sideElem}
                   </Fragment>
                )
            }
        }

        return (
            <div className={styles.Container}>
                {element}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentChat: state.chat.currentChat,
        chats: state.chat.chats,
        status: state.chat.status,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        currentChatUpdate: (chatId) => dispatch(chatActions.currentChatUpdate(chatId)),
        chatRecvMsg: (username, msg) => dispatch(chatActions.chatRecvMsg(username, msg)),
        chatInit: () => dispatch(chatActions.chatInit()),
        chatUpdateIsNewMsg: () => dispatch(chatActions.chatUpdateIsNewMsg()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)