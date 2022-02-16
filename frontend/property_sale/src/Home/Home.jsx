import React, { useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import Nav from '../Nav/Nav';

export default function Home() {

  const {state,checkAndRemoveToken} = useAuth();

  useEffect(() => {
    console.log('Home');
    // checkAndRemoveToken();
  },[])
  
  return <React.Fragment>
      <Nav />
      {/* <h1>hello</h1> */}
      {
        // state.user && <h1>Hello {state.user.username}</h1>
      }
  </React.Fragment>
}
