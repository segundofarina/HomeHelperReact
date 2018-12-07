import * as actionTypes from './actionTypes'
import axios from 'axios'

export const providerProfileInitLoading = () => {
    return {
        type: actionTypes.PROVIDER_PROFILE_INIT_LOADING,
    }
}

export const providerProfileInitError = () => {
    return {
        type: actionTypes.PROVIDER_PROFILE_INIT_ERROR,
    }
}

export const providerProfileInit = (id) => {
    return async dispatch => {
        dispatch(providerProfileInitLoading())
        try {
            const response = await axios.get(`/providers/${id}`)
            dispatch(providerProfileSave(response.data))
        } catch (error) {
            console.log(error)
            dispatch(providerProfileInitError())
        }
    }
}

const providerProfileSave = (provider) => {
    return {
        type: actionTypes.PROVIDER_PROFILE_INIT_SAVE,
        payload: {
            provider: {...provider}
        }
    }
}

export const providerClearState = () => {
    return {
        type: actionTypes.PROVIDER_APPOINTMENTS_CLEAR_STATE,
    }
}