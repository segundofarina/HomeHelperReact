import React from 'react'
import styles from './ContactProfile.module.css'
import defaultImg from '../../../../assets/img/defaultProfile.png'

const contactProfile = (props) => (
    <div className={styles.ContactProfile}>
        <img src={defaultImg} alt="" className={styles.ProfilePicture} />
        <p className={styles.Name}>{props.name}</p>
    </div>
)

export default contactProfile