import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';

import { checkTime } from './actions';
import { PrivateRoute } from "./utils";
import ExampleComponent from "./components/ExampleComponent";
import SignUp from "./components/SignUp/";
import Login from "./components/Login/";
import HomeView from "./components/HomeView/HomeView";
import Message from "./components/Message";
import NavBar from "./components/NavBar/NavBar";
import AddTrip from "./components/TripForm/AddTrip";
import TripView from './components/TripView';
import PeopleForm from './components/PeopleForm';
import ExpenseForm from './components/ExpenseForm';
import DebtForm from './components/DebtForm';
import './App.scss';


const App = (props) => {

  useEffect(() => {
    props.checkTime();
  }, [])

  return (
    <div className="container">
      <NavBar />
      <div>Welcome To Trip Split</div>
      <PrivateRoute path="/add" component={AddTrip} />
      <Message />
      <PrivateRoute path="/secret" component={ExampleComponent} />
      <PrivateRoute exact path="/trips" component={HomeView} />
      <PrivateRoute exact path="/trips/:tripID" component={TripView} />
      <PrivateRoute path="/trips/:tripID/add/person" component={PeopleForm} />
      <PrivateRoute path="/trips/:tripID/add/expense" component={ExpenseForm} />
      <PrivateRoute path="/trips/:tripID/:expID/add" component={DebtForm} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </div>
  );
};

export default connect(null, {checkTime : checkTime})(App);
