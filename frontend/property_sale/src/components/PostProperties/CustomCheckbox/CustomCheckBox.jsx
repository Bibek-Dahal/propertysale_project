import React,{useState} from 'react'
import { useRef } from 'react';
import './CheckBox.css';

export default function CustomCheckBox({name,index,addItem,removeItem}) {

    const inputRef = useRef(null);

    const clickHandler  = (e) => {
        // console.log('clicked')
        // console.log(e.target)
        if(!inputRef.current.checked){ // if checked
            addItem(name)
        }else{ // if not checked
            removeItem(name)
        }
        // console.log(inputRef.current)
    }
    
    return (
        <div className= "facility">
        <input type="checkbox" ref = {inputRef} id = {`${name.split(" ").join("")}${index}`}/>
        <label onClick = {clickHandler} htmlFor={`${name.split(" ").join("")}${index}`}>
            {name}
        </label>
    </div>
)
}
