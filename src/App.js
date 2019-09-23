
import React from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import ExampleComponent from "./components/ExampleComponent";
import WrappedRegistrationForm from "./components/SignUp/SignUp";

import styles from './App.scss';
import LoginWithFormik from "./components/Login/Login";


const App = props => {
  return (
    <div>

     <div className={styles.app}>
        Welcome To Trip Split
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup/">Sign Up</Link>
        </li>
      </ul>
      {props.title}
      <Route exact path="/" component={ExampleComponent} />
      <Route exact path="/signup/" component={WrappedRegistrationForm} />

      <LoginWithFormik/>

    </div>
  );
};

const mapStateToProps = state => ({
  title: state.title
});

export default connect(
  mapStateToProps,
  {}
)(App);
