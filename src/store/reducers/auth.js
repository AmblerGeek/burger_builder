import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState  = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_BEGIN:
            return updateObject(state, {
                error: null,
                loading: true
            });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            });
        case actionTypes.AUTH_FAILURE:
            return updateObject(state, {
                error: action.error,
                loading: false
            });
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                token: null,
                userId: null,
                error: null,
                loading: false
            });
        case actionTypes.SET_AUTH_REDIRECT:
            return updateObject(state, {
                authRedirectPath: action.redirectPath
            });
        default:
            return  state;
    }
};

export default reducer;