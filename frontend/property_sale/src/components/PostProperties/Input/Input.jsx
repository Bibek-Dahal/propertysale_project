import React from 'react'
import './Input.css';

export default function Input({label,children}) {
  return (
    <div className = "Input">
        <label>{label}</label>
        {children}
    </div>
  )
}
