import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';

export const getPosts = () => (dispatch, getState) => {
    dispatch(setPostsLoading());
    axios.get('http://localhost:5000/posts', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        });
};

export const addPost = ({ quote }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({ quote });

    axios.post('http://localhost:5000/posts/add', body, config)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            });
        });
};

export const deletePost = id => dispatch => {
    axios.delete(`http://localhost:5000/posts/${id}`).then(res =>
        dispatch({
            type: DELETE_POST,
            payload: id
        })
    );
};

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    };
};