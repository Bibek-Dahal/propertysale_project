import React, { useState } from 'react';
import Field from '../Field/Field.jsx';
import './Login.css';

import {
    Link
} from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const loginHandler = (e) => {
        e.preventDefault();
        console.log(formData)
    }

    return (
        <React.Fragment>
            <form onSubmit={loginHandler} className="login">
                <div className="title">
                    <span>start for free</span>
                    <h2>Sign In</h2>
                </div>
                <Field formData={formData} setFormData={setFormData} type="text" name="email" label="email" />
                <Field formData={formData} setFormData={setFormData} type="password" name="password" label="password" />
                <input type="submit" value="SignIn" />
            </form>
            <div>Not a member?
                <Link to="/form/signup/">
                    <span>Sign up</span>
                </Link>
            </div>
        </React.Fragment>
    );
}

export default Login;