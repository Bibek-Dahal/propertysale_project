import React, { useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import Modal from '../Modal/Modal';

export default function Home() {

  const {state,checkAndRemoveToken} = useAuth();

  useEffect(() => {
    console.log('Home');
    checkAndRemoveToken();
  },[])
  
  return <React.Fragment>
      {/* <Modal /> */}
      {/* <h1>hello</h1> */}
      {
        // state.user && <h1>Hello {state.user.username}</h1>
      }
  </React.Fragment>
}
