import axios from 'axios';
import {
    USERS_LOADING,
    USERS_LOADED,
    USERS_LOADING_FAIL,
    ADD_FRIEND
} from './types';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const loadUsers = () => (dispatch, getState) => {

    dispatch({ type: USERS_LOADING });

    axios.get('http://localhost:5000/users/') //, tokenConfig(getState))
        .then(res => {

            const user = getState().auth.user;
            var data = res.data;

            if(user != null) {

                var index = data.findIndex(function(item, i){
                    return item._id === user._id
                });
                // remove own user
                delete data[index];

                for (var j in data) { // for each registered user
                    data[j].status = null;
                    for (var i in user.friends) { // for each friend
                        const friend = user.friends[i]
                        if (friend._id === data[j]._id)  // if friends
                            data[j].status = friend.status;
                    }
                }
            }

            dispatch({ 
                type: USERS_LOADED, 
                payload: data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'USERS_LOADING_FAIL'));
            dispatch({ type: USERS_LOADING_FAIL });
        });

}

export const addFriend = id => (dispatch, getState) => {

    const body = JSON.stringify({ _id: getState().auth.user._id, reciever_id: id });

    axios.post('http://localhost:5000/users/add-friend', body, tokenConfig(getState))
    .then(res => {

        const friend = {
            _id: id,
            status: res.data.friender.status
        }

        dispatch({
            type: ADD_FRIEND,
            payload: friend
        })
    });
};