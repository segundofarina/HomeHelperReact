import React from 'react'
import MenuBtn from './MenuBtn/MenuBtn'
import DropdownBtn from './DropdownBtn/DropdownBtn'
import styles from './MenuBtns.module.css'

const menuBtns = () => (
    <div className={styles.MenuBtns}>
        <MenuBtn to="/messages">Mensajes</MenuBtn>
        <MenuBtn to="/appointments">Citas</MenuBtn>
        <DropdownBtn name="Segundo" img="" />
    </div>
)

export default menuBtns