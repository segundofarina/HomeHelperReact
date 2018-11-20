import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Search from '../../components/Home/Search/Search'
import style from './Home.module.css'
import axios from 'axios'

class Home extends Component {

    state = {
        location: '',
        serviceType: '',
        serviceTypeOptions: []
    }

    /* Get service type options from api */
    async getServiceTypes () {
        try {
            const resp = await axios.get('/serviceTypes')
            const serviceTypeOptions = resp.data.serviceTypesList.map(st => {
                return {
                    value: st.id,
                    name: st.name,
                }
            })
            this.setState({serviceTypeOptions: serviceTypeOptions})
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        if(this.state.serviceTypeOptions.length === 0) {
            this.getServiceTypes()
        }
    }

    locationChangeHandler = (event) => {
        this.setState({location: event.target.value})
    }

    serviceTypeChangeHandler = (event) => {
        this.setState({serviceType: event.target.value})
    }

    onSubmitSearchHandler = () => {
        this.props.history.push('/search')
    }

    render() {
        return (
            <div className={style.Container}>
                <div className={style.MainContent}>
                    <h1>Bienvendio a Home Helper!</h1>
                    <Search 
                        className={style.Search}
                        serviceTypeDefault={{value:'', name:'Please select a service type'}}
                        serviceTypeOptions={this.state.serviceTypeOptions}
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

export default withRouter(Home);