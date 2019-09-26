import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';

import { checkTime } from './actions';
import { PrivateRoute } from "./utils";
import ExampleComponent from "./components/ExampleComponent";
import SignUp from "./components/SignUp/";
import Login from "./components/Login/";
import HomeView from "./components/HomeView/";
import Fetching from './components/Fetching';
import Message from "./components/Message";
import NavBar from "./components/NavBar/";
import AddTrip from "./components/TripForm/";
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
      <Message />
      <Fetching />
      <PrivateRoute path="/secret" component={ExampleComponent} />
      <PrivateRoute exact path="/trips" component={HomeView} />
      <PrivateRoute exact path="/trips/:tripID" component={TripView} />
      <PrivateRoute exact path={["/add", "/trips/:tripID/edit"]} component={AddTrip} />
      <PrivateRoute exact path={["/trips/:tripID/people/add", "/trips/:tripID/people/:pID/edit"]} component={PeopleForm} />
      <PrivateRoute exact path={["/trips/:tripID/expense/add", "/trips/:tripID/expense/:expID/edit"]} component={ExpenseForm} />
      <PrivateRoute exact path={["/trips/:tripID/expense/:expID/debt/add","/trips/:tripID/expense/:expID/debt/:debtID/edit"]} component={DebtForm} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </div>
  );
};

export default connect(null, {checkTime : checkTime})(App);
