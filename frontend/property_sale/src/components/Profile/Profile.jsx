import React from 'react'
import Personal from './Personal/Personal'
import Kyc from './Kyc/Kyc';
import './Profile.css';
import { useState } from 'react';
import FullScreenLoading from '../shared/FullScreenLoading/FullScreenLoading';

export default function Profile() {
  
  const [isLoading,setIsLoading] = useState(0);
  

  return (
    <>
      {
        !isLoading ? 
          <div className="profile-container">
              <Personal isLoading = {isLoading} setIsLoading = {setIsLoading}/>
              <Kyc isLoading = {isLoading} setIsLoading = {setIsLoading}/>
          </div>:
          <FullScreenLoading />
      }
    </>
  )
}
