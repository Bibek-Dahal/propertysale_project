import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useRef} from 'react';
import { useEffect } from 'react';
import './InputField.css';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function InputField({name,label,type,fieldChangeHandler,error,children,borderColor,setErrors,value}) {
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
    const onChangeHandler = (e) => {
        fieldRef.current.classList.remove('error')
        fieldChangeHandler(e);
    }

    return(
        <div className={`field ${name} ${error || borderColor == "red" ? "error" : ""}`} ref = {fieldRef}>
            <label htmlFor="" ref = {labelRef}>{label}</label>
            <input 
                type={type}  
                name = {name} 
                ref = {inputRef} 
                // value = {value && value} 
                onBlur={onBlurHandler} 
                onFocus={onFocusHandler} 
                onChange = {onChangeHandler} 
                required
            />
            {
                error && 
                <div className="error-tooltip">
                    <FontAwesomeIcon icon={solid('info-circle')} />
                    <div className="msg">{error}</div>
                </div>
            }
            {/* see what is this for not, sure forgot */}
            {children}
        </div>
    );
}
