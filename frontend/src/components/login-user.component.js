import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

export default class LoginUser extends Component {
    render () {
        return (
            <div>
                <h3 style={{paddingTop: '100px', paddingBottom: '40px'}}>Log in!</h3>
                <LoginForm/>
            </div>
        )
    }
}

const LoginForm = () => {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
            axios.post('http://localhost:5000/users/auth', user)
                .then(res => console.log(res.data))
                .catch(error => {
                    console.log(error.response.data.msg);
                    setErrorMessage(error.response.data.msg)
                    setShow(true);
                    setTimeout(() => {
                        setShow(false);
                    }, 4000);
                });
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
            <Alert show={show} variant="danger" style={{marginTop: '10px'}}>
                {errorMessage}
            </Alert>
        </Form>
    );
};
