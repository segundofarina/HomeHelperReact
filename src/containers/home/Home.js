import React, {Component} from 'react'
import Search from '../../components/Home/Search/Search'
import style from './Home.module.css'
import axios from 'axios'

class Home extends Component {

    state = {
        location: '',
        serviceType: '',
        serviceTypeOptions: []
        /*serviceTypeOptions: [
            {
                value: 'pintor',
                name: 'Pintor',
            },
            {
                value: 'electricista',
                name: 'Electricista',
            },
        ],*/
    }

    /* Get service type options from api */
    async getServiceTypes () {
        try {
            const resp = await axios.get('/serviceTypes')
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getServiceTypes()
    }

    locationChangeHandler = (event) => {
        this.setState({location: event.target.value})
    }

    serviceTypeChangeHandler = (event) => {
        this.setState({serviceType: event.target.value})
    }

    onSubmitSearchHandler = () => {
        console.log('Submit')
        console.log(this.state)
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

export default Home;