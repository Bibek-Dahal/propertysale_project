import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useAuth } from '../../Hooks'
import MyLink from './MyLink'
import { solid,light } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function MobileNav() {
    const {state} = useAuth();
    return (
    <div className = "mobileNav">
            <MyLink to = "/user/profile">
                <span className="icon">
                  <FontAwesomeIcon icon = {solid('user')}/>
                </span>
                Profile
            </MyLink>
            <MyLink to = "/my-properties">
                <span className="icon">
                    <FontAwesomeIcon icon = {solid('house')}/>
                </span>
                My Properties
            </MyLink>
            <MyLink to = "/password-reset">
                <span className="icon">
                    <FontAwesomeIcon icon = {solid('key')}/>
                </span>
                Password reset
            </MyLink>
            {
              state.user &&
              <MyLink to = "/logout">
                  <span className="icon">
                      <FontAwesomeIcon icon = {solid('right-from-bracket')}/>
                  </span>
                  Logout
              </MyLink>
            }
    </div>
  )
}
