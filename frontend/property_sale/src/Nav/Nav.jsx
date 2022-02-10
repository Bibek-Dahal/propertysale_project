import React from 'react';
import { useLocation } from 'react-router-dom';
import './Nav.css';
import NLink from './NLink/NLink';

export default function Nav() {
    const location = useLocation();

    return(
      <React.Fragment>
          <nav className='wrapper' >
            {/* <MobileNav /> */}
            {/* <MobileNav1 /> */}
            <li>
              <NLink value = "Home" to="/" linkClass=""/>
            </li>
            <ul className='rightmost'>
              <li className = "shadowyBtn">
                <NLink value = "Register" to = "/register" linkClass = "" />
              </li>
              <li className = "shadowyBtn">
                <NLink value = "Login" to = "/login" linkClass = "" />
              </li>
            </ul>
          </nav>
      </React.Fragment>
  );
}
