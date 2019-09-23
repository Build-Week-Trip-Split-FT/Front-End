import React, { useState } from "react";
// import styles from './ExampleComponent.module.scss';

function Login() {
    const [username, setUsername] = useState("");
    
    const changeHandler = e => {
        setUsername(e.target.value);
    }

    console.log(changeHandler);
    return (
        <div className="login-page">
            <h2>Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" onChange={e => changeHandler(e)}/>
                </label>
            </form>
        </div>
    )
}

export default Login;