import React, { Component } from 'react'
import styles from './Chat.module.css'
import ContactProfile from './ContactProfile/ContactProfile'
import MessagesBox from './MessagesBox/MessagesBox'
import MsgInput from './MsgInput/MsgInput'

class Chat extends Component {
    state = {
        newMsg: '',
    }

    msgInputRef = React.createRef()

    componentDidMount () {
        this.msgInputRef.current.focus()
    }

    msgChangeHandler = (event) => {
        this.setState({newMsg: event.target.value})
    }

    sendBtnHandler = () => {
        console.log('sending:' + this.state.newMsg)
        this.setState({newMsg: ''})
    }

    render () {
        return (
            <div className={styles.Chat}>
                <ContactProfile name="Martin Victory" />
                <MessagesBox />
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