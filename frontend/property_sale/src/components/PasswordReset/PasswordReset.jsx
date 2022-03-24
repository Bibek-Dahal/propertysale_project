import React,{useState} from 'react'
import { Nav } from '..'
import InputField from '../Auth/InputField/InputField'
import './PasswordReset.css';
import MobileIllustration from './BeforeEmailSent';
import EmailSent from './EmailSent';
import {FullScreenLoading} from '../shared/index.js';
import {  useAuth, usePopup, useWindowSize } from '../../Hooks';
import useSendMail from '../../Hooks/useSendMail';
import useNumExtracter from 'num-extracter';

export default function PasswordReset() {
    const size = useWindowSize();
    const [email,setEmail] = useState('');
    const [errors,setErrors] = useState({});
    const [emailSent,setEmailSent] = useState(0);
    const [isLoading,setIsLoading] = useState(0);
    const {sendPasswordResetMail} = useSendMail();
    const {showPopup} = usePopup();
    const {number} = useNumExtracter();
    const {state} = useAuth();
    
    function passwordChangeHandler(e){
        e.preventDefault();
        console.log(email);
        setIsLoading(1);
        // sendPasswordResetMail(setEmailSent,email,setIsLoading);
        sendPasswordResetMail(email)
            .then(res => {
                console.log('inside promise res')
                console.log(res);
                setIsLoading(0);
                if(res.status === 200){
                    setEmailSent(1);
                    showPopup(res.data.detail)
                }
            }).catch(err => {
                console.log('inside err')
                if(err.status === 400){
                    setErrors(err.data)
                }
                if(err.status === 429){
                    showPopup(`Too many request.  Retry in ${number(err.data.detail)[0]}s`,"error");
                }
                setIsLoading(0);

            })
    }
    
    function fieldChangeHandler(e){
        setEmail(e.target.value);
    }   

    function resendResetMailHandler(e){
        console.log('inside')
        console.log(email)
        e.preventDefault();
        setIsLoading(1);
        sendPasswordResetMail(email)
            .then(res => {
                console.log('inside promise res')
                console.log(res);
                setIsLoading(0);
                if(res.status === 200){
                    setEmailSent(1);
                    showPopup(res.data.detail)
                }
            }).catch(err => {
                console.log('inside err')
                if(err.status === 400){
                    setErrors(err.data)
                }
                if(err.status === 429){
                    showPopup(`Too many request.  Retry in ${number(err.data.detail)[0]}s`,"error");
                }
                setIsLoading(0);

            })
        
    }

    return (
        <React.Fragment>
            {
                size.width > 600 && 
                     <Nav />
            }
            {   isLoading ? 
                    <FullScreenLoading />:
                    <div className="passwordResetContainer wrapper">
                    {
                        !emailSent ?
                            <div className="infoText">
                                <h1>Forgot your password?</h1>
                                <p>Enter your registered email below to receive password reset instruction</p>
                            </div>:
                            <div className="infoText">
                                <h1>Email has been sent.</h1>
                                <p>Please check your inbox and click on the received link to reset a password</p>
                            </div>
                    }
                        <div className="illustration">
                            {emailSent ?
                                <EmailSent />:
                                <MobileIllustration />}
                        </div>
                    <div className="form">
                    {    
                            !emailSent ? 
                                <form onSubmit={passwordChangeHandler}>
                                    {/* {name,label,type,fieldChangeHandler,error,children,borderColor,setErrors} */}
                                    <InputField 
                                        // fieldChangeHandler={fieldChangeHandler} 
                                        name="email" 
                                        label="Email address"
                                        type="text"
                                        // value = {state?.user.email}
                                        fieldChangeHandler={fieldChangeHandler}
                                        error = {errors && errors.email}
                                        setErrors = {setErrors}
                                    />
                                    <span>
                                        Remember password?
                                        <a href = "/login" className="link">Login</a>
                                    </span>
                                    <button className = "styledBtn" type = "submit">Send</button>
                                </form>:
                                <form onSubmit = {resendResetMailHandler}>
                                    <a href = "/login" className = "styledBtn">Login</a>
                                    <span>
                                        Didn't receive the link?
                                        <button type = "submit" className="link resend">Resend</button>
                                    </span>
                                </form>
                        }
                    </div>
                </div>
            }
            
        </React.Fragment>
    )
}
