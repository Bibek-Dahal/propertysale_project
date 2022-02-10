import React from 'react';
import './NLink.css';
import { Link } from 'react-router-dom';
import './NLink.css';
import { NavLink } from 'react-router-dom';


export default function NLink({value,to,linkClass}) {
  return (
      <React.Fragment>
           <NavLink   to={to} className={() =>{
              console.log(window.location.pathname)
              return `nav-link ${linkClass} ${(window.location.pathname == to ? " active" : "")}` 
          }}>
              {value}
          </NavLink>
      </React.Fragment>
  );
}
