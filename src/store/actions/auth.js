import * as actionTypes from './actionTypes';
import axios from "axios";

export const logout  = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout  = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, (expirationTime * 1000));
    }
};

export const auth = (email, password, newUser) => {
    return dispatch => {
        dispatch(authBegin());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        console.log("authData:", authData);
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzadM3d6vXxwmgb1hppkSC-G9RgRQBqRk';
        if(newUser) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzadM3d6vXxwmgb1hppkSC-G9RgRQBqRk'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFailure(error.response.data.error));
            });


    };
};

export const authBegin = () => {
    return {
        type: actionTypes.AUTH_BEGIN
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    };
};

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        redirectPath: path
    };
};

