import {
    USERS_LOADING,
    USERS_LOADED,
    USERS_LOADING_FAIL
} from '../actions/types';

const initialState = {
    users: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case USERS_LOADED:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case USERS_LOADING_FAIL:
            return {
                ...state,
                users: [],
                loading: false
            };
        default:
            return state;
    }
}