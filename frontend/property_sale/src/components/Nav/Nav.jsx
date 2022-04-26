import React,{useState} from 'react'
import DesktopNav from './DesktopNav'
import MyLink from './MyLink';
import MobileNav from './MobileNav'
import './Nav.css';
import { useAuth } from '../../Hooks';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import Logo from './logo';
import { Link } from 'react-router-dom';

export default function Nav() {
    const {state} = useAuth();
    const location = useLocation();
    
    return (    
    <div className="nav_wrapper">
        <nav className = "wrapper">
            {/* <a href="#" className = "homeBtn">Home</a> */}
            <Link to = "/" className = "logo">
                <Logo />
            </Link>
            <DesktopNav />
            <input type="checkbox" id = "burgerCheckBox" />
            <MobileNav/>
            {   
                location.pathname === '/' && 
                <label htmlFor='burgerCheckBox' id="burger" >
                    <FontAwesomeIcon icon = {solid('bars')}/>
                </label>
            }
           {
               state.user && 
                    <MyLink to = "/user/profile" className = "profileIcon navBtnStyle">
                        <img src="" alt="" />
                        <span className="userName">
                            {state.user.username}
                        </span>

                    </MyLink>}
            
            {
                !state?.user &&
                    <MyLink to = "/login"  className = "navBtnStyle">
                        Login
                    </MyLink>
            }
            {
                !state?.user &&
                    <MyLink to = "/register"  className = "navBtnStyle">
                        Sign Up
                        {
                            
                        }
                    </MyLink>
            }
        </nav>
    </div>
  )
}
