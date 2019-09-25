import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { logOut } from '../../actions';

import "./NavBar.scss";


const NavBar = props => {
  let [token, setToken] = useState(props.token);
  useEffect(() => {
    setToken(props.token);
  }, [props.token]);

  return (
    <div className="container-nav">
      <h1>Trip Split</h1>
      <nav>
        <Link to={props.token ? "/trips" : "/login"}>Home</Link>
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Sign Up</Link>}
        {token && <Link to="/login" onClick={props.logOut}>Logout</Link>}
        {token&& <Link to="/add">Add a trip</Link>}
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
