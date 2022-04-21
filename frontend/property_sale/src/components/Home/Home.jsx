import React, { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import {Nav} from '../index';
import axiosInstance from '../utils/axiosInstance';
import axiosLinks from '../../axiosLinks';
import axios from 'axios';
import Header from '../Header/Header';
import Listing from '../Listing/Listing';

export default function Home() {
  const {state,checkAndRemoveToken} = useAuth();
  const [properties,setProperties] = useState([
  
  ]);

  useEffect(() => {
    // console.log('Home');
    // checkAndRemoveToken();

    (
      async function(){
        try{
          const res = await axios.get(axiosLinks.getAllHouse);
          console.log(res);
          setProperties(res.data)
        }catch(err){
          console.log(err)
        }
      }
    )()


  },[])
  
  return (
      <React.Fragment>
          <Nav />
          <Header />
          {/* {
            state.user && <h1>{state.user.username} is logged in</h1>
          }
          <h1>Other stuffs which any user can see</h1> */}
          <Listing type = "premium listing" properties = {properties}/>
      </React.Fragment>)
}
