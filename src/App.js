
import React from "react";
import { Route, Link } from "react-router-dom";

import { PrivateRoute } from "./utils";
import ExampleComponent from "./components/ExampleComponent";
import SignUp from "./components/SignUp/";
import Login from "./components/Login/";
import NavBar from "./components/NavBar/NavBar";

const App = () => {

  const logOut = () => {
    localStorage.setItem('token',"");
  }

  return (
    <div>
      <NavBar/>
     <div>
        Welcome To Trip Split
      </div>
      <ul>
        <li>
          <button onClick={logOut}>Log out</button>
        </li>
      </ul>
      <PrivateRoute path="/secret" component={ExampleComponent} />
      <Route path="/signup" component={SignUp} />  
      <Route path ="/login" component={Login} />

    </div>
  );
};

export default App;
