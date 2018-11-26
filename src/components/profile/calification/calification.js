import React from 'react'
import Panel from '../../UI/Panel/Panel'
import Rating from'../../UI/rating/Rating'
import styles from './calification.module.css'
import ProgressBar from '../../UI/progressBar/progressBar'

const Calification = (props)=>{
    return(
        <Panel>
            <h4>Califiación General</h4>
            <Rating value={props.general}/>
            <h5>Calidad:</h5>
            <ProgressBar value={props.quality*20} label={props.quality}/>
            <h5>Precio:</h5>
            <ProgressBar value={props.price*20} label={props.price}/>
            <h5>Puntualidad:</h5>
            <ProgressBar value={props.puncutality*20} label={props.puncutality}/>
            <h5>Trato:</h5>
            <ProgressBar value={props.treatment*20} label={props.treatment}/>
            <h5>Liempiza:</h5>
            <ProgressBar value={props.cleanness*20} label={props.cleanness}/>
        </Panel>
    )
}
export default Calification