import React, { Fragment } from 'react'
import MenuBtn from './MenuBtn/MenuBtn'
import DropdownBtn from './DropdownBtn/DropdownBtn'
import styles from './MenuBtns.module.css'

const menuBtns = (props) => {
    const btnsStyles = [styles.MenuBtns]
    if(props.showingProvider) {
        btnsStyles.push(styles.MenuBtnsProvider)
    }

    let btns = (
        <Fragment>
            <MenuBtn to="/messages">Mensajes</MenuBtn>
            <MenuBtn to="/appointments">Citas</MenuBtn>
        </Fragment>
    )
    /*if(props.showingProvider) {
        btns = (
            <Fragment>
                <MenuBtn to="/provider/dashboard">Inicio</MenuBtn>
                <MenuBtn to="/provider/messages">Mensajes</MenuBtn>
                <MenuBtn to="/provider/appointments">Citas</MenuBtn>
                <MenuBtn to="/provider/progress">Progreso</MenuBtn>
                <MenuBtn to="/provider/profile">Perfil</MenuBtn>
            </Fragment>
        )
    }*/

    return (
        <div className={btnsStyles.join(' ')}>
            <div className={styles.NavBtnContainer}>
                <MenuBtn to="/messages">Mensajes</MenuBtn>
                <MenuBtn to="/appointments">Citas</MenuBtn>

            </div>
            <DropdownBtn name="Segundo"
                        img=""
                        isProvider={props.isProvider}
                        showingProvider={props.showingProvider}
                        handleUseAsProvider={props.handleUseAsProvider} />
        </div>
    )
}

export default menuBtns