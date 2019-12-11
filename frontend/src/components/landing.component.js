import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import propTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PostForm from './post-form.component';
import { Redirect } from 'react-router'
import NavBar from './navbar.component';
import { Row, Col, Card } from "react-bootstrap";


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
                    <div className="container-fluid">
                        <Row>
                            <Col xs="12" sm="3"></Col>
                            <Col xs="12" sm="6" style={{paddingTop: '20px'}}>
                                <PostForm/>
                                <List dense style={{color: 'white'}}>
                                    {posts.map(({_id, quote, quotee}) => {
                                        return (
                                        <ListItem key={_id} style={{paddingLeft: '0', paddingRight: '0'}}>
                                            <Card body style={{backgroundColor: '#323B45', width: 'inherit'}}>
                                                <p>"{quote}"</p>
                                                <footer className="blockquote-footer">
                                                    {quotee}
                                                </footer>
                                                <IconButton 
                                                    onClick={this.onDelete.bind(this,_id)} 
                                                    edge="end" 
                                                    aria-label="delete"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Card>
                                        </ListItem>
                                        );
                                    })}
                                </List>
                            </Col>
                            <Col xs="12" sm="3"></Col>
                        </Row>
                    </div>
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