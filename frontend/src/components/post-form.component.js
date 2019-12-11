import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, FormControl, Row, Col } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';
import propTypes from 'prop-types';

// for foldout form
import { Collapse, Input } from 'reactstrap';

class PostForm extends Component {
    
    render() {
        const { addPost } = this.props; 
        const { friends } = this.props.user;
        return <PostFormField postMethod={addPost} friends={friends}/>
    }
} 

PostForm.propTypes = {
    addPost: propTypes.func.isRequired,
    user: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
}); 

export default connect(mapStateToProps,{ addPost })(PostForm);


const PostFormField = props => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(true);
    const unToggle = () => setIsOpen(false);
    const { friends } = props;

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
            formik.values.quote = ''; // clear input field
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
                    placeholder="What did your friend say?"
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
                    onFocus={toggle}
                    onBlur={unToggle}

                />
            </FormGroup>
            <Collapse isOpen={isOpen}>
                <Row>
                    <Col style={{position: 'relative', float: 'left'}}>
                    <FormGroup size="large">
                        <Input type="select" onFocus={toggle} onBlur={unToggle}>
                            {friends.map(({_id, friend}) => {
                                return <option key={_id}>{friend.firstname + " " + friend.lastname}</option>;
                            })}
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col>
                        <Button block type="submit" onFocus={toggle}>Post</Button>
                    </Col>
                </Row>
            </Collapse>
        </Form>
    );
};
