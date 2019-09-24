import React from "react";
import { Route, Link } from "react-router-dom";

import { PrivateRoute } from "./utils";
import ExampleComponent from "./components/ExampleComponent";
import SignUp from "./components/SignUp/";
import Login from "./components/Login/";
import HomeView from "./components/HomeView/HomeView";
import Message from "./components/Message";
import NavBar from "./components/NavBar/NavBar";
import AddTrip from "./components/TripForm/AddTrip";
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
      <PrivateRoute path="/addtrip" component={AddTrip} />
      <Message />
      <PrivateRoute path="/secret" component={ExampleComponent} />
      <PrivateRoute path="/homeview" component={HomeView} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </div>
  );
};

export default App;
