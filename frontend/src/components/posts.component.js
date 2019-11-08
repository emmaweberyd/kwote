import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import propTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PostForm from './post-form.component';

// FOR LOGOUT
import { logout } from '../actions/authActions';


class Posts extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    onDelete = (id) => {
        this.props.deletePost(id);
    }

    onLogout = () => {
        const { logout } = this.props;
        logout();
    }

    render() {
       const { posts } = this.props.post;
        return (
            <div>
            <Button onClick={this.onLogout}>Logout</Button>
            <PostForm/>
            <List dense>
                {posts.map(({_id, quote}) => {
                    return (
                    <ListItem key={_id} button>
                        <ListItemText primary={quote} />
                        <IconButton 
                            onClick={this.onDelete.bind(this,_id)} 
                            edge="end" 
                            aria-label="delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                    );
                })}
            </List>
            </div>
        );
    }
}

Posts.propTypes = {
    getPosts: propTypes.func.isRequired,
    post: propTypes.object.isRequired,
    logout: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts, deletePost, logout })(Posts);

