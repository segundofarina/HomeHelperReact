import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import hhLogo from '../../../assets/img/HHLogo.png'
import MenuBtns from './MenuBtns/MenuBtns'

const navBar = (props) => {
    let NavbarLinks = (<Link className={styles.loginButton} to="/login">Iniciar Sesion</Link>)

    if(props.authenticated) {
        NavbarLinks = (<MenuBtns />)
    }

    return (
        <div className={styles.navBar}>
            <Link className={styles.title} to="/">
                <img src={hhLogo} alt="logo" />
                <h1>Home-Helper</h1>
            </Link>
            {NavbarLinks}
        </div>
    )
}

export default navBar