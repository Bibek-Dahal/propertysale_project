import React,{useState} from 'react';
import InputField from '../shared/InputField/InputField';
import '../form.css';
import './Register.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';

export default function Register() {
    const [pwdVisible,setPwdVisible] = useState(0);

    const registerHandler = (event) => {

    }

    const eyeClickHandler = (e) => {
        setPwdVisible(!pwdVisible);
    }
    
    return(
        <React.Fragment>
            <Nav />
            <div className='wrapper'>
            <div className="register register-login-container wrapper-2">
                <div className="infoPart registerInfoPart">
                    <div className = "text">
                        <h1>Sign Up to Become a Buyer or Seller</h1>
                        <p>If you already have an account  You can just  
                            <Link className="link" to ="/login">
                                <span >Sign In here!</span>
                            </Link>
                        </p>
                    </div>
                    {/* <div className='blurs blurred-circle-1'></div>
                    <div className='blurs blurred-circle-2'></div> */}
                </div>
                <div className="form-container">
                    <form onSubmit={registerHandler} className = "registerForm">
                        <InputField label="Username" name = "username" type="text" />
                        <InputField label="Email address" name = "email" type="text"/>
                        <InputField label="Password" name = "password1" type={pwdVisible ?"text" : "password"} />
                        <InputField label="Repeat pwd" name = "password2" type={pwdVisible ? "text" : "password"} />
                        <div className="eye">
                            <FontAwesomeIcon 
                                icon = {pwdVisible ? ["fas","eye"] : ["fas","eye-slash"]} 
                                onClick = {eyeClickHandler}
                            />
                        </div>
                        <button>Sign Up</button>
                    </form>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}
