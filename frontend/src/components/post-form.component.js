import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';
import propTypes from 'prop-types';


class PostForm extends Component {
    
    render() {
        const { addPost } = this.props; 
        return <PostFormField postMethod={addPost}/>
    }
} 

PostForm.propTypes = {
    addPost: propTypes.func.isRequired
}

const mapStateToProps = state => ({

}); 

export default connect(mapStateToProps,{ addPost })(PostForm);


const PostFormField = props => {
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
            props.postMethod(post);
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
        </Form>
    );
};
