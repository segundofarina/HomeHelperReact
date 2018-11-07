import React from 'react'
import styles from './Input.module.css'

const input = (props) => {
    let inputElem = null
    const {inputType, label, ...inputProps} = props

    switch(props.inputType) {
        case ('input'):default:
            inputElem = (<input {...inputProps} className={styles.inputElem} />)
            break;
        case ('textarea'):
            inputElem = (<textarea {...inputProps} className={styles.textAreaElem}>{props.children}</textarea>)
            break;
    }

    return (
        <div className={styles.formGroup}>
            <label>{props.label}</label>
            {inputElem}
        </div>
    )
}

export default input