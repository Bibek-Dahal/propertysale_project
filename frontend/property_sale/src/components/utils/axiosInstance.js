import axios from 'axios';
import {baseURL} from '../../axiosLinks';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const accessToken = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null;
const refreshToken = localStorage.getItem("refresh_token") ? localStorage.getItem("refresh_token") : null;

const axiosInstance = axios.create({
        baseURL : baseURL,
        headers : {
            Authorization : `Bearer ${accessToken ? accessToken : null }`
        }
   })

axiosInstance.interceptors.request.use(async req => {
    console.log('interceptor called')
    console.log('access token = ',accessToken)
    
    if(!accessToken){
        const accessToken = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null;
        req.headers.Authorization = `Bearer ${accessToken}`
    }   
    const user = jwt_decode(accessToken);
    console.log('user = ',user)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(isExpired)
    if(isExpired) console.log('expired')
    if(!isExpired) return req;
    return req;
})

export default axiosInstance;