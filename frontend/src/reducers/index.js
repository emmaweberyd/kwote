import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    post: postReducer,
    auth: authReducer,
    error: errorReducer,
    users: usersReducer
});