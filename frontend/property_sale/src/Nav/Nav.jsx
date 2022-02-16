import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import './Nav.css';
import NLink from './NLink/NLink';

export default function Nav() {
    const {state} = useAuth();
    const location = useLocation();
    const {checkAndRemoveToken} = useAuth();
  
    useEffect(() => {
      console.log('from nav');
      checkAndRemoveToken();
    },[])

    return(
      <React.Fragment>
          <nav className='wrapper' >
            {/* <MobileNav /> */}
            {/* <MobileNav1 /> */}
            <li>
              <NLink value = "Home" to="/" linkClass=""/>
            </li>
            { 
              !state.user && 
              <ul className='rightmost'>
                <li className = "shadowyBtn">
                  <NLink value = "Register" to = "/register" linkClass = "" />
                </li>
                <li className = "shadowyBtn">
                  <NLink value = "Login" to = "/login" linkClass = "" />
                </li>
              </ul>
            }
            {
              state.user && 
                <ul className='rightmost'>
                  <li className='shadowyBtn profileIcon'>
                    <NLink to="/user/profile">
                      <span className="profile-img-sml">
                        <img src="https://picsum.photos/200" alt="" />
                      </span>
                      <span>{state.user.username}</span>
                    </NLink>
                  </li>
                </ul>
            }
          </nav>
      </React.Fragment>
  );
}
