import React from 'react'
import MenuBtn from './MenuBtn/MenuBtn'
import styles from './MenuBtns.module.css'

const menuBtns = () => (
    <div className={styles.MenuBtns}>
        <MenuBtn to="/messages">Mensajes</MenuBtn>
        <MenuBtn to="/appointment">Citas</MenuBtn>
    </div>
)

export default menuBtns