import React, { Component } from 'react'
import styles from './Appointments.module.css'
import AppointmentTable from '../../components/Appointments/AppointmentTable/AppointmentTable'
import defaultImg from '../../assets/img/defaultProfile.png'

class Appointments extends Component {

    render () {
        const pendingColumnsHeaders = [null, 'Service Type', 'Name', 'Date', 'Status']
        const pendingRows = [{
            id: 1,
            columns: [
                (<img src={defaultImg} alt="" className={styles.ProfilePicture} />),
                'Carpintero',
                'Bianca',
                '29/11/2018',
                {type: 'warning', value: 'Pending'}
            ],
        },{
            id: 2,
            columns: [
                (<img src={defaultImg} alt="" className={styles.ProfilePicture} />),
                'Carpintero',
                'Bianca',
                '29/11/2018',
                {type: 'warning', value: 'Pending'}
        ],
        }]

        const doneColumnsHeaders = [null, 'Service Type', 'Name', 'Date', 'Status', null]
        const doneRows = [{
            id: 3,
            columns: [
                (<img src={defaultImg} alt="" className={styles.ProfilePicture} />),
                'Carpintero',
                'Bianca',
                '29/11/2018',
                {type: 'success', value: 'Done'},
                null
            ],
        },{
            id: 4,
            columns: [
                (<img src={defaultImg} alt="" className={styles.ProfilePicture} />),
                'Carpintero',
                'Bianca',
                '29/11/2018',
                {type: 'success', value: 'Done'},
                null
        ],
        }]

        return (
            <div className={styles.Appointments}>
                <AppointmentTable className={styles.Content}
                                    title="Pending Appointments"
                                    headers={pendingColumnsHeaders}
                                    rows={pendingRows} />
                <AppointmentTable className={styles.Content}
                                    title="Completed Appointments"
                                    headers={doneColumnsHeaders}
                                    rows={doneRows} />
            </div>
        )
    }
}

export default Appointments