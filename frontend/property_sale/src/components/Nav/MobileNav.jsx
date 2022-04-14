import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useEffect} from 'react'
import { useAuth } from '../../Hooks'
import MyLink from './MyLink'
import { solid,light } from '@fortawesome/fontawesome-svg-core/import.macro';
import {motion,AnimatePresence} from 'framer-motion';

export default function MobileNav() {
    const {state} = useAuth();

    useEffect(() => {
    //   console.log('mounted')
    
      return () => {
        // console.log('unmounted')
      }
    }, [])
    

    return (
                    <div 
                        className = "mobileNav"
                     >
                        <MyLink to = "/user/profile">
                            <span className="icon">
                                <FontAwesomeIcon icon = {solid('user')}/>
                            </span>
                            <span>Profile</span>
                        </MyLink>
                        <MyLink to = "/my-properties">
                            <span className="icon">
                                <FontAwesomeIcon icon = {solid('house')}/>
                            </span>
                            <span> My Properties</span>
                        </MyLink>
                        <MyLink to = "/password-reset">
                            <span className="icon">
                                <FontAwesomeIcon icon = {solid('key')}/>
                            </span>
                            <span>Password reset</span>
                        </MyLink>
                        {
                        state.user &&
                        <MyLink to = "/logout">
                            <span className="icon">
                                <FontAwesomeIcon icon = {solid('right-from-bracket')}/>
                            </span>
                            <span>Logout</span>
                        </MyLink>
                        }
                </div>
  )
}
