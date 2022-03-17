import React from 'react'
import DesktopNav from './DesktopNav'
import MyLink from './MyLink';
import MobileNav from './MobileNav'
import './Nav.css';
import { useAuth } from '../../Hooks';
import { useLocation } from 'react-router-dom';

export default function Nav() {
    const {state} = useAuth();
    const location = useLocation();

    return (    
    <>
        <nav className = "wrapper">
            {/* <a href="#" className = "homeBtn">Home</a> */}
            <MyLink to = "/" className = "homeBtn">
                Home
            </MyLink>
            <DesktopNav />
            <input type="checkbox" id = "burgerCheckBox" />
            <MobileNav />
            {   
                location.pathname === '/' && 
                <label htmlFor='burgerCheckBox' id="burger">
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                    <div className="line line3"></div>
                </label>
            }
            
           {
               state.user && 
                    <MyLink to = "/user" className = "profileIcon navBtnStyle">
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
                        Sign In
                    </MyLink>
            }
        </nav>
    </>
  )
}
