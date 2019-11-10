import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import propTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PostForm from './post-form.component';
import { Redirect } from 'react-router'
import NavBar from './navbar.component';

class Landing extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    onDelete = (id) => {
        this.props.deletePost(id);
    }

    render() {
        const { posts } = this.props.post;
        const { isAuthenticated } = this.props;
        if(isAuthenticated) {
            return (
                <div>  
                    <NavBar/>
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
        } else {
            return <Redirect to="/login"/>; // redirect to login when session ends
        }
    }
}

Landing.propTypes = {
    isAuthenticated: propTypes.bool,
    getPosts: propTypes.func.isRequired,
    post: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    post: state.post
});

export default connect(mapStateToProps, { getPosts, deletePost })(Landing);

