import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import hhLogo from '../../../assets/img/HHLogo.png'
import MenuBtns from './MenuBtns/MenuBtns'
import { connect } from 'react-redux'
import * as userDataActions from '../../../store/actions/userDataActions'

const navBar = (props) => {

    let NavbarLinks = (<Link className={styles.loginButton} to="/login">Iniciar Sesion</Link>)

    if(props.authenticated) {
        NavbarLinks = (
            <MenuBtns isProvider={props.isProvider}
                    showingProvider={props.showingProvider}
                    handleUseAsProvider={props.useAsProvider} />
        )
    }

    let title = (
        <Link className={styles.title} to="/">
            <img src={hhLogo} alt="logo" />
            <h1>Home-Helper</h1>
        </Link>
    )
    if(props.showingProvider) {
        title = (
            <Link className={styles.title} to="/provider">
                <img src={hhLogo} alt="logo" />
            </Link>
        )
    }

    return (
        <div className={styles.navBar}>
            {title}
            {NavbarLinks}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        showingProvider: state.userData.showingProvider,
        authenticated: state.userData.authenticated,
        isProvider: state.userData.isProvider,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        useAsProvider: (showingProvider) => dispatch(userDataActions.updateUsingProvider(showingProvider))
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(navBar)