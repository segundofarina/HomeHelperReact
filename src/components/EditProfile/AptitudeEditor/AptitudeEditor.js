import React, { Component } from 'react'
import styles from './AptitudeEditor.module.css'
import Panel from '../../UI/Panel/Panel'
import Autocomplete from 'react-autocomplete'

class AptitudeEditor extends Component {
    state = {
        text: this.props.description,
        prevText: this.props.description,
        serviceType: this.props.serviceType,
        prevServiceType: this.props.serviceType,
        newServiceType: this.props.serviceType.name,
        isEditing: this.props.new,
        loading: false,
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

    handleSaveClick = () => {
        this.setState({
            prevText: this.state.text,
            isEditing: false,
            prevServiceType: this.state.serviceType,
            newServiceType: this.state.serviceType.name,
            loading: true,
        })
        //post to the api

        /* On success */
        //this.props.onAptitudeSave()
    }

    handleDeleteClick = () => {
        this.setState({loading: true})
        //post to the api
        // data is prevServiceType and prevText

        /* On success */
        this.props.onAptitudeSave()
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
                <textarea placeholder='Write your aptitude description...'
                            onChange={this.textChangeHandler} value={this.state.text}>
                </textarea>
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