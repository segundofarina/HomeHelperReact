import * as actionTypes from '../actions/actionTypes'

const initialState = {
    showingLogin: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_MODAL_SHOW:
            return {
                ...state,
                showingLogin: true,
            }
        case actionTypes.LOGIN_MODAL_HIDE:
            return {
                ...state,
                showingLogin: false,
            }
        default:
            return state
    }
}

export default reducer