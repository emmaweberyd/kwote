import { GET_POSTS, ADD_POST, DELETE_POST } from '../actions/types';

const initialState = {
    posts: [
        {id: 1, quote: 'hello'}, 
        {id: 2, quote: 'bai'},
        {id: 3, quote: 'baiii'}
    ]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_POSTS:
            return {
                ...state
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            }
        default:
            return state;
    }
}