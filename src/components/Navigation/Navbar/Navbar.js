import React from 'react'
import styles from './Navbar.module.css'
import hhLogo from '../../../assets/img/HHLogo.png'

const navBar = () => (
    <div className={styles.navBar}>
        <a className={styles.title} href="/">
            <img src={hhLogo} alt="logo" />
            <h1>Home-Helper</h1>
        </a>
        <a className={styles.button} href="/login">Iniciar Sesion</a>
    </div>
)

export default navBar