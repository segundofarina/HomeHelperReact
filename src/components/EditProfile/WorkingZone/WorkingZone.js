import React, { Component } from 'react'
import styles from './WorkingZone.module.css'
import Panel from '../../UI/Panel/Panel'

class WorkingZone extends Component {
    state = {
        isEditing: false,
    }

    handleEditClick = () => {
        this.setState({isEditing: true})
    }

    handleCancelClick = () => {
        this.setState({isEditing: false})
    }

    handleSaveClick = () => {
        this.setState({isEditing: false})
        //post to the api
    }

    render () {
       let actionsBtns = (
            <div className={styles.EditDescriptionBtn} onClick={this.handleEditClick}>Edit</div>
        )
        if(this.state.isEditing) {
           actionsBtns = (
                <div className={styles.ActionBtns}>
                    <div className={styles.CancelDescriptionBtn} onClick={this.handleCancelClick}>Cancel</div>
                    <div className={styles.SaveDescriptionBtn} onClick={this.handleSaveClick}>Save</div>
                </div>
            )
        }

        return (
            <div className={styles.WorkingZoneEditor}>
                <div className={styles.Title}>
                    <h3 className={styles.WorkingZoneTitle}>Working Zone</h3>
                    {actionsBtns}
                </div>
                <Panel className={styles.Panel}>
                    Map
                </Panel>
            </div>
        )
    }
}

export default WorkingZone