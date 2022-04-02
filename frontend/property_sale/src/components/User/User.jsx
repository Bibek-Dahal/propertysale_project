import React,{useEffect} from 'react'
import useAuth from '../../Hooks/useAuth';
import { Link, Outlet } from 'react-router-dom';
import { Nav } from '../index';
import SideBar from '../SideBar/SideBar';
import UserContainer from './UserContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function User() {

  const {state,checkAndRemoveToken} = useAuth(); 

  useEffect(() => {
    checkAndRemoveToken();
  },[])
  

  return (
    <>
        <Nav />
        <UserContainer>
          {/* <label htmlFor="sideNavBarCheckBox">
            <FontAwesomeIcon  icon = {solid('bars')} />
          </label>
          <input type="checkbox" id = "sideNavBarCheckBox" /> */}
          <SideBar />
          <Outlet />
        </UserContainer>
    </>
  )
}
