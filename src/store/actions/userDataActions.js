import * as actionTypes from './actionTypes'

export const updateUsingProvider = (showingProvider) => {
    return {
        type: actionTypes.USER_DATA_UPDATE_USING_PROVIDER,
        payload: {
            showingProvider: showingProvider,
        },
    }
}

export const updateAuthenticated = (authenticated, jwt = '') => {
    return {
        type: actionTypes.USER_DATA_UPDATE_AUTHENTICATED,
        payload: {
            authenticated: authenticated,
            jwt: jwt,
        },
    }
}

export const updateIsProvider = () => {
    return {
        type: actionTypes.USER_DATA_UPDATE_IS_PROVIDER,
    }
}