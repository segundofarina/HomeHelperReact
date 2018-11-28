import React, { Component } from 'react'
import Summary from '../../components/profile/summary/summary'
import defaultImg from '../../assets/img/defaultProfile.png'
import styles from './profile.module.css'
import Contact from '../../components/profile/contact/contact'
import Aptitude from '../../components/profile/aptitude/aptitude'
import WorkingZone from '../../components/profile/workingZone/workingZone'
import Panel from '../../components/UI/Panel/Panel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import * as ProfileActions from '../../store/actions/profileActions'
import * as apiStatus from '../../store/apiStatus'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'


class Profile extends Component {


    state = {
        showingOtherApitutdes : false,
        showReviews: false,
        idShowing: null,
        loading: true, 
        error: false,
    }

    showReviewsHandler = (id)=>{
        this.setState({
            showReviews : true,
            idShowing: id,
        })

    }

    closeReviewsHandler = ()=>{
        this.setState({showReviews : false})
    }

    toggleClick = ()=>{
        this.setState({showingOtherApitutdes: !this.state.showingOtherApitutdes})
    }

    showMoreAptitudes = (aptitudes)=>{
        const show = "Mostrar otras aptitudes"
        const hide = "Ocultar otras aptitudes"
        let results = aptitudes.filter((aptitude,index)=> {return index>0}).map(aptitude => {
            return(<Aptitude
                {...aptitude}
                showReviesId= {this.state.idShowing}
                showReviews = {this.state.showReviews}
                showMoreReviewsClick = {this.showReviewsHandler.bind(this,aptitude.id)}
                closeReviewsClick = {this.closeReviewsHandler}
                key = {aptitude.id}
                />)
        })
        
        return(<div>
        <div onClick={this.toggleClick} className={styles.ShowMore}>
            <h4>{this.state.showingOtherApitutdes ? hide : show}</h4>
            <FontAwesomeIcon icon={faAngleDown}/>
        </div>
        {this.state.showingOtherApitutdes? results:null}
        </div>

        )}

    componentDidMount (){
        const queries = queryString.parse(this.props.location.search)
        if(!queries.id){
            this.setState({
                error:true,
                loading:false
            })
            return
        }
        const provider = this.props.providers.filter(provider => provider.id === parseInt(queries.id))
        if(provider[0]){
            this.props.updateProfile(provider[0])
            
        }else{
            this.props.profileInit(queries.id)
        }

        this.setState({loading:false})

        
       

    }



    render(){
        if(this.state.loading || this.props.apiStatus === apiStatus.API_STATUS_LOADING){
            return (<div>Loading ...</div>)
        }
        if(this.state.error ){
            return(<div>BAD REQUEST</div>)
        }
        if(this.props.apiStatus === apiStatus.API_STATUS_ERROR){
            return (<div>ERROR</div>)
        }
        const coordenates = [{lat: -34.557176, lng: -58.430436},
            {lat: -34.575376, lng: -58.403839},
            {lat: -34.588696, lng: -58.431428}];


        const provider = this.props.provider
        const serviceTypes = provider.aptitudes.map(apt => {
            return apt.serviceType.name
        })
        const serviceTypesOptions = provider.aptitudes.map(apt => {
            return {value:apt.serviceType.name , name:apt.serviceType.name}
        })

        return (<div className={this.state.showReviews ? styles.Overflow : null}>
            <Summary name={`${provider.firstName} ${provider.lastName}`} serviceTypes={serviceTypes.join(", ")} rating={provider.generalCalification} img={defaultImg}/>
            <div className={styles.MainContainer}>
                <div className={styles.Contact}>
                    <Contact
                    serviceTypesOptions={serviceTypesOptions}
                    providerName = {provider.firstName}

                    />
                </div>
                <div className={styles.Content}>
                    <div className ={styles.GeneralDescription}>
                        <p>
                            {provider.description}
                        </p>
                    </div>
                    <div >
                        <Aptitude
                        {...provider.aptitudes[0]}
                        showReviews = {this.state.showReviews}
                        showReviesId= {this.state.idShowing}
                        showMoreReviewsClick = {this.showReviewsHandler.bind(this,provider.aptitudes[0].id)}
                        closeReviewsClick = {this.closeReviewsHandler}
                        key = {provider.aptitudes[0].id}
                        />
                        
                        {provider.aptitudes.length>1 ? this.showMoreAptitudes(provider.aptitudes): null}
                    </div>
                    <div>
                        <h3>Area de trabajo</h3>
                        <Panel>
                            <WorkingZone
                                coordenates={coordenates}
                            />
                        </Panel>
                    </div>
                    
                </div>
            </div>
        </div>
        )}
}

const mapStateToProp = (state) =>{
    return {
        provider: state.profile.provider,
        providers: state.searchResults.providers,
        apiStatus: state.profile.status,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (provider) =>dispatch(ProfileActions.updateProfile(provider)),
        profileInit: (id) => dispatch(ProfileActions.profileInit(id))
    }
}



export default connect(mapStateToProp,mapDispatchToProps)(withRouter(Profile)) 