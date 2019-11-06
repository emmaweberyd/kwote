import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    AUTH_ERROR
} from './types';
import { returnErrors } from './errorActions';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });

    axios.get('http://localhost:5000/users/login', tokenConfig(getState))
        .then(res => dispatch({ 
            type: USER_LOADED, 
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'AUTH_ERROR'));
            dispatch({ type: AUTH_ERROR });
        });
}

export const register = ({ firstname, lastname, email, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({ firstname, lastname, email, password });

    axios.post('http://localhost:5000/users/add', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({ type: REGISTER_FAIL });
        });
}

// setup config/headers and token
export const tokenConfig = getState => {
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // if token, then add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}