import React,{useEffect, useState} from 'react';
import InputField from '../shared/InputField/InputField';
import '../form.css';
import './Login.css';
import SocialAuth from '../SocialAuth/SocialAuth';
import axios from 'axios';

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';

export default function Register() {
    const [pwdVisible,setPwdVisible] = useState(0);
    const [isSubmitting,setIsSubmitting] = useState(0);
    const [formData,setFormData] = useState({
        email:"",
        password:"",
    });

    const loginHandler = (event) => {
        event.preventDefault();
        console.log('submitted',formData)
        
        const LogInUser = async () => {
            try{
                const res = await axios.post('http://127.0.0.1:8000/api/account/login',
                formData)
                console.log(res);
            }catch(error){
                console.log(error.response.data);
            }
        }
        
        LogInUser();
    }
    const fieldChangeHandler = (event) => {
        setFormData((prevData) => ({...prevData , [event.target.name] : event.target.value}))
        console.log(formData)
    }

    const eyeClickHandler = (e) => {
        setPwdVisible(!pwdVisible);
    }

    return(
        <React.Fragment>
            <Nav />
            <div className='wrapper'>
                <div className="login register-login-container wrapper-2">
                    <div className="infoPart loginInfoPart">
                        <div className = "text">
                            <h1>Sign In to Buy Your Dream Property</h1>
                            <p>If you don’t have an account You can just 
                                <Link className="link" to="/register">
                                    <span >Register here!</span>
                                </Link>
                            </p>
                        </div>
                        {/* <div className='blurs blurred-circle-1'></div>
                        <div className='blurs blurred-circle-2'></div> */}
                    </div>
                    <div className="form-container">
                        <form onSubmit={loginHandler} className = "loginForm">
                            <InputField label="Email address" name = "email" type="text" fieldChangeHandler={fieldChangeHandler}/>
                            <InputField label="Password" name = "password" type={pwdVisible ?"text" : "password"} fieldChangeHandler={fieldChangeHandler}>
                            <div className="eye">
                                <FontAwesomeIcon 
                                    icon = {pwdVisible ? ["fas","eye"] : ["fas","eye-slash"]} 
                                    onClick = {eyeClickHandler}
                                />
                            </div>
                            </InputField>
                            <button type="submit"
                                className = {isSubmitting && "inactive"}
                            >
                                {isSubmitting ? 
                                 <FontAwesomeIcon className ="fa-spin" icon = {["fas","circle-notch"]}/>:
                                 "Sign Up"
                                }
                            </button>
                        </form>
                        <SocialAuth />
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}
