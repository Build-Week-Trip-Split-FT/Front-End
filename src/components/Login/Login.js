import React, { useState } from "react";
// import styles from './ExampleComponent.scss';


function Login() {
    const [user, setUser] = useState({ name: "", password:""});

    const handleChange = e => {
        setUser({ ...user, [e.target.value]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(user.username)
        console.log(user.password);
    }

    
    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={ e => handleSubmit(e)}>
                <label>
                    Username:
                    <input 
                        type="text" 
                        name="username"
                        onChange={e => handleChange(e)}
                        />
                </label>
                <label>
                    Password:
                    <input 
                        type="text" 
                        name="password"
                        onChange={e => handleChange(e)}
                        />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login;