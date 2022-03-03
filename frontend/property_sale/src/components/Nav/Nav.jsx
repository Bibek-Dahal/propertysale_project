import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import User from '../User/User'

export default function Nav() {
    const {state} = useAuth();

  return (
    <nav>
        <Link to = "/user">
            User
        </Link>
        <br />
        <Link to = "/">
            Home
        </Link>
        <br />
        {
            state.user && <Link to = "/logout">Logout</Link>
        }
    </nav>
  )
}
