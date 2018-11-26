import React, { Component } from 'react'
import Summary from '../../components/profile/summary/summary'
import defaultImg from '../../assets/img/defaultProfile.png'
import styles from './profile.module.css'
import Contact from '../../components/profile/contact/contact'
import Aptitude from '../../components/profile/aptitude/aptitude'
import WorkingZone from '../../components/profile/workingZone/workingZone'
import Panel from '../../components/UI/Panel/Panel'

class Profile extends Component {
    description = "Realizamos: Interiores y frentes de placards Muebles para LCD y Led Alacenas y Bajo mesadas Vanitorys Muebles para chicos Stands Muebles para oficinas Bibliotecas Mesas ratonas Muebles para Playrooms Respaldos y Mesas de luz Reposeras Pergolas y Decks\
    Y todo lo que necesites...siempre cumpliendo lo convenido, asesorándote para lograr el mejor aprovechamiento del espacio y entregando en los plazos acordados.\
    Visita nuestro sitio web: www.tocamaderamuebles.com.ar"

    render(){
        return <div>
            <Summary name="Bianca Matus" serviceTypes="Carpintero" rating={4.7} img={defaultImg}/>
            <div className={styles.MainContainer}>
                <div className={styles.Contact}>
                    <Contact
                    serviceTypesOptions={[{value:1,name:"Plomero"}]}

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
                        name="Carpintero"
                        description = {this.description}/>
                    </div>
                    <div>
                        <h3>Area de trabajo</h3>
                        <Panel>
                        <WorkingZone/>
                        </Panel>
                    </div>
                    
                </div>
            </div>
        </div>
    }
}

export default Profile