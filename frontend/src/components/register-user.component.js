import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

export default class RegisterUser extends Component {
    render () {
        return (
            <div>
                <h3 style={{paddingTop: '100px', paddingBottom: '40px'}}>Register User!</h3>
                <SignupForm/>
            </div>
        )
    }
}

const SignupForm = () => {
    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
        validationSchema: yup.object({
            firstName: yup.string()
                .required('First name is required'),
            lastName: yup.string()
                .required('Last name is required'),
            email: yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: yup.string()
                .required('No password provided.') 
                .min(8, 'Password is too short - should be at least 8 chars.')
        }),
        onSubmit: values => {
            const user = {
                firstname: values.firstName,
                lastname: values.lastName,
                email: values.email,
                password: values.password
            }
            console.log(user)
            axios.post('http://localhost:5000/users/add', user)
                .then(res => console.log(res.data))
                .catch(error => console.log(error));
        },
    });
    return (
        <Form 
            noValidate 
            onSubmit={formik.handleSubmit}
        >
            <FormGroup size="large">
                <FormLabel>Firstname</FormLabel>
                <FormControl
                    autoFocus
                    required 
                    type="text"
                    name="firstName"
                    value={formik.values.firstName || ''}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.firstName && formik.errors.firstName}
                />
                <FormControl.Feedback type="invalid">
                    {formik.errors.firstName}
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup size="large">
                <FormLabel>Lastname</FormLabel>
                <FormControl
                    autoFocus
                    required 
                    type="text"
                    name="lastName"
                    value={formik.values.lastName || ''}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.lastName && formik.errors.lastName}
                />
                <FormControl.Feedback type="invalid">
                    {formik.errors.lastName}
                </FormControl.Feedback>
            </FormGroup>
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
