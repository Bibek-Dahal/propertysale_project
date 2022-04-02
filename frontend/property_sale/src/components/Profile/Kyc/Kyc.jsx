import axios from 'axios';
import React,{useState} from 'react'
import { useEffect } from 'react';
import './Kyc.css';
import axoisLinks from '../../../axiosLinks';
import { useAuth } from '../../../Hooks';
import { useRef } from 'react';

export default function Kyc() {
  const {state} = useAuth();
  const [kycExists,setKycExists] = useState(0);
  const formRef = useRef(null);

  const [kycData,setKycData] = useState({
    "user":state.user.user_id,
    "profile_pic": "",
		"citizenship_photo_front": "",
		"citizenship_photo_back": "",
		"occupation": "",
		"citizenship_num": "",
    "mobile_num":""
  })

  const updateKyc = (e) => {
    e.preventDefault();
    console.log(kycData)
    async function update(){

      const data = {...kycData};
      delete data.citizenship_num;
      delete data.mobile_num;
      console.log('final datra',data)
      try{
        const res = await axios.patch(axoisLinks.updateKyc,
          data,
          {
          headers : {
            Authorization : `Bearer ${state.access_token}`
          }
        })
      }catch(err){
        console.log(err)
      }
    }

    update();
  }

  const createKyc = (e) => {
    e.preventDefault();
    console.log(kycData)
    // console.log(e.target)
    const formData = new FormData(formRef.current);
    // for (let i in kycData){
    //   console.log(i);
    //   // formData.append(,kycData[i])
    // }
    formData.append('user',kycData.user);
    async function create(){
      try{
        const res = await axios.post(axoisLinks.createKyc,
          formData,
          {
          headers : {
            'Content-Type' : "multipart/form-data",
            'Authorization' : `Bearer ${state.access_token}`
          }
        })
        console.log('submitted kyc')
        console.log(res);
      }catch(err){
        console.log(err)
      }
    }

    create();
  }

  const onChangeHandler = e => {
    setKycData(prev => {
      return{
        ...prev,
        [e.target.name] : e.target.type === 'file' ? e.target.files[0] : e.target.value
      }
    })
  }

  useEffect(() => {
    (async function(){
      try{
        
        const res = await axios.get(axoisLinks.retriveUser,{
          headers : {
            Authorization : `Bearer ${state.access_token}`
          }
        })
        console.log('required',res);
        if(res.data.kyc_status != null){
          setKycExists(1);
          const res = await axios.get(axoisLinks.retriveKyc,{
            headers : {
              Authorization : `Bearer ${state.access_token}`
            }
          })
          setKycData(prev => {
            return res.data;
          })
        }
      }catch(err){
        console.log('error : ',err);
      }
    })()

  },[])

  return (
    <div className="kyc">
      <h1>KYC</h1>
      <form onSubmit={kycExists ? updateKyc : createKyc} encType = "multipart/form-data" ref = {formRef}>
        <label>Profile image</label>
        <input type="file" name = "profile_pic" onChange = {onChangeHandler}/>
        <label>Citizenship front</label>
        <input type="file" name = "citizenship_photo_front" onChange = {onChangeHandler}/>
        <label>citizenship back</label>
        <input type="file" name = "citizenship_photo_back" onChange = {onChangeHandler}/>
        <label>occupation</label>
        <input type="text" name = "occupation" onChange = {onChangeHandler}/>
        <label>citizenship no</label>
        <input className = {kycExists ? "disabled" : "enabled"} type="text" name = "citizenship_num" onChange = {onChangeHandler}/>
        <label>phone no</label>
        <input className = {kycExists ? "disabled" : "enabled"} type="text" name = "mobile_num" onChange = {onChangeHandler}/>
        <input type="submit" />
      </form>
    </div>
  )
}
