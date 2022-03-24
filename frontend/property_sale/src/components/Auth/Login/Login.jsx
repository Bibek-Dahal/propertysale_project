import React,{useEffect, useState} from 'react';
import InputField from '../InputField/InputField';
import '../form.css';
import './Login.css';
import SocialAuth from '../SocialAuth/SocialAuth';
import axios from 'axios';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import {Nav, Timer} from '../../index';
import {usePopup} from '../../../Hooks/index';
import {useAuth} from '../../../Hooks/index';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import  links from '../../../axiosLinks';
import useSendMail from '../../../Hooks/useSendMail';
import { FullScreenLoading } from '../../shared';
import useNumExtracter from 'num-extracter';

export default function Login() {
    const {dispatch} = useAuth();
    const {showPopup} = usePopup();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {sendEmailVerification} = useSendMail();
    const [isLoading,setIsLoading] = useState(1);
    const [pwdVisible,setPwdVisible] = useState(0);
    const [isSubmitting,setIsSubmitting] = useState(0);
    const [throttleTime,setThrottleTime] = useState(0);
    const [throttleTimeVerifyBtn,setThrottleTimeVerifyBtn] = useState(0);
    const {number} = useNumExtracter();

    useEffect(() => {   
        console.log('login rendered')
        setIsLoading(0);
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
                const res = await axios.post(`${links.login}`,
                formData);
                setIsSubmitting(0);
                try{
                    res.status === 200 
                        && dispatch({type : "logUser",data : res.data}) 
                    showPopup('successfully logged in.')
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
                if(err.response.status === 429){
                    const errString = err.response.data.detail;
                    // const timeLeft = errString.match(/\d+/);
                    console.log('setting throttle time to ',number(errString)[0])
                    setErrors((prev) => ({...prev,status:err.response.status}))
                    setThrottleTime(number(errString)[0])
                    console.log(err.response.data.detail)
                showPopup( `Too many requests`,"error");

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
        console.log('form email',formData.email)
        sendEmailVerification(formData.email,setThrottleTimeVerifyBtn);
    }

    return(
        <React.Fragment>
            {
                !isLoading &&
                    <Nav />
            }
            {   isLoading ? 
                    <FullScreenLoading />:

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
                                    errors?.status != 429 && errors.non_field_errors ? 
                                        <div className = "wholeFormError">
                                            <span>{errors.non_field_errors}</span>
                                            {
                                                (errors.non_field_errors === "E-mail is not verified." )
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
                                        borderColor = {errors?.non_field_errors && errors.status !=="429" ? "red":""}
                                    />
                                    <InputField 
                                        setErrors = {setErrors}
                                        fieldChangeHandler={fieldChangeHandler} 
                                        name="password" 
                                        label="Password"
                                        type={pwdVisible ? "text" : "password"}
                                        borderColor={errors?.non_field_errors && errors.status !=="429" ? "red":""}
                                    >
                                    <div className="eye">
                                        <FontAwesomeIcon 
                                            icon = {pwdVisible ? solid('eye') :  solid('eye-slash')} 
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
                                    <a className = "small-links align-left" href="/password-reset">
                                        Forgot password?
                                    </a>
                                    <button type="submit" className = {` ${isSubmitting ? "inactive" : ""}  ${throttleTime > 0  ? "inactive error" : "" }`}>
                                        {   throttleTime > 0 
                                                ? <div className = "insideBtnContents">
                                                    <FontAwesomeIcon  icon = {solid("exclamation")}/>
                                                    <Timer length={throttleTime} removeTimer={removeTimer}/>
                                                </div>
                                                : isSubmitting ? 
                                                    <FontAwesomeIcon className ="fa-spin" icon = {solid('circle-notch')}/>:
                                                    "Sign In"
                                        }
                                    </button>
                                </form>
                                <SocialAuth />
                            </div>
                    </div>
            </div>}
        </React.Fragment>
    );
}
