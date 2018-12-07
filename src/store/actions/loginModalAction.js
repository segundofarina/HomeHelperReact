import * as actionTypes from './actionTypes'

export const showLogin = () => {
    return {
        type: actionTypes.LOGIN_MODAL_SHOW,
    }
}

export const hideLogin = () => {
    return {
        type: actionTypes.LOGIN_MODAL_HIDE,
    }
}