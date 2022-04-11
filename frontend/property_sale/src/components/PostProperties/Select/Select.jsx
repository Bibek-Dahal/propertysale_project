import React from 'react'

export default function Select({name,options,onChange}) {

    const changeHandler = (e) => {
        onChange(e);
    }

  return (
    <div>
        <label htmlFor="">{name}</label>
        <select name={name} onChange = {changeHandler}>
            <option value="0">Choose {name}</option>
            {
                options.map(option => <option value = {option}>{option}</option>)
            }
        </select>
    </div>
  )
}
