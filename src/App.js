import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExampleComponent from "./components/ExampleComponent";
import WrappedRegistrationForm from "./components/SignUp/SignUp";

const App = props => {
  return (
    <div>
      <div>Welcome To Trip Split</div>
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
