import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from 'react-redux';
import axios from "axios";
import * as Yup from "yup";

import { logInUser } from '../../actions';
import "./Login.scss";


function Login( { errors, touched, status, logInUser }) {
    const [user, setUser] = useState({username: "", password:""});

    useEffect(() => {
        if(status) {
            setUser([...user, status]);
        }
    }, [user])

<<<<<<< HEAD
=======
    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    
    //USED W/ REACT, CHANGED FOR FORMIK
    const handleSubmit = e => {
        e.preventDefault();
        logInUser(user)
        setUser({ username: '', password: ''})
    }

>>>>>>> a68ed321fca859294d6acbaf733eb9fafcd3f840
    return (
        <div className="login-page">
            <h2>Login</h2>
            <Form onChange={handleChange}>
                <div>
                    <Field 
                        type="text" 
                        name="username"
                        placeholder="User Name"
                        value={user.username}
                        />
                    {touched.username && errors.username && <p>{errors.username}</p>}
                </div>
                <div>
                    <Field 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        />
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </div>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
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

    handleSubmit(values, { resetForm, setSubmitting }) {
        axios
        .post("", values)
        .then(res => {
            console.log(res.data)
            resetForm();
            setSubmitting(false)
        })
        .catch(error => {
            console.log(error.response)
            
        })
    },
    logInUser
})(Login);

<<<<<<< HEAD
export default LoginWithFormik;
=======
export default connect(null, {logInUser: logInUser})(LoginWithFormik);
>>>>>>> a68ed321fca859294d6acbaf733eb9fafcd3f840
