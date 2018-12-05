import * as actionTypes from './actionTypes'
import axios from 'axios'

export const updateContact = (serviceType, date, description, provider) =>{
    return {
        type: actionTypes.CONTACT_UPDATE,
        payload: {
            serviceType: serviceType,
            date: date,
            description: description,
            provider: provider
        }
    }
}

export const sendAppointmentLoading = () => {
    return {
        type: actionTypes.CONTACT_SEND_LOADING,
    }
}

export const sendAppointmentError = () => {
    return {
        type: actionTypes.CONTACT_SEND_ERROR
    }
}

export const sendAppointmentSave = () => {
    return {
        type: actionTypes.CONTACT_SEND
    }
}

export const sendAppointment = () => {
    return async dispatch => {
        dispatch(sendAppointmentLoading())
        try {
            //Api call
            dispatch(sendAppointmentSave())
        } catch(error) {
            console.log(error)
            dispatch(sendAppointmentError())
        }
    }
}