import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import styles from './workingZone.module.css'
const MY_API_KEY = "AIzaSyBqSX1WHUw4OlgMDzYM40uSVPGkV06DR1I"


const WorkingZone= (props)=>{
    return(
        <div className={styles.Container}>
            <Map google={props.google} zoom={14}
                style={{width: '100%', height: '100%',position:'relative'}}
            >
                </Map>
        </div>
    )
}


  export default GoogleApiWrapper({
    apiKey: (MY_API_KEY)
  })(WorkingZone)