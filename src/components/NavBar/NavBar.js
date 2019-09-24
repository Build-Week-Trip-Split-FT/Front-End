import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="container-nav">
      <h1>Trip Split</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="">About</Link>
        <Link to="/homeview">Home View</Link>
        {/* <a href="#">Trips</a>
            <a href="#">About</a>
            <a href="#">Login</a>
            <a href="#">Sign Up</a> */}
      </nav>
    </div>
  );
}

export default NavBar;
