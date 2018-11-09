import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import hhLogo from '../../../assets/img/HHLogo.png'

const navBar = () => (
    <div className={styles.navBar}>
        <Link className={styles.title} to="/">
            <img src={hhLogo} alt="logo" />
            <h1>Home-Helper</h1>
        </Link>
        <Link className={styles.button} to="/login">Iniciar Sesion</Link>
    </div>
)

export default navBar