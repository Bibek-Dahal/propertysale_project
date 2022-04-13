import React from 'react'
import './UserContainer.css';

export default function UserContainer({children}) {
  return (
    <div className = "user container wrapper-3">
        {children}
    </div>
  )
}
