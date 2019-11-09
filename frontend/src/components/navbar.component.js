import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed" style={{backgroundColor: 'black', marginBottom: '30px', height: '50px'}}>
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "roboto"
              }}
              className="col s5 brand-logo center black-text"
            >
              KWOTE
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}