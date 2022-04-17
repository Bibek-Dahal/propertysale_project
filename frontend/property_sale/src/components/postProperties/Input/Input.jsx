import React from 'react'
import './Input.css';

export default function Input({label,error,children}) {
  return (
    <div className = {`Input ${error ? "error" : ""}`}>
        <label>{label}</label>
        {children}
    </div>
  )
}
