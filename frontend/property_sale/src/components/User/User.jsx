import React,{useEffect} from 'react'
import useAuth from '../../Hooks/useAuth';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';

export default function User() {

    const {state,checkAndRemoveToken} = useAuth(); 

    useEffect(() => {
      checkAndRemoveToken();
    },[])
    

  return (
    <>
        <Nav />
        <h1>User</h1>
        <h2>
                {state.user ? <h1>
                    This is a profile of {state.user.username} 
                </h1>: ""}
        </h2>
       
    </>
  )
}
