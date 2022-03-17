import React, { useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import {Nav} from '../index';

export default function Home() {

  const {state,checkAndRemoveToken} = useAuth();

  useEffect(() => {
    console.log('Home');
    checkAndRemoveToken();
  },[])
  
  return (
      <React.Fragment>
          <Nav />
          {/* {
            state.user && <h1>{state.user.username} is logged in</h1>
          }
          <h1>Other stuffs which any user can see</h1> */}
      </React.Fragment>)
}
