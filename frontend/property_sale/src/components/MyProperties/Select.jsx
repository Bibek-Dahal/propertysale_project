import React,{useState} from 'react'

export default function Select({name,options,value,onChange}) {
    const [val,setVal] = useState(value);
    
    const changeHandler = (e) => {
        setVal(e.target.value)
        onChange(e);
    }
    
    return (
        <div className = {`select `}>
            <select name={name} onChange = {changeHandler} value = {val ? val : "0"}>
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
