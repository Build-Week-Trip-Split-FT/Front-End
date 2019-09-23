import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
// import styles from './ExampleComponent.scss';
import "./Login.scss";


function Login( { errors, touched, status }) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        if(status) {
            setUser([...user, status]);
        }
    }, [user])

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    
    //USED W/ REACT, CHANGED FOR FORMIK
    const handleSubmit = e => {
        e.preventDefault();
        setUser({ username: '', password: ''})
        console.log(user);
    }
    return (
        <div className="login-page">
            <h2>Login</h2>
            <Form>
                <div>
                    <Field 
                        type="text" 
                        name="username"
                        placeholder="User Name"
                        />
                    {touched.username && errors.username && <p>{errors.username}</p>}
                </div>
                <div>
                    <Field 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        />
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </div>
                <button type="submit">Submit</button>
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
        console.log(values);
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
    }
})(Login);








export default LoginWithFormik;