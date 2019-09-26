import React, { useState, useEffect } from "react";
import { withFormik, Form } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Button, Input, Tooltip, Icon } from "antd";

import { logInUser } from "../../actions";

import "./Login.scss";


function Login({ logInUser, history, token }) {
  const [user, setUser] = useState({ username: "", password: "" });

  useEffect(() => {
    if (token) {
      history.push("/trips");
    }
  }, [history, token])

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //USED W/ REACT, CHANGED FOR FORMIK
  const handleSubmit = e => {
    e.preventDefault();
    if (user.username && user.password) {
      logInUser(user);
      setUser({ username: "", password: "" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-page">
        <h2 style={{ marginTop: 10 }}>Login</h2>
        <Form onChange={handleChange}>
          <div>
            <Input
              type="text"
              name="username"
              placeholder="User Name"
              value={user.username}
              style={{ marginBottom: 10, width: "100%", height: 40 }}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              suffix={
                <Tooltip title="Extra information">
                  <Icon
                    type="info-circle"
                    style={{ color: "rgba(0,0,0,.45)" }}
                  />
                </Tooltip>
              }
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              style={{ marginBottom: 10, height: 40 }}
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              suffix={
                <Tooltip title="Extra information">
                  <Icon
                    type="info-circle"
                    style={{ color: "rgba(0,0,0,.45)" }}
                  />
                </Tooltip>
              }
            />
          </div>
          <Button
            type="primary"
            block
            onClick={e => handleSubmit(e)}
            style={{ marginBottom: 15 }}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

//Formik
const LoginWithFormik = withFormik({
  mapPropsToValues: ({ username, password }) => {
    return {
      username: username || "",
      password: password || ""
    };
  },
  //Validation
  validationSchema: Yup.object().shape({
    username: Yup.string("Username is not valid").required(
      "Username is required"
    ),
    password: Yup.string().required("Password is required")
  })
})(Login);

const mapStateToProps = state => {
  return {
    token: state.token
  }
}
export default connect(
  mapStateToProps,
  { logInUser: logInUser }
)(LoginWithFormik);
