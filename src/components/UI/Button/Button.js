import React from 'react'
import styles from './Button.module.css'


const Button = (props)=>{
    return (
    <button onClick={props.onClick} className={[styles.button, styles[props.btnType],props.className].join('')}>
        {props.children}
    </button>
)}

export default Button