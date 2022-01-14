import React, { useState, useEffect } from 'react';
import Field from '../Field/Field.jsx';
import axios from 'axios';
import './Register.css';

import {
    Routes,
    Link
} from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        pwdrepeat: ''
    })

    const registerHandler = (e) => {
        e.preventDefault();
        // (async function () {
        //     const res = await axios.post('http://localhost:3000/user/register', {
        //         ...user
        //     })
        //     console.log(res);
        // })()
        console.log(formData)
    }
    return (
        <React.Fragment>
            <form onSubmit={registerHandler} className="register">
                <div className="title">
                    <span>start for free</span>
                    <h2>Create new account</h2>
                </div>
                <Field value={formData.username} formData={formData} setFormData={setFormData} type="text" name="username" label="username" />
                <Field value={formData.email} formData={formData} setFormData={setFormData} type="text" name="email" label="email" />
                <Field value={formData.password} formData={formData} setFormData={setFormData} type="password" name="password" label="password" />
                <Field value={formData.pwdrepeat} formData={formData} setFormData={setFormData} type="password" name="pwdrepeat" label="repeat password" />

                <input type="submit" value="Create Account" />
            </form>
            <div>Already a member?
                <Link to="/form/signin/">
                    <span>Sign in</span>
                </Link>
            </div>
        </React.Fragment>
    );
}

export default Register;