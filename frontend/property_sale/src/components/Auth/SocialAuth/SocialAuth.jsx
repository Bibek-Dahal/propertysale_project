import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './SocialAuth.css';
import GoogleLogin from 'react-google-login';
import Icon from '../../Icons/Icon';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';
import usePopup from '../../../Hooks/usePopup';
import {useLocation,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {brands,solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import Timer from '../../shared/Timer/Timer';
import links from '../../../axiosLinks';
import useNumExtracter from 'num-extracter';

export default function SocialAuth() {
    const [isLoading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {dispatch} = useAuth();
    const {showPopup} = usePopup();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [throttleTime,setThrottleTime] = useState(0);

    const {number} = useNumExtracter();

    // const domain = "https://accounts.google.com/o/oauth2/v2/auth";
    // const scope = "https%3A//www.googleapis.com/auth/drive.metadata.readonly";
    // const state = "state_parameter_passthrough_value";
    // const redirect_uri = "storage_relay";
    // const client_id = "211100097274-8fkbk3jk57sfs0cvn5sd4u4s6vft353q.apps.googleusercontent.com";

    function responseGoogle(response){
        console.log(response)
        const accessToken = response.accessToken;

        async function getAccessToken(){
            try{
                setLoading(true);
                const res = await axios.post(`${links.googleLogin}`,
                {
                    access_token: accessToken,
                }
                )
                    setLoading(false);
                    if(res.status == 200){
                        dispatch({type : "logUser",data : res.data}) 
                        showPopup(`successfully logged in as ${res.data.user.first_name}`,'success')
                    } 
                    navigate(from,{replace:true});
            }catch(err){
                console.log('eror occured: ',err)
                setLoading(false);
                    console.log(err.response);
                    if(err.response.status === 429){
                        const errString = err.response.data.detail;
                        // const timeLeft = errString.match(/\d+/);
                        setThrottleTime(number(errString)[0])
                        showPopup(`Too many requests `,"error")
                    }
            }

        }
        getAccessToken();
    }
    const removeTimer = () => {
        setThrottleTime(0);
    }
  return(
      <div className='socialAuthContainer'>
          <p className="continue-with">
              or continue with
          </p>
          {
              isLoading
          }
            {   throttleTime > 0 
                    ? <div className = "timer" >
                        <FontAwesomeIcon  icon = {solid("exclamation")}/>
                        <Timer length={throttleTime} removeTimer={removeTimer}/>
                    </div>
                    : isLoading ? 
                        <div className="auth-icons">
                            <FontAwesomeIcon className ="fa-spin" icon = {solid('circle-notch')}/>
                        </div>:
                        <div className="auth-icons">
                        <GoogleLogin 
                            clientId = "211100097274-8fkbk3jk57sfs0cvn5sd4u4s6vft353q.apps.googleusercontent.com"
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <Icon icon="google" height = "23"/>       
                                    <span className="text">Continue with google</span>                    
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            // onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />  
                        {/* <a 
                            href={`${domain}?scope=${scope}&include_granted_scopes=true&response_type=token&state=${state}&redirect_uri=${redirect_uri}&client_id=${client_id}`}
                            
                            target = "_blank">
                            <Icon icon="google" height = "23"/>                           
                        </a> */}
                        {/* <a href="#" >
                            <FontAwesomeIcon icon = {brands('facebook')} />
                        </a> */}
                  </div>
            }
          
      </div>
  );
}
