import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import usePopup from '../../Hooks/usePopup';

export default function Logout() {
    const navigate = useNavigate();
    const {dispatch,state} = useAuth();
    const {showPopup} = usePopup();
    useEffect(() => {
        console.log('logging out');
        async function logout(){
            try{
             const res = await axios.post('http://127.0.0.1:8000/api/account/logout/',{
                 refresh : state.refresh_token
             })
             console.log(res);
             if(res.status == "200"){
                dispatch({type : 'logoutUser'});
                showPopup("Logged out successFully")
                navigate('/',{replace:true})
             }
            }catch(err){
                console.log(err);
            }
         }
         logout();
    },[])

  return (
    null
  )
}
