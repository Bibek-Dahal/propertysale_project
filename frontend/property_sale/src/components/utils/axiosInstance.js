import axios from 'axios';
import {baseURL} from '../../axiosLinks';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import links from '../../axiosLinks';

let accessToken = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null;
let refreshToken = localStorage.getItem("refresh_token") ? localStorage.getItem("refresh_token") : null;


// function verifyRefreshToken(){
//     return new Promise((resolve,reject) => {
//         console.log('verifuing refresh token inside axiosInstance');
//         async function verify(){
//             try{
//                 let res = await axios.post(`${links.refreshTokenVerify}`,
//                     {refresh : refreshToken});
//                     console.log(res);
//                 return resolve('token refreshed',{
//                     token : res.data.access
//                 });
//             }catch(err){
//                 return reject('refresh token also expired');
//             }
//         }
//         verify();
//     })
// }



const axiosInstance = axios.create({
        baseURL : baseURL,
        headers : {
            Authorization : `Bearer ${accessToken ? accessToken : null }`
        }
   })

axiosInstance.interceptors.request.use(async req => {
    // console.log('interceptor called')
    // console.log('access token = ',accessToken)
    // console.log('acestoen = ',localStorage.getItem('access_token'))
    if(!accessToken){
        accessToken = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null;
        // console.log('inside not accessTOken',accessToken)
        req.headers.Authorization = `Bearer ${accessToken}`
    }   
    const user = jwt_decode(accessToken);
    // console.log('user = ',user)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    // console.log(isExpired)
    if(isExpired) console.log('expired')
    if(!isExpired) return req;
    
    try{
        let res = await axios.post(`${links.refreshTokenVerify}`,
            {refresh : refreshToken});
        // console.log(res);
        localStorage.addItem('access_token',res.data.access);
        // console.log('added token')
        // localStorage.removeItem('refresh_token');
    }catch(err){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.pathname = '/logout';
    }
})

export default axiosInstance;