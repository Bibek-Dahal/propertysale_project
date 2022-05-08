import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import './ChangePassword.css';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
// import axiosInstance from '../utils/axiosInstance';
import axiosLinks from '../../axiosLinks';
import { useAuth, usePopup } from '../../Hooks';
import Illustration from './Security';
import useAxios from '../../Hooks/useAxios.js'
export default function ChangePassword() {
  const axiosInstance = useAxios();
  const [data,setData] = React.useState({
    old_password : "",
    new_password1 : "",
    new_password2 : ""
  })
  const [isSubmitting,setIsSubmitting] = React.useState(0);

  const [error,setError] = React.useState({})

  const {showPopup} = usePopup();
  const{dispatch} = useAuth();

  const fieldChangeHandler = (e) => {
    setData(prev => {
      return{
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const changePasswordHandler = (e) => {
    e.preventDefault();
    console.log('changed',data);
    setIsSubmitting(1);
    setError({});

    (
      async function(){
        try{
          const res = await axiosInstance.post(axiosLinks.changePassword,data);
          setIsSubmitting(0)
          console.log(res)
          showPopup(res.data.detail)
          dispatch({type : "logoutUser"})
        }catch(err){
          console.log(err);
          setIsSubmitting(0)
          setError(prev => {
            return{
              ...prev,
              ...err.response.data
            }
          })
          if(err.response.status === 429){
            setError(prev => {
              return{
                ...prev,
                'throttle' : err.response.data.detail
              }
            })
          }
        }
      }
    )()
  }

  return (
    <div className="change_password">
     
      <form  onSubmit = {changePasswordHandler}>
        <h1>Change password</h1>
          {
            Object.keys(error).length !== 0 &&
            <ul className="error">
              { error.old_password !== "" && <li>{error.old_password}</li>}
              { error.new_password1 !== "" && <li>{error.new_password1}</li>}
              { error.new_password2 !== "" && <li>{error.new_password2}</li>}
              { error.throttle !== "" && <li>{error.throttle}</li>}
            </ul>
          }
          <div className="cp-field">
            <label htmlFor="">old password</label>
            <div>
              <input type="password"  name = "old_password" onChange = {fieldChangeHandler}/>
            <div className="icon">
              <FontAwesomeIcon icon = {solid('eye-slash')} />
            </div>
            </div>
          </div>
          <div className="cp-field">
            <label htmlFor="">new password</label>
            <div>
              <input type="password"  name = "new_password1" onChange = {fieldChangeHandler}/>
            <div className="icon">
              <FontAwesomeIcon icon = {solid('eye-slash')} />
            </div>
            </div>
          </div>
          <div className="cp-field">
            <label htmlFor="">confirm new password</label>
            <div>
              <input type="password"  name = "new_password2" onChange = {fieldChangeHandler}/>
            <div className="icon">
              <FontAwesomeIcon icon = {solid('eye-slash')} />
            </div>
            </div>
          </div>
          <input type="submit" value = {
            isSubmitting ? 
            <FontAwesomeIcon className = "fa-spin" icon = {solid('circle-notch')} /> :
            "change"
          }/>
      </form>
      <div className="illustration">
        <Illustration />
      </div>
    </div>
  )
}
