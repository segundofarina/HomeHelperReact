import React from 'react'
import styles from './progressBar.module.css'

const progressBar= (props) =>{
    const style = {width: props.value+"%"}
    return(
        <div className={styles.Progress}>
            <div className={styles.ProgressBar} style ={style} >
                {props.label}
            </div>
        </div>
    )
}
export default progressBar