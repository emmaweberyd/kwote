import axios from 'axios';
import {
    USERS_LOADING,
    USERS_LOADED,
    USERS_LOADING_FAIL
} from './types';
import { returnErrors } from './errorActions';

export const loadUsers = () => (dispatch, getState) => {

    dispatch({ type: USERS_LOADING });

    axios.get('http://localhost:5000/users/') //, tokenConfig(getState))
        .then(res => {
            dispatch({ 
                type: USERS_LOADED, 
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'USERS_LOADING_FAIL'));
            dispatch({ type: USERS_LOADING_FAIL });
        });

}