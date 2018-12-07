import React, { Component } from 'react'
import styles from './AptitudeEditor.module.css'
import Panel from '../../UI/Panel/Panel'
import Autocomplete from 'react-autocomplete'
import FormValidator from '../../../FormValidator/FormValidator'
import axios from 'axios'

class AptitudeEditor extends Component {

    /* Form validation */
    validator = new FormValidator([
        {
            field: 'text',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please fill a description'
        },{
            field: 'serviceType',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please fill a service type'
        }
    ])

    submitted = false

    state = {
        text: this.props.description,
        prevText: this.props.description,
        serviceType: this.props.serviceType,
        prevServiceType: this.props.serviceType,
        newServiceType: this.props.serviceType.name,
        isEditing: this.props.new,
        loading: false,
        aptitudeId: this.props.id,
        error: false,
        validation: this.validator.valid(),
    }

    handleEditClick = () => {
        this.setState({isEditing: true})
    }

    handleCancelClick = () => {
        this.setState({
            text: this.state.prevText,
            serviceType: this.state.prevServiceType,
            newServiceType: this.state.prevServiceType.name,
            isEditing: false,
        })
        if(this.props.new && this.props.onCancel) {
            this.props.onCancel()
        }
    }

    handleSaveClick = async () => {
        console.log(this.state.serviceType.name)
        const validation = this.validator.validate({
            text: this.state.text,
            serviceType: `${this.state.serviceType.name}`,
            validation: this.state.validation,
        })

        this.setState({validation})
        this.submitted = true
        if(validation.isValid) {
            this.setState({
                prevText: this.state.text,
                isEditing: false,
                prevServiceType: this.state.serviceType,
                newServiceType: this.state.serviceType.name,
                loading: true,
            })
        //post to the api
        try {
            const response = await axios.put(`/providers/${this.props.providerId}`,{
                aptitudes: [
                    {
                        id: this.props.id,
                        description: this.state.text,
                        serviceType: {
                            id: this.state.serviceType.value,
                            name: this.state.serviceType.name,
                        }
                    }
                ]
            })
            this.props.onAptitudeSave()
        } catch (error) {
            console.log('error')
            this.setState({error: true})
        }
        /* On success */
        }
    }

    handleDeleteClick = () => {
        this.setState({loading: true})
        //post to the api
        // data is prevServiceType and prevText
        try {
            const response = await axios.delete(`/providers/${this.props.providerId}`,{
                aptitudes: [
                    {
                        id: this.props.id,
                        description: this.state.text,
                        serviceType: {
                            id: this.state.serviceType.value,
                            name: this.state.serviceType.name,
                        }
                    }
                ]
            })
            this.props.onAptitudeSave()
        } catch (error) {
            console.log('error')
            this.setState({error: true})
        }

    }

    textChangeHandler = (event) => {
        this.setState({text: event.target.value})
    }

    serviceTypeChangeHandler = (e) => {
        this.setState({newServiceType: e.target.value})
    }

    serviceTypeSelectHandler = (val, item) => {
        if(item) {
            this.setState({
                serviceType: item,
                newServiceType: item.name,
            })
        }
    }

    render() {
        let validation = this.submitted ?              
                        this.validator.validate({
                            text: this.state.text,
                            serviceType: `${this.state.serviceType.value}`,
                            validation: this.state.validation,
                        }) : this.state.validation  

        let editorElem = (
            <p>{this.state.text}</p>
        )
        let actionsBtns = (
            <div className={styles.EditDescriptionBtn} onClick={this.handleEditClick}>Edit</div>
        )

        let title = (
            <h4>{this.state.serviceType.name}</h4>
        )
        if(this.state.isEditing) {
            editorElem = (
                <div>
                    <textarea placeholder='Write your aptitude description...'
                                onChange={this.textChangeHandler} value={this.state.text}>
                    </textarea>
                    <div className={styles.ValidationMsg}>{validation.text.message}</div> 
                </div>
            )

            actionsBtns = (
                <div className={styles.ActionBtns}>
                    {!this.props.new && this.props.deletable && <div className={styles.DeleteBtn} onClick={this.handleDeleteClick}>Delete</div>}
                    <div className={styles.CancelDescriptionBtn} onClick={this.handleCancelClick}>Cancel</div>
                    <div className={styles.SaveDescriptionBtn} onClick={this.handleSaveClick}>Save</div>
                </div>
            )

            title = (
                <div className={styles.ServiceTypeEditTitle}>
                    <h5>Service type:</h5>
                    <Autocomplete 
                        getItemValue={(item) => item.name}
                        items={this.props.posibleServiceTypes.filter(item => item.name.toLowerCase().startsWith(this.state.newServiceType.toLowerCase()))}
                        renderItem={(item, isHighlighted) => {
                            const itemStyles = [styles.AutocompleteItem]
                            if(isHighlighted) {
                                itemStyles.push(styles.IsHighlighted)
                            }
                            return (
                                <div className={itemStyles.join(' ')} key={item.value}>
                                    {item.name}
                                </div>
                            )
                        }}
                        value={this.state.newServiceType}
                        onChange={this.serviceTypeChangeHandler}
                        onSelect={this.serviceTypeSelectHandler}
                        inputProps={{className: styles.AutocompleteInput}}
                    />
                    <div className={styles.ValidationMsg}>{validation.serviceType.message}</div> 
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
            <div className={styles.AptitudeEditor}>
                <div className={styles.Title}>
                    {title}
                    {actionsBtns}
                </div>
                <Panel className={styles.Panel}>
                    {editorElem}
                </Panel>
            </div>
        )
    }
}

export default AptitudeEditor