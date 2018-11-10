import React from 'react'
import styles from './Input.module.css'

const input = (props) => {
    let inputElem = null
    const {inputType, label, ...inputProps} = props

    switch(props.inputType) {
        case ('input'):default:
            inputElem = (<input {...inputProps} className={styles.inputElem} />)
            break
        case ('textarea'):
            inputElem = (<textarea {...inputProps} className={styles.textAreaElem}>{props.children}</textarea>)
            break
        case ('select'):
            inputElem = (<select value={props.value}
                            className={styles.inputElem}
                            onChange={props.onChange}>
                    <option value={props.defaultValue.value}>{props.defaultValue.name}</option>
                    {props.options.map(option => (
                        <option value={option.value} key={option.value}>{option.name}</option>
                    ))}
                </select>)
            break
    }

    return (
        <div className={styles.formGroup}>
            <label>{props.label}</label>
            {inputElem}
        </div>
    )
}

export default input