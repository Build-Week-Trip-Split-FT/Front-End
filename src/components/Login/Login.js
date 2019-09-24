import React, { useState } from "react";
import { withFormik, Form } from "formik";
import { connect } from 'react-redux';
import * as Yup from "yup";
import styled from 'styled-components';
import { Button, Input, Tooltip, Icon } from 'antd';
import ReactDOM from 'react-dom';

import { logInUser } from '../../actions';

import "./Login.scss";


const StyledInput = styled.input`
    margin: 5% 0;
    width: 200px;
`;

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
                    <Input 
                        type="text" 
                        name="username"
                        placeholder="User Name"
                        value={user.username}
                        
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={<Tooltip title="Extra information">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} 
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
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={<Tooltip title="Extra information">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} 
                        />
                        </Tooltip>
                    }
                    />
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