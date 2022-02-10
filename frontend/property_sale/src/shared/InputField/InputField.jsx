import React,{useRef} from 'react';
import './InputField.css';

export default function InputField({name,label,type,children,fieldChangeHandler}) {
    const inputRef = useRef(null);
    const labelRef = useRef(null);
    const fieldRef = useRef(null);

    const onFocusHandler = (e) => {
        fieldRef.current.classList.add('focus');
        labelRef.current.classList.add("move");}
    const onBlurHandler = (e) => {
        fieldRef.current.classList.remove('focus');
        e.target.value == '' && labelRef.current.classList.remove("move");
    }


    return(
        <div className={`field ${name} `} ref = {fieldRef}>
            <label htmlFor="" ref = {labelRef}>{label}</label>
            <input type={type}  name = {name} ref = {inputRef} onBlur={onBlurHandler} onFocus={onFocusHandler} onChange = {fieldChangeHandler}/>
            {children}
        </div>
    );
}
