import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { logOut } from '../../actions';

import "./NavBar.scss";


const NavBar = props => {
  return (
    <div className="container-nav">
      <h1>Trip Split</h1>
      <nav>
        <Link to="/trips">Home</Link>
        {props.token && <Link to="/login" onClick={props.logOut}>Log out</Link>}
        {!props.token && <Link to="/login">Login</Link>}
        {!props.token && <Link to="/signup">Sign Up</Link>}
        <Link to="/trips">Trips</Link>
        <Link to="/add">Add a trip</Link>
      </nav>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps, {logOut : logOut})(NavBar);
