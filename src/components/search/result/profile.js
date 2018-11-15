import React from 'react'
import styles from './profile.module.css'
import Button from '../../UI/Button/Button'
import Panel from '../../UI/Panel/Panel'
import Rating from '../../UI/rating/Rating'

const profile = (props) => {
    return (
        <Panel className={styles.Panel}>
            <div className={styles.Col}>
                <div className={styles.ProfileImg}>
                    <img src={props.img} alt="Profile pricture" />
                </div>
                <Button
                onClick={props.onClick} 
                btnTyoe={".Small"}>Ver Perfil</Button>
            </div>
            <div className={styles.Col}>
                <div className={[styles.Row, styles.Title].join(' ')}>
                    <div className={styles.ProfileHeader}>
                        <h3 className={styles.ProfileName}>{props.name}</h3>
                        <span className={styles.SeparatorDot}>&#x25CF;</span>
                        <h5 className={styles.ServiceTypes}>{props.serviceTypes}</h5>
                    </div>
                    <div className={styles.Calification}>
                        {/* <p className={styles.emptyStars}>Aun no hay calificaciones</p> */}
                        <Rating value={props.calification}/>
                    </div>
                </div>
                <div className={[styles.row,styles.Description].join(' ')}>
                    <p>{props.description}</p>
                </div>

            </div>

        </Panel>


    )
}

export default profile