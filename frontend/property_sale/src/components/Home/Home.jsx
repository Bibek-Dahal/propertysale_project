import React, { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import {Nav} from '../index';
import axiosInstance from '../utils/axiosInstance';
import axiosLinks from '../../axiosLinks';
import axios from 'axios';
import Header from '../Header/Header';
import Listing from '../Listing/Listing';
import Footer from '../Footer/Footer';

export default function Home() {
  const {state,checkAndRemoveToken} = useAuth();
  const [properties,setProperties] = useState([
  
  ]);
  const [isLoading,setIsLoading] = useState(0);
  useEffect(() => {
    // console.log('Home');
    // checkAndRemoveToken();
    setIsLoading(1);
    (
      async function(){
        try{
          let res = await axios.get(axiosLinks.getAllHouse);
          // console.log(res);
          const houses = res.data;
          res = await axios.get(axiosLinks.getAllLand);
          const lands = res.data;
          lands.forEach(land => {
            land.type = "land";
          })
          houses.forEach(house => {
            house.type = "house";
          })
          setProperties(prev => {
            return[
              ...prev,
              ...houses,
              ...lands
            ]
          });
          setIsLoading(0);
        }catch(err){
          setIsLoading(0);
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
          <Listing type = "premium listing" properties = {properties} isLoading = {isLoading}/>
          <Listing type = "top listing" properties = {properties} isLoading = {isLoading}/>
          <Footer />
      </React.Fragment>)
}
