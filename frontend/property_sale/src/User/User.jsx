import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'

export default function User() {

  return (
      <React.Fragment>
          <Nav />
         <Outlet />
      </React.Fragment>
  )
}
