import React from 'react'
import { useAuth } from '../../Hooks'
import MyLink from './MyLink'

export default function MobileNav() {
    const {state} = useAuth();
    return (
    <div className = "mobileNav">
           {    state.user &&
                <MyLink to = "/logout">
                    Logout
                </MyLink>
            }
    </div>
  )
}
