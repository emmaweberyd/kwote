import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';


class LoginUser extends Component {
    state = {
        msg: null
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
                setTimeout(() => {
                    this.setState({ msg: null });
                }, 4000);
            } else {
                this.setState({ msg: null });
            }
        }
    }

    render () {
        const { login } = this.props;
        return (
            <div>
                <h3 style={{paddingTop: '100px', paddingBottom: '40px'}}>Log in!</h3>
                <LoginForm login={login}/>
            </div>
        )
    }
}

LoginUser.propTypes = {
    isAuthenticated: propTypes.bool,
    error: propTypes.object.isRequired,
    login: propTypes.func.isRequired,
    clearErrors: propTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
}); 

export default connect(mapStateToProps, { login, clearErrors })(LoginUser);

const LoginForm = props => {
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: yup.object({
            email: yup.string()
                .required('Email is required'),
            password: yup.string()
                .required('No password provided.')
        }),
        onSubmit: values => {
            const user = {
                email: values.email,
                password: values.password
            }
            props.login(user);
        },
    });
    return (
        <Form 
            noValidate 
            onSubmit={formik.handleSubmit}
        >
            <FormGroup size="large">
                <FormLabel>Email</FormLabel>
                <FormControl
                    autoFocus
                    required 
                    type="email"
                    name="email"
                    value={formik.values.email || ''}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.email && formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                </Form.Control.Feedback>
            </FormGroup>
            <FormGroup size="large">
                <FormLabel>Password</FormLabel>
                <FormControl
                    autoFocus
                    required 
                    type="password"
                    name="password"
                    value={formik.values.password || ''}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.password && formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                </Form.Control.Feedback>
            </FormGroup>
            <Button block size="large" type="submit">
                Sign up
            </Button>
        </Form>
    );
};
