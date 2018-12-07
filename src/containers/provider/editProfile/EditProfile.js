import React, { Component } from 'react'
import styles from './EditProfile.module.css'
import { connect } from 'react-redux'
import * as userDataActions from '../../../store/actions/userDataActions'
import DescriptionEditor from '../../../components/EditProfile/DescriptionEditor/DescriptionEditor'
import AptitudeEditor from '../../../components/EditProfile/AptitudeEditor/AptitudeEditor'
import WorkingZone from '../../../components/EditProfile/WorkingZone/WorkingZone'
import * as providerProfileActions from '../../../store/actions/providerProfileActions'
import * as serviceTypeActions from '../../../store/actions/serviceTypesActions'
import * as apiStatus from '../../../store/apiStatus'
import Loading from '../../../components/Status/Loading/Loading'
import ConnectionError from '../../../components/Status/ConnectionError/ConnectionError'

class EditProfile extends Component {
    state = {
        addingAptitude: false,
    }

    componentWillMount() {
        if(!this.props.showingProvider) {
            this.props.setUsingProvider()
        }
    }

    componentDidMount() {
        if(this.props.status === apiStatus.API_STATUS_NONE) {
            this.props.providerInit(this.props.providerId)
        }
        if(this.props.stStatus === apiStatus.API_STATUS_NONE) {
            this.props.serviceTypesInit()
        }
    }

    addAptitude = () => {
        this.setState({addingAptitude: true})
    }

    handleNewAppointmentCancel = () => {
        this.setState({addingAptitude: false})
        console.log('aca')
    }

    render() {
        if(this.props.status === apiStatus.API_STATUS_LOADING || this.props.status === apiStatus.API_STATUS_NONE ||
            this.props.stStatus === apiStatus.API_STATUS_NONE || this.props.stStatus === apiStatus.API_STATUS_LOADING) {
            return (<Loading />)
        }

        if(this.props.status === apiStatus.API_STATUS_ERROR) {
            return (<ConnectionError reconnectHandler={this.props.providerInit(this.props.providerId)} />)
        }
        if(this.props.stStatus === apiStatus.API_STATUS_ERROR) {
            return (<ConnectionError reconnectHandler={this.props.serviceTypesInit} />)
        }

        const currentServiceTypes = []
        this.props.provider.aptitudes.forEach(aptitude => {
            currentServiceTypes.push(aptitude.serviceType.id)
        })
        const remainingServiceTypes = this.props.serviceTypes.filter(st => !currentServiceTypes.includes(st.value))
        const deletableAptitude = this.props.provider.aptitudes.length > 1

        const aptitudes = this.props.provider.aptitudes.map(aptitude => {
            const posibleServiceTypes = [...remainingServiceTypes, {value: aptitude.serviceType.id, name: aptitude.serviceType.name}]
            return (
                <AptitudeEditor description={aptitude.description}
                                posibleServiceTypes={posibleServiceTypes}
                                serviceType={aptitude.serviceType}
                                key={aptitude.serviceType.id}
                                deletable={deletableAptitude} />
            )
        })

        let newAptitude = null
        if(this.state.addingAptitude) {
            newAptitude = (
                <AptitudeEditor description=''
                                posibleServiceTypes={remainingServiceTypes}
                                serviceType={{value: null, name: ''}}
                                new
                                onCancel={this.handleNewAppointmentCancel} />
            )
        }

        return (
            <div className={styles.EditProfile}>
                <div className={styles.Content}>
                    <h2>Profile</h2>
                    <DescriptionEditor description={this.props.provider.description} />
                    <div className={styles.AptitudesTitle}>
                        <h3>Aptitudes</h3>
                        {remainingServiceTypes.length > 0 && <div className={styles.AddAptitudeBtn} onClick={this.addAptitude}>New Aptitude</div>}
                    </div>
                    {newAptitude}
                    {aptitudes}
                    <WorkingZone />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showingProvider: state.userData.showingProvider,
        provider: state.providerProfile.provider,
        status: state.providerProfile.status,
        providerId: state.userData.userData.id,
        stStatus: state.serviceTypes.status,
        serviceTypes: state.serviceTypes.serviceTypesOptions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUsingProvider: () => dispatch(userDataActions.updateUsingProvider(true)),
        providerInit: (id) => dispatch(providerProfileActions.providerProfileInit(id)),
        serviceTypesInit: () => dispatch(serviceTypeActions.serviceTypesInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)