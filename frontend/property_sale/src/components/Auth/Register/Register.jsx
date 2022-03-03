import React,{useState} from 'react';
import InputField from '../InputField/InputField';
import '../form.css';
import './Register.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Timer from '../../shared/Timer/Timer';
import usePopup from '../../../Hooks/usePopup';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Register() {
    const [isSubmitting,setIsSubmitting] = useState(0);
    const {showPopup} = usePopup();
    const [pwdVisible,setPwdVisible] = useState(0);
    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password1:"",
        password2:"",
    })
    const [errors,setErrors] = useState({});
    const navigate = useNavigate();
    const [throttleTime,setThrottleTime] = useState(0);

    const removeTimer = () => {
        setThrottleTime(0);
        setErrors(prevErr => ({...prevErr,status : ""}))
    }

    const registerHandler = (event) => {
        event.preventDefault();
        setIsSubmitting(1);
        const LogInUser = async () => {
            try{
                const res = await axios.post('http://127.0.0.1:8000/api/account/registration/',
                formData)
                setIsSubmitting(0);
                showPopup('successfully signed up');
                navigate("/login");
            }catch(err){
                setIsSubmitting(0);
                const errBody = err.response.data
                console.log(errBody)
                setErrors((prevErr) => (prevErr = errBody));
                console.log('error = ',errors)
                console.log(errBody.non_field_errors == "E-mail is not verified.")
                if(err.response.status == "429"){
                    const errString = err.response.data.detail;
                    const timeLeft = errString.match(/\d+/);
                    console.log('setting throttle time to ',timeLeft[0])
                    setThrottleTime(timeLeft)
                    setErrors(prevData => ({...prevData,status:err.response.status}))
                }
                console.log('error = ',errors)
            }
        }
        LogInUser();
    }

    const fieldChangeHandler = (event) => {
        setFormData((prevData) => ({...prevData , [event.target.name] : event.target.value}))
    }

    const eyeClickHandler = (e) => {
        setPwdVisible(!pwdVisible);
    }
    
    return(
        <React.Fragment>
            {console.log('inside return errors = ',errors)}
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
                </div>
                <div className="form-container">
                        {
                            errors?.status != "429" && errors.non_field_errors ? 
                                <div className = "wholeFormError">
                                    {errors.non_field_errors}
                                   
                                </div>
                                :null
                        }
                    <form onSubmit={registerHandler} className = "registerForm">
                        <InputField error = {errors?.username && errors.username} label="Username" name = "username" type="text"  setErrors = {setErrors} fieldChangeHandler={fieldChangeHandler}/>
                        <InputField error = {errors?.email && errors.email} label="Email address" name = "email" type="text" setErrors = {setErrors} fieldChangeHandler={fieldChangeHandler}/>
                        <InputField error = {errors?.password1 && errors.password1}  label="Password" name = "password1" type={pwdVisible ?"text" : "password"}  setErrors = {setErrors} fieldChangeHandler={fieldChangeHandler}/>
                        <InputField error = {errors?.password2 && errors.password2} label="Repeat pwd" name = "password2" type={pwdVisible ? "text" : "password"}  setErrors = {setErrors} fieldChangeHandler={fieldChangeHandler}/>
                        <div className="eye">
                            <FontAwesomeIcon 
                                icon = {pwdVisible ? solid('eye') : solid('eye-slash')} 
                                onClick = {eyeClickHandler}
                            />
                        </div>
                        <div className="terms-conditions">
                            <input type="checkbox" name = "aggreed" required/>
                            I agree with the 
                            <a href = "#">terms and conditions</a>
                        </div>
                        <button type="submit"
                                className = {` ${isSubmitting ? "inactive" : ""}  ${throttleTime > 0  ? "inactive error" : "" }`}
                            >
                              {   throttleTime > 0 
                                            ? <div className = "insideBtnContents">
                                                <FontAwesomeIcon  icon = {["fas","exclamation"]}/>
                                                <Timer length={throttleTime} removeTimer={removeTimer}/>
                                            </div>
                                            : isSubmitting ? 
                                                <FontAwesomeIcon className ="fa-spin" icon = {["fas","circle-notch"]}/>:
                                                "Sign Up"
                                    }
                            </button>
                    </form>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}
