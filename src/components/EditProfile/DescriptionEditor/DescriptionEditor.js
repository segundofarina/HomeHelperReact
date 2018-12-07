import React, { Component } from 'react'
import styles from './DescriptionEditor.module.css'
import Panel from '../../UI/Panel/Panel'

class DescriptionEditor extends Component {
    state = {
        text: this.props.description,
        prevText: this.props.description,
        isEditing: false,
    }

    handleEditClick = () => {
        this.setState({isEditing: true})
    }

    handleCancelClick = () => {
        this.setState({text: this.state.prevText, isEditing: false})
    }

    handleSaveClick = () => {
        this.setState({prevText: this.state.text, isEditing: false})
        //post to the api
    }

    textChangeHandler = (event) => {
        this.setState({text: event.target.value})
    }

    render () {
        let editorElem = (
            <p>{this.state.text}</p>
        )
        let actionsBtns = (
            <div className={styles.EditDescriptionBtn} onClick={this.handleEditClick}>Edit</div>
        )
        if(this.state.isEditing) {
            editorElem = (
                <textarea placeholder='Write your provider description...'
                            onChange={this.textChangeHandler} value={this.state.text}>
                </textarea>
            )

            actionsBtns = (
                <div className={styles.ActionBtns}>
                    <div className={styles.CancelDescriptionBtn} onClick={this.handleCancelClick}>Cancel</div>
                    <div className={styles.SaveDescriptionBtn} onClick={this.handleSaveClick}>Save</div>
                </div>
            )
        }

        return (
            <div className={styles.DescriptionEditor}>
                <div className={styles.Title}>
                    <h4>Description</h4>
                    {actionsBtns}
                </div>
                <Panel className={styles.Panel}>
                    {editorElem}
                </Panel>
            </div>
        )
    }
}

export default DescriptionEditor