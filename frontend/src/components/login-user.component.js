import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';


export default class LoginUser extends Component {
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
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
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/users/login', user)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

    }

    render(){
        return (
            <div>
                <h3 style={{paddingTop: '100px', paddingBottom: '40px'}}>Login User!</h3>
                <Form onSubmit={this.onSubmit}>
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
                            required 
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            type="password"
                        />
                    </FormGroup>
                    <Button block size="large" type="submit">
                    Login
                    </Button>
                </Form>
            </div>
        )
    }

}