import React, { Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import propTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class Posts extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    onDelete = (id) => {
        this.props.deletePost(id);
    }

    render() {
       const { posts } = this.props.post
        return (
            <List dense>
                {posts.map(({id, quote}) => {
                    return (
                    <ListItem key={id} button>
                        <ListItemText primary={quote} />
                        <IconButton 
                            onClick={this.onDelete.bind(this,id)} 
                            edge="end" 
                            aria-label="delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                    );
                })}
            </List>
        );
    }
}

Posts.propTypes = {
    getPosts: propTypes.func.isRequired,
    post: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts, deletePost })(Posts);

