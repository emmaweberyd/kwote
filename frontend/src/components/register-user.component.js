import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { FormWrapper } from './form-wrapper';


class RegisterUser extends Component {
    state = {
        msg: null
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL') {
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
        const { register, isAuthenticated } = this.props
        if (isAuthenticated) {
            return <Redirect to="/"/>
        } else {
            return (
                <div>
                    <FormWrapper>
                        <h2>Register User!</h2>
                        <div style={{paddingTop: '20px', paddingBottom: '20px'}}>
                            Already have an account?&nbsp;
                            <Link to="/login">Login here!</Link>
                        </div>
                        <SignupForm register={register}/>
                        { this.state.msg ? 
                        <Alert variant="danger" style={{marginTop: '20px'}}>   
                            { this.state.msg }
                        </Alert> : null } 
                    </FormWrapper>
                    
                </div>
            );
        }
    }
}

RegisterUser.propTypes = {
    isAuthenticated: propTypes.bool,
    error: propTypes.object.isRequired,
    register: propTypes.func.isRequired,
    clearErrors: propTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
}); 

export default connect(mapStateToProps, { register, clearErrors })(RegisterUser);

const SignupForm = props => {
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
            props.register(user); 
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

