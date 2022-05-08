import React, { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../Hooks/useAuth.js';
import {baseURL} from '../axiosLinks.js';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import links from '../axiosLinks.js';

const useAxios = ()=>{
    const {state,dispatch} = useAuth();
    const axiosInstance = axios.create({
        baseURL : baseURL,
        headers : {
            Authorization : `Bearer ${state.access_token}`
        }
   })

   axiosInstance.interceptors.request.use(async req => {
    console.log('interceptor called');
    // console.log('access token = ',accessToken)
    // console.log('acestoen = ',localStorage.getItem('access_token'))
    // if(!accessToken){
    //     accessToken = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null;
    //     // console.log('inside not accessTOken',accessToken)
    //     req.headers.Authorization = `Bearer ${accessToken}`
    // }   
    const user = jwt_decode(state.access_token);
    // console.log('user = ',user)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    // console.log(isExpired)
    if(isExpired){
        console.log('expired');
        try{
            console.log('inside try');
            let res = await axios.post('http://127.0.0.1:8000/api/account/token/refresh/',
                {refresh : state.refresh_token});
            console.log(res);
            localStorage.setItem('access_token',res.data.access);
            req.headers.Authorization = `Bearer ${res.data.access}`;
            dispatch({type : "logUser",data : {access_token:localStorage.getItem('access_token'),refresh_token:state.refresh_token}});
            return req;
            // console.log('added token')
            // localStorage.removeItem('refresh_token');
        }catch(err){
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.pathname = '/logout';
        }
    }
    if(!isExpired) {
        console.log('not expired');
        return req;
    }

})

return axiosInstance;

}

export default useAxios;