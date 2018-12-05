import React, { Component } from 'react'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Panel from '../../UI/Panel/Panel'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as serviceTypesActions from '../../../store/actions/serviceTypesActions'
import * as searchDataActions from '../../../store/actions/searchDataActions'
import * as searchResultsActions from '../../../store/actions/searchResultsActions'
import GoogleAutocomplete from './GoogleAutocomplete/GoogleAutocomplete'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class Search extends Component {

    state = {
        location: this.props.keepMemory ? this.props.searchData.location : '',
        serviceType: this.props.keepMemory ? this.props.searchData.serviceType : '',
        coords: {
            lat: '',
            lng: '',
        },
    }

    componentDidMount() {
        if(this.props.serviceTypesOptions.length === 0) {
            /* Fetch service types options only the first time */
            this.props.serviceTypesInit()
        }
    }

    locationChangeHandler = (value) => {
        this.setState({location: value})
    }

    locationSelectHandler = (address, placeId) => {
        if(placeId) {
            console.log(address)
        }
        this.setState({location: address})
        this.getLatLng(address)
    }

    getLatLng = async (address) => {
        try {
            const geoCode = await geocodeByAddress(address)
            const latLng = await getLatLng(geoCode[0])
            this.setState({coords: {
                lat: latLng.lat,
                lng: latLng.lng,
            }})
        } catch(error) {
            console.log('Error')
            console.log(error)
        }
    }

    googleErrorHandler = (status, clearSuggestions) => {
        console.log('Error')
    }

    serviceTypeChangeHandler = (event) => {
        this.setState({serviceType: event.target.value})
    }

    onSubmitSearchHandler = () => {
        /* Validate form fields */
        this.props.searchDataUpdate(this.state.location, this.state.serviceType, this.state.coords)
        this.props.searchResultsUpdate(this.state.serviceType, this.state.coords)
        this.props.history.push(`/search?st=${this.state.serviceType}&lat=${this.state.coords.lat}&lng=${this.state.coords.lng}&addr=${btoa(this.state.location)}`)
    }

    render () {
        const defaultValue = {
            value: '',
            name: 'Select a service type',
        }

        return (
            <Panel className={this.props.className}>
                <GoogleAutocomplete value={this.state.location}
                                    onChange={this.locationChangeHandler}
                                    onSelect={this.locationSelectHandler}
                                    onError={this.googleErrorHandler} />
                <Input inputType="select"
                    label="Tipo de servicio"
                    value={this.state.serviceType}
                    onChange={this.serviceTypeChangeHandler}
                    defaultValue={defaultValue}
                    options={this.props.serviceTypesOptions} />
                <Button onClick={this.onSubmitSearchHandler}>
                    Buscar
                </Button>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        serviceTypesOptions: state.serviceTypes.serviceTypesOptions,
        searchData: state.searchData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        serviceTypesInit: () => dispatch(serviceTypesActions.serviceTypesInit()),
        searchDataUpdate: (location, serviceType, coords) => dispatch(searchDataActions.searchDataUpdate(location, serviceType, coords)),
        searchResultsUpdate: (serviceType, coords) => dispatch(searchResultsActions.searchResultsUpdate(serviceType, coords)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search))