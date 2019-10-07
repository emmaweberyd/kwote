import React, { Component } from 'react';
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

        console.log(user)
    }

    render(){
        return (
            <div>
                <h3>Login User!</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Email: </label>
                    <input 
                        required 
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                    <label>Password: </label>
                    <input 
                        required 
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
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