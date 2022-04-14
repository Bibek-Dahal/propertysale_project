import React from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../Hooks';

export default function MyProperties() {

  const {checkAndRemoveToken} = useAuth();

  useEffect(() => {
    checkAndRemoveToken();
  },[])

  return (
    <div>MyProperties</div>
  )
}
