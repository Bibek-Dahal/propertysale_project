import React, { useEffect } from 'react'
import useAuth from '../../Hooks/useAuth'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {state,checkAndRemoveToken} = useAuth();

    useEffect(() => {
      console.log('checked and removed token');
      checkAndRemoveToken();
    },[])


    return(
      <React.Fragment>
            {!state.user ? children : <Navigate to = "/" />}
      </React.Fragment>
    )
}
