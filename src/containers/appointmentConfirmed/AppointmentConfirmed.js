import React, { Component } from 'react'
import styles from './AppointmentConfirmed.module.css'
import AppointmentDetails from '../../components/Review/AppointmentDetails/AppointmentDetails'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as apiStatus from '../../store/apiStatus'
import Loading from '../../components/Status/Loading/Loading'
import ConnectionError from '../../components/Status/ConnectionError/ConnectionError'

class AppointmentsConfirmed extends Component {

    componentWillMount() {
        if(this.props.apiStatus === apiStatus.API_STATUS_NONE) {
            this.props.history.replace('/appointments')
        }
    }

    handleBtnClick = () => {
        this.props.history.replace('/appointments')
    }

    render () {
        if(this.props.apiStatus === apiStatus.API_STATUS_NONE || this.props.apiStatus === apiStatus.API_STATUS_LOADING) {
            return (<Loading />)
        }

        if(this.props.apiStatus === apiStatus.API_STATUS_ERROR) {
            return (<ConnectionError />)
        }

        return (
            <div className={styles.AppointmentsConfirmed}>
                <div className={styles.Container}>
                    <h3>Appointment Confirmed</h3>
                    <AppointmentDetails panelStyles={styles.Panel}
                                        name={`${this.props.provider.firstName} ${this.props.provider.lastName}`}
                                        calification={this.props.provider.score}
                                        serviceType={this.props.serviceType}
                                        date={this.props.date}
                                        description={this.props.description}
                                        img={this.props.provider.pictureUrl} />
                    <Button className={styles.Button}
                            onClick={this.handleBtnClick}>
                            Go to appointments
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        provider: state.contact.provider, //has imgUrl
        serviceType: state.contact.serviceType,
        date: state.contact.date,
        description: state.contact.description,
        apiStatus: state.contact.apiStatus,
    }
}

export default connect(mapStateToProps)(withRouter(AppointmentsConfirmed))