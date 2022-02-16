import axios from "axios";
import { createContext,useReducer } from "react";
import { authReducer, initial_auth_condition } from "../reducers/authReducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(authReducer,initial_auth_condition);

    function verifyRefreshToken(){
        return new Promise((resolve,reject) => {
            console.log('verifuing refresh token');
            async function verify(){
                let res = await axios.post('http://127.0.0.1:8000/api/account/token/refresh/',
                {token : state.refresh_token});
                if(res.status == 200){
                    dispatch({type : "updateAccessToken",token:res.data.access})
                    return resolve('token refreshed');
                }
                return reject('refresh token also expired');
            }
            verify();
        })
    }

    function verifyAccessToken(){
            return new Promise((resolve,reject) => {
                console.log('inside promise for verifying access token');
                async function verify(){
                    let res = await axios.post('http://127.0.0.1:8000/api/account/token/verify/',
                    {token : state.access_token});
                    if(res.status == 200){
                        return resolve('token is valid');
                    }else{
                        return verifyRefreshToken();
                    }
                }
            verify();
            })

    }

    const checkAndRemoveToken = async () => {
        console.log('checkAndremovetoken called');
        if(state.user ){
            verifyAccessToken();
            // .then((msg) => {
            //     console.log('success',msg)
            // })
            // .catch(err => {
            //     console.log('failure',err)
            //     console.log('so removing tokens');
            //     dispatch({type:"logoutUser"})
            // })
        }
       
    }
    
    return(
        <AuthContext.Provider value = {{
            state,
            checkAndRemoveToken,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}