import React from 'react';
import './NLink.css';
import { Link } from 'react-router-dom';
import './NLink.css';
import { NavLink } from 'react-router-dom';


export default function NLink({value,to,linkClass,children}) {
  return (
      <React.Fragment>
           <NavLink   to={to} className={() =>{
              return `nav-link ${linkClass} ${(window.location.pathname == to ? " active" : "")}` 
          }}>
              {value}
              {children}
          </NavLink>
      </React.Fragment>
  );
}
