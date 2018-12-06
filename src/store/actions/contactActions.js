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

export const sendAppointment = (appointment) => {
    return async dispatch => {
        dispatch(sendAppointmentLoading())
        try {
            const response = await axios.post('/users/appointments/',appointment)
            if(response.status === 201) {
                dispatch(sendAppointmentSave())
            } else {
                dispatch(sendAppointmentError())
            }
        } catch(error) {
            console.log(error)
            dispatch(sendAppointmentError())
        }
    }
}