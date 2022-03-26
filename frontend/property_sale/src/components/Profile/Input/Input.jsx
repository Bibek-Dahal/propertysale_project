import React from 'react'
import { useState } from 'react';
import './Input.css';

export default function Input({name,value,label,type,children,fieldHandler}) {

  function changeHandler(e){
    fieldHandler(e);
  }
 
  return (
    <React.Fragment>
            <div className="input-field-profile">
              <label>{label}</label>
              {
                type !== 'select' ?
                  <input 
                    type = {type} 
                    onChange = {changeHandler}
                    value = {value}
                    name = {name}
                  />:
                  <select>
                    {children}
                  </select>
              }
            </div>  
            
          
    </React.Fragment>
  )
}
