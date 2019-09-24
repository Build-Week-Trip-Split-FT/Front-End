import React from "react";
import { Route } from "react-router-dom";

import { PrivateRoute } from "./utils";
import ExampleComponent from "./components/ExampleComponent";
import SignUp from "./components/SignUp/";
import Login from "./components/Login/";
import HomeView from "./components/HomeView/HomeView";
import Message from "./components/Message";
import NavBar from "./components/NavBar/NavBar";
import AddTrip from "./components/TripForm/AddTrip";
import TripView from './components/TripForm';
import './App.scss';


const App = () => {
  const logOut = () => {
    localStorage.setItem("token", "");
  };

  return (
    <div className="container">
      <NavBar />
      <div>Welcome To Trip Split</div>
      <ul>
        <li>
          <button onClick={logOut}>Log out</button>
        </li>
      </ul>
      <PrivateRoute path="/add" component={AddTrip} />
      <Message />
      <PrivateRoute path="/secret" component={ExampleComponent} />
      <PrivateRoute path="/homeview" component={HomeView} />
      <PrivateRoute path="/trips/:tripID" component={TripView} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </div>
  );
};

export default App;
