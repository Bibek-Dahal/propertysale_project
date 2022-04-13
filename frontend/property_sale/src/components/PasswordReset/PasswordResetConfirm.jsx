import React,{useState} from 'react'
import { Nav } from '..'
import { FullScreenLoading } from '../shared';
import EmailSent from './EmailSent';
import InputField from '../Auth/InputField/InputField';
import { usePopup, useWindowSize } from '../../Hooks';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import links from '../../axiosLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function PasswordResetConfirm() {

  const navigation = useNavigate();
  const {showPopup} = usePopup();
  const [formData,setFormData] = useState({
    new_password1:"",
    new_password2:""
  })
  const [isLoading,setIsLoading] = useState(0);
  const [errors,setErrors] = useState({});  
  const size = useWindowSize();
  const {uid,token} = useParams();

  function changePasswordHandler(e){
    e.preventDefault();
    console.log(formData);
    console.log(uid,token);
    setIsLoading(1);
    async function confirmChange(){
      try{
        const res = await axios.post(`${links.passwordChange}/${uid}/${token}/`,{
          new_password1 : formData.new_password1,
          new_password2 : formData.new_password2,
          uid : uid,
          token : token
        });
        setIsLoading(0);
        console.log(res);
        if(res.status === 200){
          showPopup(`Password changed successfully`);
          navigation('/login');
        }
      }catch(err){
        setIsLoading(0);
        console.log(err.response);
        
        showPopup(err.response.data.new_password1 ? err.response.data.new_password1 : err.response.data.new_password2,'error')
      }
    }

    confirmChange();

  }

  function fieldChangeHandler(e){
    // console.log(e);
    setFormData(prev => {
      return{
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  return (
    <React.Fragment>
        {
          size.width > 500 && <Nav /> 
        }
        {   isLoading ? 
                    <FullScreenLoading />:
                    <div className="passwordResetContainer wrapper passwordResetConfirmContainer wrapper">
                    {
                            <div className="infoText">
                                <h1>Let's change your password?</h1>
                                <p>Enter new password below and make sure to remember this time</p>
                            </div>
                    }
                        <div className="illustration">
                            <EmailSent />
                        </div>
                    <div className="form">
                    {    
                            // !emailSent ? 
                                <form 
                                  className='passwordResetConfirmform' 
                                  onSubmit = {changePasswordHandler}
                                >
                                    {/* {name,label,type,fieldChangeHandler,error,children,borderColor,setErrors} */}
                                    <InputField 
                                        fieldChangeHandler={fieldChangeHandler} 
                                        name="new_password1" 
                                        label="New password"
                                        type="password"
                                        error = {errors && errors.new_password1}
                                        setErrors = {setErrors}
                                    />
                                   <InputField 
                                        name="new_password2" 
                                        label="Confirm new password"
                                        type="password"
                                        fieldChangeHandler={fieldChangeHandler}
                                        error = {errors && errors.new_password1}
                                        setErrors = {setErrors}
                                    />
                                    <button className = "styledBtn" type = "submit">
                                          Change Password
                                    </button>
                                </form>
                        }
                    </div>
                </div>
            }
    </React.Fragment>
  )
}
