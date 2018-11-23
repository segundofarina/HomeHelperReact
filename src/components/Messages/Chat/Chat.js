import React, { Component } from 'react'
import styles from './Chat.module.css'
import ContactProfile from './ContactProfile/ContactProfile'
import MessagesBox from './MessagesBox/MessagesBox'
import MsgInput from './MsgInput/MsgInput'

class Chat extends Component {
    state = {
        newMsg: '',
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
    }

    msgInputRef = React.createRef()
    msgBoxRef = React.createRef()

    componentDidMount () {
        this.msgInputRef.current.focus()
        this.scrollMsgBoxToBottom()
    }

    msgChangeHandler = (event) => {
        this.setState({newMsg: event.target.value})
    }

    scrollMsgBoxToBottom = () => {
        this.msgBoxRef.current.scrollTop = this.msgBoxRef.current.scrollHeight - 150
    }

    sendBtnHandler = () => {
        if(this.state.newMsg !== '') {
            this.scrollMsgBoxToBottom()

            /* Change to redux */
            this.setState((prevState) => {
                const newState = {...prevState}
                newState.messages.push({
                    id: prevState.messages.length,
                    from: 'mine',
                    text: prevState.newMsg,
                    isNewMsg: true,
                })
                return newState
            })

            /* Keep this to clean the input */
            this.setState({newMsg: ''})
        }
    }

    render () {
        return (
            <div className={styles.Chat}>
                <ContactProfile name="Martin Victory" />
                <MessagesBox messages={this.state.messages} ref={this.msgBoxRef} />
                <MsgInput msgValue={this.state.newMsg}
                    msgChangeHandler={this.msgChangeHandler}
                    sendBtnHandler={this.sendBtnHandler}
                    ref={this.msgInputRef}
                />
            </div>
        )
    }
}

export default Chat