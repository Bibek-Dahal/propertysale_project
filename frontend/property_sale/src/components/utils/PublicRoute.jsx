import React,{useEffect} from 'react'
import { useAuth } from '../../Hooks';

export default function PublicRoute({children}) {
    const {checkAndRemoveToken} = useAuth();

    useEffect(() => {
      checkAndRemoveToken();
    
      return () => {
        
      }
    }, [])
    

  return (
        <>
        {children}
        </>
    )
}
