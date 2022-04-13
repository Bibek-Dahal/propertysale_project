import React from 'react'
import {NavLink } from 'react-router-dom';

export default function MyLink({to,className,children}) {
  return (
    <NavLink  to = {to} className = {className ? className : ""}>
        {children}
    </NavLink>
  )
}
