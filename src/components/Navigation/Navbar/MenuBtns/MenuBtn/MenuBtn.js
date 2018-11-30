import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './MenuBtn.module.css'

const menuBtn = (props) => (
    <NavLink to={props.to} exact={props.exact} className={styles.MenuBtn} activeClassName={styles.active}>{props.children}</NavLink>
)

export default menuBtn