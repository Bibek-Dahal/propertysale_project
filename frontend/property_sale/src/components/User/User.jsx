import React,{useEffect} from 'react'
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';
import { Nav } from '../index';
export default function User() {

    const {state,checkAndRemoveToken} = useAuth(); 

    useEffect(() => {
      checkAndRemoveToken();
    },[])
    

  return (
    <>
        <Nav />
        <h1>User</h1>
                {state.user ? <h1>
                    This is a profile of {state.user.username} 
                </h1>: ""}
    </>
  )
}
