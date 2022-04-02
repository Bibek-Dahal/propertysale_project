import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import './SideBar.css';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function SideBar() {
  return (
    <div className = "sideBar">
        <ul>
            <li>
                <NavLink to = "/user/profile" >
                    <FontAwesomeIcon  icon = {solid('user')} />
                    <span>Profile</span>
                </NavLink>
            </li>
            <li>
                <NavLink to = "/user/my-properties" >
                    <FontAwesomeIcon  icon = {solid('house')} />
                    <span>My Properties</span>
                </NavLink>
            </li>
            <li>
                <NavLink to = "/user/post-properties" >
                    <FontAwesomeIcon  icon = {solid('plus')} />
                    <span>Post Properties</span>
                </NavLink>
            </li>
            <li>
                <NavLink to = "/user/change-password" >
                    <FontAwesomeIcon  icon = {solid('key')} />
                    <span>Change Password</span>
                </NavLink>
            </li>
            <li>
                <NavLink to = "/logout" >
                    <FontAwesomeIcon  icon = {solid('right-from-bracket')} />
                    <span>Logout</span>
                </NavLink>
            </li>
        </ul>

    </div>
  )
}
