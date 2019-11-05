import React, { useState } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const PostForm = () => {
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const formik = useFormik({
        initialValues: {
          quote: ''
        },
        validationSchema: yup.object({
            quote: yup.string()
                .required('Quote is required')
        }),
        onSubmit: values => {
            const post = {
                quote: values.quote
            }
            axios.post('http://localhost:5000/posts/add', post)
                .then(res => console.log(res.data))
                .catch(error => {
                    console.log(error.response.data.msg);
                    setErrorMessage(error.response.data.msg)
                    setShow(true);
                    setTimeout(() => {
                        setShow(false);
                    }, 4000);
                });
            window.location.reload();
        },
    });
    return (
        <Form 
            noValidate 
            onSubmit={formik.handleSubmit}
        >
            <FormGroup size="large">
                <FormLabel>Quote</FormLabel>
                <FormControl
                    autoFocus
                    required 
                    type="quote"
                    name="quote"
                    value={formik.values.quote || ''}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.quote && formik.errors.quote}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.quote}
                </Form.Control.Feedback>
            </FormGroup>
            <Button block size="large" type="submit">
                Post
            </Button>
            <Alert show={show} variant="danger" style={{marginTop: '10px'}}>
                {errorMessage}
            </Alert>
        </Form>
    );
};

export default PostForm;