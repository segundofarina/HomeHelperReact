import React, { Component } from 'react'
import styles from './Review.module.css'
import AppointmentDetails from '../../components/Review/AppointmentDetails/AppointmentDetails'
import WriteReview from '../../components/Review/WriteReview/WriteReview'

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
                    <WriteReview />
                </div>
            </div>
        )   
    }
}

export default Review