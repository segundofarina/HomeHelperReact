import React, { Component } from 'react'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Panel from '../../UI/Panel/Panel'
import styles from './contact.module.css'
 import { faCalendar } from '@fortawesome/free-solid-svg-icons'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


class Contact extends Component {
    dayPickerRef = React.createRef();


    handleChange(event){

    }

    showDayPicker= ()=>{
        this.dayPickerRef.current.getInput().focus()
    }
    hideDayPicker = ()=>{
        this.dayPickerRef.current.showDayPicker()
    }

    
    render(){
        const defaultValue = {
            value: '',
            name: 'Select a service type',
        }
        return(<Panel className={styles.Panel}>
                <h4>Contactese con {this.props.providerName}</h4>
                <Input inputType="select"
                    label="Tipo de servicio"
                    value={this.props.serviceTypes}
                    onChange={this.props.onChange}
                    defaultValue={defaultValue}
                    options={this.props.serviceTypesOptions}
                    className={styles.Input} />
                    <div className={styles.Calendar}>
                        <div className={styles.CalendarPicker}>
                            <DayPickerInput
                            inputProps={{ style: { width: '100%' } }}
                            dayPickerProps={{ style: { transform: 'scale(2)' } }}
                            ref={this.dayPickerRef}
                            />
                        </div>
                        <div className={styles.CalendarIcon} onClick={this.showDayPicker} >
                            <FontAwesomeIcon icon={faCalendar}  />
                        </div>
                    </div>
                        
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