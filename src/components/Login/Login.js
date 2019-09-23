import React, { useState } from "react";
import { withFormik, Field } from "formik";
import axios from "axios";
import * as yup from "yup";
// import styles from './ExampleComponent.scss';
import "./Login.scss";


function Login() {
    const [user, setUser] = useState({ username: '', password: ''});

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        setUser({ username: '', password: ''})
    }

    
    return (
        <div className="login-page">
            {console.log(user)}
            <h2>Login</h2>
            <form onSubmit={ e => handleSubmit(e)}>
                <label>
                    Username: 
                    <input 
                        type="text" 
                        name="username"
                        placeholder="User Name"
                        onChange={e => handleChange(e)}
                        value={user.username}
                        />
                </label>
                <label>
                    Password:
                    <input 
                        type="text" 
                        name="password"
                        placeholder="Password"
                        onChange={e => handleChange(e)}
                        value={user.password}
                        />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

const LoginWithFormik = withFormik({
    mapPropsToValues: ({ username, password}) => {
        return {
            username: username || '',
            password: password || '',
        };
    },
    //Validation
    validationSchema: yup.object().shape({
        username: yup.string().required,
        password: yup.string().required
    }),

    handleSubmit(values) {
        console.log(values);
    }
})(Login);

export default LoginWithFormik;