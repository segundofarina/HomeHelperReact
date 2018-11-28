import React, { Component } from 'react'
import styles from './Review.module.css'
import Panel from '../../components/UI/Panel/Panel'
import AppointmentDetails from '../../components/Review/AppointmentDetails/AppointmentDetails'

class Review extends Component {

    render() {
        return (
            <div className={styles.Review}>
                <div className={styles.Container}>
                    <AppointmentDetails name="Martin Victory"
                                        serviceType='Carpintero'
                                        date='28/11/2018'
                                        description='Description'
                                        calification={3} />
                    <Panel className={styles.Panel}>
                        Review
                    </Panel>
                </div>
            </div>
        )   
    }
}

export default Review