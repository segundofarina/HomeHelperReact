import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Search from '../../components/Home/Search/Search'
import style from './Home.module.css'
import { connect } from 'react-redux'
import * as serviceTypesActions from '../../store/actions/serviceTypesActions'

class Home extends Component {

    state = {
        location: '',
        serviceType: '',
    }

    componentDidMount() {
        if(this.props.serviceTypesOptions.length === 0) {
            /* Fetch service types options only the first time */
            this.props.serviceTypesInit()
        }
    }

    locationChangeHandler = (event) => {
        this.setState({location: event.target.value})
    }

    serviceTypeChangeHandler = (event) => {
        this.setState({serviceType: event.target.value})
    }

    onSubmitSearchHandler = () => {
        /* Validate form fields */
        this.props.history.push('/search')
    }

    render() {
        return (
            <div className={style.Container}>
                <div className={style.MainContent}>
                    <h1>Bienvenido a Home Helper!</h1>
                    <Search 
                        className={style.Search}
                        serviceTypeDefault={{value:'', name:'Please select a service type'}}
                        serviceTypeOptions={this.props.serviceTypesOptions}
                        onLocationChange={this.locationChangeHandler}
                        onServiceTypeChange={this.serviceTypeChangeHandler}
                        locationValue={this.state.location}
                        serviceTypeValue={this.state.serviceType}
                        onSubmitSearch={this.onSubmitSearchHandler} />
                </div>
                <div className={style.Background}></div>
            </div>
       )
    }
}

const mapStateToProps = state => {
    return {
        serviceTypesOptions: state.serviceTypes.serviceTypesOptions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        serviceTypesInit: () => dispatch(serviceTypesActions.serviceTypesInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));