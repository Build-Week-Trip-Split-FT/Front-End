import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
// import styles from './ExampleComponent.scss';
import "./Login.scss";


function Login( { isSubmitting, errors, touched, status }) {
    const [user, setUser] = useState({ username: '', password: ''});

    useEffect(() => {
        if(status) {
            setUser([...user, status]);
        }
    }, [status])

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    
    //USED W/ REACT, CHANGED FOR FORMIK
    const handleSubmit = e => {
        e.preventDefault();
        setUser({ username: '', password: ''})
    }
    return (
        <div className="login-page">
            <h2>Login</h2>
            <Form>
                <div>
                    Username: 
                    <Field 
                        type="text" 
                        name="username"
                        placeholder="User Name"
                        onChange={e => handleChange(e)}
                        value={user.username}
                        />
                    {touched.username && errors.username && <p>{errors.username}</p>}
                </div>
                <div>
                    Password:
                    <Field 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        onChange={e => handleChange(e)}
                        value={user.password}
                        />
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </Form>
        </div>
    )
}

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
        const dataConfirm = { date: "Data Confirmed"}
        axios
        .post("https://reqres.in/api/users", dataConfirm)
        .then(res => {
            console.log(res.data)
            resetForm();
            setSubmitting(false)
        })
        .catch(error => {
            console.log(error)
            
        })
    }
})(Login);








export default LoginWithFormik;