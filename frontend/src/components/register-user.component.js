import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
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

        console.log(user)
    }


    render(){
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div><h3>Register User!</h3></div>
                <form onSubmit={this.onSubmit} autoComplete="off">
                    <div>
                        <TextField
                        required
                        id="standard-basic"
                        label="Firstname"
                        margin="normal"
                        value={this.state.firstname}
                        onChange={this.onChangeFirstname}
                        />
                    </div>  
                    <div>
                        <TextField
                        required
                        id="standard-basic"
                        label="Lastname"
                        margin="normal"
                        value={this.state.lastname}
                        onChange={this.onChangeLastname}
                        />
                    </div>   
                    <div>
                        <TextField
                        required
                        id="standard-basic"
                        label="Email"
                        margin="normal"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                    </div>   
                    <div>
                        <TextField
                        required
                        id="standard-basic"
                        label="Password"
                        margin="normal"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
                    </div>   
                    <button
                        onClick={this.onSubmit}
                        >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

