import React from 'react'
import defaultImg from '../../../assets/img/defaultProfile.png'
import styles from './profile.module.css'
import Button from '../../UI/Button/Button'
import Panel from '../../UI/Panel/Panel'

const profile = () => {
    return (
        <Panel className={styles.Panel}>
            <div className={styles.Col}>
                <div className={styles.ProfileImg}>
                    <img src={defaultImg} alt="../../../assets/defaultProfile.png" />
                </div>
                <Button>Ver Perfil</Button>
            </div>
            <div className={styles.Col}>
                <div className={[styles.Row, styles.Title].join(' ')}>
                    <div className={styles.ProfileHeader}>
                        <h3 className={styles.ProfileName}>Segundo Farina</h3>
                        <span className={styles.SeparatorDot}>&#x25CF;</span>
                        <h5 className={styles.ServiceTypes}>Carpintero</h5>
                    </div>
                    <div className={styles.Calification}>
                        <p className={styles.emptyStars}>Aun no hay calificaciones</p>
                    </div>
                </div>
                <div className={styles.row}>
                    <p>
                        Diseñamos y Fabricamos todo tipo de muebles a medida para hogares y proyectos comerciales.
                    Trabajamos con todo tipo de materiales y adaptamos el presupuesto a cada necesidad.
                    </p>
                </div>

            </div>

        </Panel>


    )
}

export default profile