import React,{useEffect, useState} from 'react';
import InputField from '../InputField/InputField';
import '../form.css';
import './Login.css';
import SocialAuth from '../SocialAuth/SocialAuth';
import axios from 'axios';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import Timer from '../../shared/Timer/Timer';
import usePopup from '../../../Hooks/usePopup';
import useAuth from '../../../Hooks/useAuth';

export default function Login() {
    const {dispatch} = useAuth();

    const {showPopup} = usePopup();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const [pwdVisible,setPwdVisible] = useState(0);
    const [isSubmitting,setIsSubmitting] = useState(0);
    const [throttleTime,setThrottleTime] = useState(0);
    const [throttleTimeVerifyBtn,setThrottleTimeVerifyBtn] = useState(0);

    useEffect(() => {   
        console.log('login rendered')
    },[])

    const [formData,setFormData] = useState({
        email : "",
        password : ""
    })
    const [errors,setErrors] = useState({})

    const removeTimer = () => {
        setErrors(prevErr => ({...prevErr,status : ""}))
        setThrottleTime(0);
        setThrottleTimeVerifyBtn(0);
    }

    const loginHandler = (event) => {
        event.preventDefault();
        setIsSubmitting(1);
        const LogInUser = async () => {
            try{
                const res = await axios.post('http://127.0.0.1:8000/api/account/login/',
                formData);
                setIsSubmitting(0);
                try{
                    res.status == 200 
                        && dispatch({type : "logUser",data : res.data}) 
                    showPopup('successfully logged in')
                }catch(err){
                    console.log(err);
                }
                console.log(res);
                navigate(from,{replace:true});
            }catch(err){
                setIsSubmitting(0);
                const errBody = err.response.data
                console.log('error = ',errBody)
                setErrors((prev) => errBody);
                console.log('errors = ',errors)
                if(err.response.status == "429"){
                    const errString = err.response.data.detail;
                    const timeLeft = errString.match(/\d+/);
                    console.log('setting throttle time to ',timeLeft)
                    setErrors((prev) => ({...prev,status:err.response.status}))
                    setThrottleTime(timeLeft[0])
                    console.log(err.response.data.detail)
                }
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

    const sendVerificationHandler = () => {

        async function sendMail(){
         try{
            const res = await axios.post('http://127.0.0.1:8000/api/account/registration/resend-email/',
            {
                email : formData.email
            })
            console.log(res);
            res.status == 200 && showPopup(`verification email is sent to ${formData.email}`);
         }catch(err){
            console.log(err.response);
            if(err.response.status == "429"){
                const errString = err.response.data.detail;
                const timeLeft = errString.match(/\d+/);
                setThrottleTimeVerifyBtn(timeLeft[0])
            }
         }
        }
        sendMail();
    }

    return(
        <React.Fragment>
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
                    </div>
                    <div className="form-container">
                         {
                            errors?.status != "429" && errors.non_field_errors ? 
                                <div className = "wholeFormError">
                                    <span>{errors.non_field_errors}</span>
                                    {
                                        (errors.non_field_errors == "E-mail is not verified." )
                                            && 
                                            <span>Check your mail or click on verify button below</span>
                                    }
                                </div>
                                :null
                        }
                        <form onSubmit={loginHandler} className = "loginForm">
                            <InputField 
                                setErrors = {setErrors}
                                fieldChangeHandler={fieldChangeHandler} 
                                type="text" 
                                name="email" 
                                label="Enter your email address"
                                error = {errors?.email && errors.email}
                                borderColor = {errors?.non_field_errors && errors.status !="429" ? "red":""}
                            />
                            <InputField 
                                setErrors = {setErrors}
                                fieldChangeHandler={fieldChangeHandler} 
                                name="password" 
                                label="Password"
                                type={pwdVisible ? "text" : "password"}
                                borderColor={errors?.non_field_errors && errors.status !="429" ? "red":""}
                            >
                            <div className="eye">
                                <FontAwesomeIcon 
                                    icon = {pwdVisible ? ["fas","eye"] : ["fas","eye-slash"]} 
                                    onClick = {eyeClickHandler}
                                />
                            </div>

                            </InputField>
                            {
                                (errors.non_field_errors == "E-mail is not verified." )
                                    && 
                                        <span onClick = {sendVerificationHandler} className = "sendVerificationMailBtn">
                                            {
                                                throttleTimeVerifyBtn > 0 
                                                    ? <Timer length={throttleTimeVerifyBtn} removeTimer={removeTimer} />
                                                    : "Verify now"
                                            }
                                        </span>
                            }
                            <button type="submit" className = {` ${isSubmitting ? "inactive" : ""}  ${throttleTime > 0  ? "inactive error" : "" }`}>
                                {   throttleTime > 0 
                                        ? <div className = "insideBtnContents">
                                            <FontAwesomeIcon  icon = {["fas","exclamation"]}/>
                                            <Timer length={throttleTime} removeTimer={removeTimer}/>
                                        </div>
                                        : isSubmitting ? 
                                            <FontAwesomeIcon className ="fa-spin" icon = {["fas","circle-notch"]}/>:
                                            "Sign In"
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