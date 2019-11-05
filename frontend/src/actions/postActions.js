import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING } from './types';
import axios from 'axios';

export const getPosts = () => dispatch => {
    dispatch(setPostsLoading());
    axios.get('http://localhost:5000/posts').then(res => 
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    );
};

export const deletePost = id => {
    return {
        type: DELETE_POST,
        payload: id
    };
};

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    };
};