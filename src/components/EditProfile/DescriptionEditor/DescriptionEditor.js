import React, { Component } from 'react'
import styles from './DescriptionEditor.module.css'
import Panel from '../../UI/Panel/Panel'
import axios from 'axios'
import FormValidator from '../../../FormValidator/FormValidator'

class DescriptionEditor extends Component {

    /* Form validation */
    validator = new FormValidator([
        {
            field: 'text',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please fill a description'
        }
    ])

    submitted = false

    state = {
        text: this.props.description,
        prevText: this.props.description,
        isEditing: false,
        loading: false,
        error: false,
        validation: this.validator.valid(),
    }

    handleEditClick = () => {
        this.setState({isEditing: true})
    }

    handleCancelClick = () => {
        this.setState({text: this.state.prevText, isEditing: false})
    }

    handleSaveClick = async () => {
        const validation = this.validator.validate({
            text: this.state.text,
            validation: this.state.validation,
        })

        this.setState({validation})
        this.submitted = true
        if(validation.isValid) {
            //post to the api
            this.setState({prevText: this.state.text, isEditing: false, loading: true})
            try {
                const response = await axios.put(`/providers/${this.props.providerId}`,{
                    description: this.state.text,
                })
                if(response.status === 200) {
                    this.setState({loading: false})
                }
            } catch(error) {
                console.log(error)
                this.setState({error: true})
            }
        }
    }

    textChangeHandler = (event) => {
        this.setState({text: event.target.value})
    }

    render () {

        let validation = this.submitted ?              
                        this.validator.validate({
                            text: this.state.text,
                            validation: this.state.validation,
                        }) : this.state.validation  


        let editorElem = (
            <p>{this.state.text}</p>
        )
        let actionsBtns = (
            <div className={styles.EditDescriptionBtn} onClick={this.handleEditClick}>Edit</div>
        )
        if(this.state.isEditing) {
            editorElem = (
                <div>
                    <textarea placeholder='Write your provider description...'
                                onChange={this.textChangeHandler} value={this.state.text}>
                    </textarea>
                    <div className={styles.ValidationMsg}>{validation.text.message}</div> 
                </div>
            )

            actionsBtns = (
                <div className={styles.ActionBtns}>
                    <div className={styles.CancelDescriptionBtn} onClick={this.handleCancelClick}>Cancel</div>
                    <div className={styles.SaveDescriptionBtn} onClick={this.handleSaveClick}>Save</div>
                </div>
            )
        }

        if(this.state.loading) {
            actionsBtns = (
                <div className={styles.ActionsLoading}>
                    <div className={styles.Bounce1}></div>
                    <div className={styles.Bounce2}></div>
                    <div className={styles.Bounce3}></div>
                </div>
            )
        }

        if(this.state.error) {
            actionsBtns = (
                <div className={styles.ActionBtns}>
                    <p className={styles.ApiError}>Error while connecting to the server</p>
                    <div className={styles.SaveDescriptionBtn} onClick={this.handleSaveClick}>Try again</div>
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