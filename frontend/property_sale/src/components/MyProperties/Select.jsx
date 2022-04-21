import React from 'react'

export default function Select({name,options,value,onChange}) {

    const changeHandler = (e) => {
        onChange(e);
    }
    
    return (
        <div className = {`select `}>
            <select name={name} onChange = {changeHandler} value = {value ? value : "0"}>
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
