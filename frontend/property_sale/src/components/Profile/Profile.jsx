import React from 'react'
import Personal from './Personal/Personal'
import Kyc from './Kyc/Kyc';
import './Profile.css';
import { useState } from 'react';
import FullScreenLoading from '../shared/FullScreenLoading/FullScreenLoading';
import { useEffect } from 'react';
import { useAuth } from '../../Hooks';

export default function Profile() {
  const [isLoading,setIsLoading] = useState(0);
  // const {checkAndRemoveToken} = useAuth();

  useEffect(() => {
    console.log('mounted profile')
    // checkAndRemoveToken()
  })

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
