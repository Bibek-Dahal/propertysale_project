import React, { useEffect } from 'react'
import useAuth from '../../Hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const {state,checkAndRemoveToken} = useAuth();
    const location = useLocation();
    // console.log(location);

    useEffect(() => {
      console.log('inside private route')
      console.log('checked and removed token');
      checkAndRemoveToken();
    },[])


    return(
      <React.Fragment>
            {state.user ? children : <Navigate to = {{pathname : "/login",state : {from : `${location.pathname}}`}}}/>}
      </React.Fragment>
    )
}
