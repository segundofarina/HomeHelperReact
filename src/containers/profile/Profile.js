import React, { Component } from 'react'
import Summary from '../../components/profile/summary/summary'
import defaultImg from '../../assets/img/defaultProfile.png'
import styles from './profile.module.css'
import Contact from '../../components/profile/contact/contact'

class Profile extends Component {
    render(){
        return <div>
            <Summary name="Bianca Matus" serviceTypes="Carpintero" rating={4.7} img={defaultImg}/>
            <div className={styles.MainContainer}>
                <div className={styles.Contact}>
                    <Contact/>
                </div>
                <div className={styles.Content}>
                    <div className ={styles.GeneralDescription}>
                        <p>
                            Diseñamos y Fabricamos todo tipo de muebles a medida para hogares y proyectos comerciales.
                            Trabajamos con todo tipo de materiales y adaptamos el presupuesto a cada necesidad.
                        </p>
                    </div>
                    <div >
                        {/* <Aptitude/> */}
                    </div>
                    <div>
                        {/* <WorkingZone/> */}
                    </div>
                    
                </div>
            </div>
        </div>
    }
}

export default Profile