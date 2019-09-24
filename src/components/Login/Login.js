import React, { useState } from "react";
import { withFormik } from "formik";
import { connect } from 'react-redux';
import * as Yup from "yup";
import { Form, Button, Icon, Input } from 'antd';

import { logInUser } from '../../actions';

import "./Login.scss";


function Login( { errors, touched, status, logInUser, history }) {
    const [user, setUser] = useState({username: "", password:""});

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    
    //USED W/ REACT, CHANGED FOR FORMIK
    const handleSubmit = e => {
        e.preventDefault();
        if (user.username && user.password) {
            logInUser(user)
            setUser({ username: '', password: ''})
            history.push("/");
        }
    }

    return (
        <div className="login-page">
            <h2>Login</h2>
            <Form onChange={handleChange}>
                <div>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="User Name"
                        value={user.username}
                        />
                    {touched.username && errors.username && <p>{errors.username}</p>}
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        />
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </div>
                <Button type="primary" block onClick={(e) => handleSubmit(e)}>Submit</Button>
            </Form>
        </div>
    )
}

//Formik
const LoginWithFormik = withFormik({
    mapPropsToValues: ({ username, password}) => {
        return {
            username: username || '',
            password: password || ''
        };
    },
    //Validation
    validationSchema: Yup.object().shape({
        username: Yup.string("Username is not valid").required("Username is required"),
        password: Yup.string().required("Password is required")
    }),
})(Login);

export default connect(null, {logInUser: logInUser})(LoginWithFormik);
