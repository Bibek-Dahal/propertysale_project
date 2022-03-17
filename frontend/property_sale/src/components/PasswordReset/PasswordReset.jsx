import React from 'react'
import { Nav } from '..'
import InputField from '../Auth/InputField/InputField'
import './PasswordReset.css';

export default function PasswordReset() {
  return (
    <React.Fragment>
        <Nav />
        <div className="passwordResetContainer wrapper">
            <div className="infoText">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, molestias?
            </div> 
            <form>
                {/* {name,label,type,fieldChangeHandler,error,children,borderColor,setErrors} */}
                <InputField 
                    // fieldChangeHandler={fieldChangeHandler} 
                    name="email" 
                    label="Email address"
                    type="text"
                />
            </form>
        </div>
    </React.Fragment>
  )
}
