import React, { useState, useRef, useEffect } from 'react';
import './Field.css';

const Field = ({ value, type, name, label, setFormData, formData }) => {
    const field = useRef(null);

    const onFocusHandler = (e) => {
        const label = e.target.previousElementSibling;
        label.classList.add('move');
        field.current.classList.add('focused');
    }

    const onBlurHandler = (e) => {
        const label = e.target.previousElementSibling;
        if (e.target.value === "") label.classList.remove('move');
        field.current.classList.remove('focused');
    }

    const changeHandler = (e) => {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className="field" ref={field} >
            <label htmlFor={name}>{label}</label>
            <input autoComplete="off" className="fs--small" type={type} name={name} id={name} onChange={changeHandler} onBlur={onBlurHandler} onFocus={onFocusHandler} />
            {
                type === "password" && <span className="seePassword">
                </span>
            }
        </div >
    )
}

export default Field;