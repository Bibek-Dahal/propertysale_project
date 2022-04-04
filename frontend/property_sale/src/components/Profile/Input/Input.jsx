import React from 'react'
import './Input.css';

export default function Input({type,label,onChange,name,value,children}) {

    function ChangeHandler(e){
        console.log(e);
        onChange(e);
    }

    return (
        <div className="userField">
            <label htmlFor="">{label}</label>
            {
                type != "select" ? 
                    <input 
                        type = {type}
                        onChange = {ChangeHandler}
                        name = {name}
                        value = {value}
                        // required
                    />:
                    <select name = {name} value = {value} onChange = {ChangeHandler}>
                        {children}
                    </select>
            }
        </div>
    )
}
