import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { Button } from "react-bootstrap";


class NavBar extends Component {

	onLogout = () => {
        const { logout } = this.props;
        logout();
    }

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
				<Nav>
				<Navbar.Text style={{color: 'white', paddingRight: '20px'}}>
					{firstname} {lastname}
				</Navbar.Text>
				<Button variant="secondary" onClick={this.onLogout}>Logout</Button>
				</Nav>
			</Navbar>
		);
	}
}


NavBar.propTypes = {
	user: propTypes.object.isRequired,
    logout: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { logout })(NavBar);