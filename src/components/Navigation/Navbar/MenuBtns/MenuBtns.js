import React, { Fragment } from 'react'
import MenuBtn from './MenuBtn/MenuBtn'
import DropdownBtn from './DropdownBtn/DropdownBtn'
import styles from './MenuBtns.module.css'

const menuBtns = (props) => {
    const btnsStyles = [styles.MenuBtns]
    let btns = (
        <Fragment>
            <MenuBtn to="/messages" key='1'>Mensajes</MenuBtn>
            <MenuBtn to="/appointments" key='2'>Citas</MenuBtn>
        </Fragment>
    )
    if(props.showingProvider) {
        btnsStyles.push(styles.MenuBtnsProvider)
        btns = (
            <Fragment>
                <MenuBtn exact to="/provider" key='3'>Inicio</MenuBtn>
                <MenuBtn to="/provider/messages" key='4'>Mensajes</MenuBtn>
                <MenuBtn to="/provider/appointments" key='5'>Citas</MenuBtn>
                <MenuBtn to="/provider/progress" key='6'>Progreso</MenuBtn>
                <MenuBtn to="/provider/profile" key='7'>Perfil</MenuBtn>
            </Fragment>
        )
    }

    return (
        <div className={btnsStyles.join(' ')}>
            <div className={styles.NavBtnContainer}>
                {btns}
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