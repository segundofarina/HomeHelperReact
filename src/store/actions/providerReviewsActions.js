import * as actionTypes from './actionTypes'
import axios from 'axios'

export const providerReviewsLoading = () => {
    return {
        type: actionTypes.PROVIDER_REVIEWS_LOADING,
    }
}
export const providerReviewsError = () => {
    return {
        type: actionTypes.PROVIDER_REVIEWS_ERROR,
    }
}
export const providerReviewsSave = (reviews) => {
    return {
        type: actionTypes.PROVIDER_REVIEWS_INIT,
        payload: {
            reviews: reviews
        }
    }
}
export const providerReviewsInit = () => {
    return async dispatch => {
        dispatch(providerReviewsLoading())
        try {
            const response = await axios.get('/providers/reviews')
            dispatch(providerReviewsSave(response.data.reviews))
        } catch(error) {
            console.log(error)
            dispatch(providerReviewsError())
        }
    }
}
export const providerReviewsClearState = () => {
    return {
        type: actionTypes.PROVIDER_REVIEWS_CLEAR_STATE,
    }
}