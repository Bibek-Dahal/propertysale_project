import React from 'react'

export default function Input({label,children}) {
  return (
    <div>
        <label>{label}</label>
        {children}
    </div>
  )
}
