import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class NavBar extends Component {
	render() {
		const { firstname, lastname } = this.props.user
		return (
			<Navbar 
				className="bg-dark justify-content-between" 
				style={{height: '80px', marginBottom: '20px'}}
			>
				<Link to="/">
					<Navbar.Brand style={{color: 'white'}}>KWOTE
					</Navbar.Brand>
				</Link>
				<Navbar.Text style={{textAlign: 'right', color: 'white'}}>
					{firstname} {lastname}
				</Navbar.Text>
			</Navbar>
		);
	}
}


NavBar.propTypes = {
    user: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(NavBar);