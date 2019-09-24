
import React from "react";
import { Route, Link } from "react-router-dom";

import { PrivateRoute } from "./utils";
import ExampleComponent from "./components/ExampleComponent";
import SignUp from "./components/SignUp/";
import Login from "./components/Login/";

const App = () => {

  const logOut = () => {
    localStorage.setItem('token',"");
  }

  return (
    <div>
     <div>
        Welcome To Trip Split
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to ="/secret">You can view this if youre logged in</Link>
        </li>
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
