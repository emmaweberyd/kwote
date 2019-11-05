import { GET_POSTS, ADD_POST, DELETE_POST } from './types';

export const getPosts = () => {
    return {
        type: GET_POSTS
    }
}

export const deletePost = id => {
    return {
        type: DELETE_POST,
        payload: id
    }
}