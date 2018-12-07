import * as actionTypes from '../actions/actionTypes'
import * as apiStatus from '../apiStatus'

const initalState = {
    reviews: [],
    status: apiStatus.API_STATUS_NONE
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.PROVIDER_REVIEWS_LOADING:
            return {
                ...state,
                status: apiStatus.API_STATUS_LOADING,
            }
        case actionTypes.PROVIDER_REVIEWS_ERROR:
            return {
                ...state,
                status: apiStatus.API_STATUS_ERROR,
            }
        case actionTypes.PROVIDER_REVIEWS_INIT:
            return {
                ...state,
                status: apiStatus.API_STATUS_DONE,
                reviews: action.payload.reviews,
            }
        case actionTypes.PROVIDER_REVIEWS_CLEAR_STATE:
            return initalState
        default:
            return state
    }
}

export default reducer