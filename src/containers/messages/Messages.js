import React, { Component } from 'react'
import styles from './Messages.module.css'
import ContactList from '../../components/Messages/ContactList/ContactList'

class Messages extends Component {

    handleContactClick(contactId) {
        console.log(contactId)
    }

    render () {
        const contacts = [{id: 1, name: 'Martin1 Victory', msg: 'Mensaje'},
                            {id: 2, name: 'Martin2 Victory', msg: 'Mensaje'},
                            {id: 3, name: 'Martin3 Victory', msg: 'Mensaje'},
                            {id: 4, name: 'Martin4 Victory', msg: 'Mensaje'},
                            {id: 5, name: 'Martin5 Victory', msg: 'Mensaje'},
                            {id: 6, name: 'Martin6 Victory', msg: 'Mensaje'},
                            {id: 7, name: 'Martin7 Victory', msg: 'Mensaje'},
                            {id: 8, name: 'Martin8 Victory', msg: 'Mensaje'},
                            {id: 9, name: 'Martin9 Victory', msg: 'Mensaje'},
                            {id: 10, name: 'Martin10 Victory', msg: 'Mensaje'},
                            {id: 11, name: 'Martin11 Victory', msg: 'Mensaje'},
                            {id: 12, name: 'Martin12 Victory', msg: 'Mensaje'},]

        return (
            <div className={styles.Container}>
                <ContactList contacts={contacts} handleContactClick={this.handleContactClick} />
            </div>)
    }
}

export default Messages