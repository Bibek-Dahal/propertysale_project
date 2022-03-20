import React from 'react'
import axios from 'axios';
import links from '../axiosLinks';
import { usePopup } from '.';

export default function useSendMail() {
    const {showPopup} = usePopup();
    
    function sendEmailVerification(email){
        console.log('email verification sent',email)
        async function sendMail(){
                try{
                    const res = await axios.post(`${links.sendVerificationMail}`,
                    {
                        email : email
                    })
                    console.log(res);
                    res.status === 200 && showPopup(`verification email is sent to ${email}`);
                }catch(err){
                    console.log('inside error')
                    console.log(err.response);
                    // if(err.response.status === 429){
                    //     const errString = err.response.data.detail;
                    //     const timeLeft = errString.match(/\d+/);
                    // }
                }
            }
        sendMail();
    }
    
    function sendPasswordResetMail(email){
        console.log('passwordReset mail sent',email);
        // async function sendMail1(){
        return new Promise(async (resolve,reject) => {
            try{
                const res = await axios.post(`${links.sendPasswordResetMail}`,
                    {
                        email : email
                    })
                    console.log(res);
                    // if(res.status === 200 && setEmailSent){
                    //     setEmailSent(1);
                    //     setIsLoading(0);
                    // }
                    resolve(res);
                }catch(err){
                        console.log(err);
                        reject(err.response)
                }
            })

    }

  return {sendEmailVerification,sendPasswordResetMail}
}
