import React from 'react'
import './Select.css';

export default function Select({name,options,onChange,error}) {

    const changeHandler = (e) => {
        onChange(e);
    }
    
    return (
        <div className = {`select ${error ? "error" : ""}`}>
            <label htmlFor="">{name}</label>
            <select name={name} onChange = {changeHandler}>
                <option value="0">Choose {name}</option>
                {
                    options ? 
                        options.map(option => <option key = {option} value = {option}>{option}</option>):
                        null
                }
            </select>
        </div>
    )
}
