import React from 'react'
import styles from './Status.module.css'
import Panel from '../../UI/Panel/Panel'
import defaultImg from '../../../assets/img/searchEmpty.png'

const status = (props) => {
    let elem = null
    if(props.type === 'loading') {
        elem = (<div className={styles.Loader}></div>)
    }
    if(props.type === 'empty') {
        elem = (<img className={styles.Img} alt="" src={defaultImg} />)
    }
    if(props.type === 'error') {
        elem = (<img className={styles.Img} alt="" src={defaultImg} />)
    }

    return (
        <div className={styles.StatusContainer}>
            <Panel className={styles.Panel}>
                {elem}
                <p className={styles.Description}>{props.text}</p>
            </Panel>
        </div>
    )
}

export default status