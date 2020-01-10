import {
    USERS_LOADING,
    USERS_LOADED,
    USERS_LOADING_FAIL,
    ADD_FRIEND,
    REMOVE_FRIEND
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
        case ADD_FRIEND:
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload._id ?
                    // transform the one with a matching id
                    { ...user, status: action.payload.status } : 
                    // otherwise return original user
                    user
                ),
                loading: false
            };
        case REMOVE_FRIEND:
        return {
            ...state,
            users: state.users.map(user => user._id === action.payload._id ?
                // transform the one with a matching id
                { ...user, status: action.payload.status } : 
                // otherwise return original user
                user
            ),
            loading: false
        };
        default:
            return state;
    }
}