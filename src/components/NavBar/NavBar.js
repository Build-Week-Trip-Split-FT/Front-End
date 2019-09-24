import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="container-nav">
      <h1>Trip Split</h1>
      <nav>
        <Link to="/trips">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/trips">Trips</Link>
        <Link to="/add">Add a trip</Link>
      </nav>
    </div>
  );
}

export default NavBar;
