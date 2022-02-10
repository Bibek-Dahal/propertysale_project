import React from 'react';
import NLink from '../NLink/NLink';
import './MobileNav1.css';


export default function MobileNav() {
  return(
      <div className="mobileNav">
          <NLink value = "Home" to = "/" />
            {
                ( window.location.pathname == '/login') &&
                    <NLink linkClass = "shadowyBtn" value = "Register" to = "/register" />
            }
             {
                window.location.pathname == '/register' &&
                     <NLink linkClass = "shadowyBtn" value = "Login" to = "/login" />
            }
      </div>
  );
}
