import * as actionTypes from '../actions/actionTypes'

const initialState = {
    showingProvider: true,
    jwt: '',
    authenticated: true, //just for testing
    isProvider: true, //just for testing
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.USER_DATA_UPDATE_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.payload.authenticated,
                jwt: action.payload.jwt,
            }
        case actionTypes.USER_DATA_UPDATE_USING_PROVIDER:
            return {
                ...state,
                showingProvider: action.payload.showingProvider,
            }
        case actionTypes.USER_DATA_UPDATE_IS_PROVIDER:
            return {
                ...state,
                isProvider: true,
            }
        default:
            return state
    }
}

export default reducer