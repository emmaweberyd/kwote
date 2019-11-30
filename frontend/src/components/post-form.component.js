import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';
import propTypes from 'prop-types';

// for foldout form
import { Collapse, Card, CardBody } from 'reactstrap';

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
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(true);
    const unToggle = () => setIsOpen(false);

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
            unToggle();
        },
    });
    return (
        <Form 
            noValidate 
            onSubmit={formik.handleSubmit}
        >   
            <FormGroup size="large">
                <FormControl
                    autoComplete="off"
                    style={{
                        backgroundColor: '#323B45',
                        color: 'white',
                        border: 'none'
                    }}
                    required 
                    type="text"
                    name="quote"
                    value={formik.values.quote || ''}
                    onChange={formik.handleChange}
                    //isInvalid={formik.touched.quote && formik.errors.quote}
                    onFocus={toggle}
                    onBlur={unToggle}

                />
                {/* <Form.Control.Feedback type="invalid">
                    {formik.errors.quote}
                </Form.Control.Feedback> */}
            </FormGroup>
            <Collapse isOpen={isOpen}>
                <Card style={{backgroundColor: '#1e2833'}}>
                    <CardBody>
                        <Button block size="large" type="submit" onFocus={toggle}>
                            Post
                        </Button>
                    </CardBody>
                </Card>
            </Collapse>
        </Form>
    );
};
