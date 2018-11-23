import React, { Component } from 'react'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Panel from '../../UI/Panel/Panel'
import styles from './contact.module.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


class Contact extends Component {


    handleChange(event){

    }

    
    render(){
        const defaultValue = {
            value: '',
            name: 'Select a service type',
        }
        return(<Panel className={styles.Panel}>
                <Input inputType="select"
                    label="Tipo de servicio"
                    value={this.props.serviceTypes}
                    onChange={this.props.onChange}
                    defaultValue={defaultValue}
                    options={this.props.serviceTypesOptions}
                    className={styles.Input} />
                    <DatePicker
                         selected={new Date()}
                        onChange={this.handleChange}
                    >
                    </DatePicker>
                <Input inputType="textarea"
                    label="Descripcion:"
                    className={styles.InputText} />

                <Button className={styles.Button}>
                    Contactar
                </Button>
        </Panel>
        )}
}

export default Contact