import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './MenuBtn.module.css'

const menuBtn = (props) => (
    <NavLink to={props.to} className={styles.MenuBtn}>{props.children}</NavLink>
)

export default menuBtn