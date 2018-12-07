import * as actionTypes from '../actions/actionTypes'
import * as apiStatus from '../apiStatus'

const initialState = {
    provider: {},
    status: apiStatus.API_STATUS_NONE,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PROVIDER_PROFILE_INIT_LOADING:
            return {
                ...state,
                status: apiStatus.API_STATUS_LOADING,
            }
        case actionTypes.PROVIDER_PROFILE_INIT_ERROR:
            return {
                ...state,
                status: apiStatus.API_STATUS_ERROR,
            }
        case actionTypes.PROVIDER_PROFILE_INIT_SAVE:
            return {
                ...state,
                status: apiStatus.API_STATUS_DONE,
                provider: action.payload.provider,
            }
        case actionTypes.PROVIDER_PROFILE_CLEAR_STATE:
            return initialState
        default:
            return state
    }
}

export default reducer