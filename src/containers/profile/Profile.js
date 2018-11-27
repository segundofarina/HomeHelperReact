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

class Profile extends Component {


    state = {
        showingOtherApitutdes : false,
        showReviews: false
    }

    showReviewsHandler = ()=>{
        this.setState({showReviews : true})
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
                name={aptitude.name}
                description = {aptitude.description}/>)
        })
        
        return(<div>
        <div onClick={this.toggleClick} className={styles.ShowMore}>
            <h4>{this.state.showingOtherApitutdes ? hide : show}</h4>
            <FontAwesomeIcon icon={faAngleDown}/>
        </div>
        {this.state.showingOtherApitutdes? results:null}
        </div>

        )}

    render(){
        console.log(this.props.searchResults)
        const description = "Realizamos: Interiores y frentes de placards Muebles para LCD y Led Alacenas y Bajo mesadas Vanitorys Muebles para chicos Stands Muebles para oficinas Bibliotecas Mesas ratonas Muebles para Playrooms Respaldos y Mesas de luz Reposeras Pergolas y Decks Y todo lo que necesites...siempre cumpliendo lo convenido, asesorándote para lograr el mejor aprovechamiento del espacio y entregando en los plazos acordados. Visita nuestro sitio web: www.tocamaderamuebles.com.ar"
    
        const coordenates = [{lat: -34.557176, lng: -58.430436},
            {lat: -34.575376, lng: -58.403839},
            {lat: -34.588696, lng: -58.431428}];

        const aptitudes = [{name : "Carpintero", description: description },
                            {name : "Mecanico", description: description },
                            {name: "Electricista", description: description}]

        return (<div className={this.state.showReviews ? styles.Overflow : null}>
            <Summary name="Bianca Matus" serviceTypes="Carpintero" rating={4.7} img={defaultImg}/>
            <div className={styles.MainContainer}>
                <div className={styles.Contact}>
                    <Contact
                    serviceTypesOptions={[{value:1,name:"Plomero"}]}
                    providerName = {"Bianca Matus"}

                    />
                </div>
                <div className={styles.Content}>
                    <div className ={styles.GeneralDescription}>
                        <p>
                            Diseñamos y Fabricamos todo tipo de muebles a medida para hogares y proyectos comerciales.
                            Trabajamos con todo tipo de materiales y adaptamos el presupuesto a cada necesidad.
                        </p>
                    </div>
                    <div >
                        <Aptitude
                        name={aptitudes[0].name}
                        description = {aptitudes[0].description}
                        showReviews = {this.state.showReviews}
                        showMoreReviewsClick = {this.showReviewsHandler}
                        closeReviewsClick = {this.closeReviewsHandler}
                        />
                        
                        {aptitudes.length>1 ? this.showMoreAptitudes(aptitudes): null}
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
        profile: state.profile,
        searchResults: state.searchResults,
    }
}


export default connect(mapStateToProp)(Profile) 