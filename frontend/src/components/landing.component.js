import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import { loadUsers, addFriend } from '../actions/usersActions';
import propTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import PostForm from './post-form.component';
import { Redirect } from 'react-router'
import NavBar from './navbar.component';
import { Row, Col, Card, Button } from "react-bootstrap";


class Landing extends Component {

    componentDidMount() {
        this.props.getPosts();
        this.props.loadUsers();
    }

    onDelete = (id) => {
        this.props.deletePost(id);
    }

    onAddFriend = (id) => {
        this.props.addFriend(id);
    }

    render() {
        const { posts } = this.props.post;
        const { users } = this.props.users;
        const { isAuthenticated } = this.props;
        if(isAuthenticated) {
            return (
                <div>  
                    <NavBar/>
                    <div className="container-fluid">
                        <Row style={{paddingTop: '20px'}}>
                            <Col xs="12" sm="3"></Col>
                            <Col xs="12" sm="6">
                                <PostForm/>
                                <List dense style={{color: 'white'}}>
                                    {posts.map(({_id, quote, quotee}) => {
                                        return (
                                        <ListItem key={_id} style={{paddingLeft: '0', paddingRight: '0'}}>
                                            <Card
                                                style={{
                                                    backgroundColor: '#323B45',
                                                    width: 'inherit'
                                                }}
                                            >
                                                <div>
                                                    <p 
                                                        style={{
                                                            float: "left",
                                                            width: "calc(100% - 30px)",
                                                            padding: "10px", 
                                                            marginBottom: "0"
                                                        }}
                                                    >"{quote}"</p>
                                                    <div style={{float: "right"}}>
                                                        <IconButton 
                                                            onClick={this.onDelete.bind(this,_id)} 
                                                            aria-label="delete"
                                                            size="small"
                                                        >
                                                            <ClearIcon style={{color: 'white'}}/>
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <footer className="blockquote-footer" style={{padding: "0 10px 10px 10px"}}>
                                                    {quotee}
                                                </footer>
                                            </Card>
                                        </ListItem>
                                        );
                                    })}
                                </List>
                            </Col>
                            <Col xs="12" sm="3">
                                <List dense style={{color: 'white', backgroundColor: '#323B45'}}>
                                    {users.map(({_id, firstname, lastname, status}) => {
                                        var buttonType = "primary";
                                        var buttonText = "add friend";
                                        if (status === "accepted") {
                                            buttonType = "light";
                                            buttonText = "friends"
                                        } else if (status === "pending" || status === "requested"){ 
                                            buttonText = status;
                                            buttonType = "info";
                                        }
                                        return(
                                            <ListItem key={_id}> 
                                                <Col><p style={{margin: '0'}}>{firstname} {lastname}</p></Col>
                                                <Col>
                                                    <Button 
                                                        onClick={this.onAddFriend.bind(this,_id)} 
                                                        variant={buttonType} 
                                                        size="sm">{buttonText}
                                                    </Button>
                                                </Col>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Col>
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
    loadUsers: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    post: state.post,
    users: state.users
});

export default connect(mapStateToProps, { getPosts, deletePost, loadUsers, addFriend })(Landing);