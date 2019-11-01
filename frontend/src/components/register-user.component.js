import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';

export default class RegisterUser extends Component {
    constructor(props){
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

    }

    render(){
        return (
            <div>
                <h3 style={{paddingTop: '100px', paddingBottom: '40px'}}>Register User!</h3>
                <Form onSubmit={this.onSubmit} autoComplete="off">
                    <FormGroup size="large">
                        <FormLabel>Firstname</FormLabel>
                        <FormControl
                            autoFocus
                            required 
                            type="text"
                            value={this.state.firstname}
                            onChange={this.onChangeFirstname}
                        />
                    </FormGroup>
                    <FormGroup size="large">
                        <FormLabel>Lastname</FormLabel>
                        <FormControl
                            autoFocus
                            required 
                            type="text"
                            value={this.state.lastname}
                            onChange={this.onChangeLastname}
                        />
                    </FormGroup>
                    <FormGroup size="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            required 
                            type="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </FormGroup>
                    <FormGroup size="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            autoFocus
                            required 
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </FormGroup>
                    <Button block size="large" type="submit">
                        Sign up
                    </Button>
                </Form>
           </div>
        )
    }
}

