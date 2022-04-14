import axios from 'axios';
import React,{useState,useRef} from 'react'
import { useEffect } from 'react';
import './Kyc.css';
import axoisLinks from '../../../axiosLinks';
import { useAuth, usePopup } from '../../../Hooks';
import DropZone from '../DropZone';
import getImage from '../../../impLinks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import FileField from './FileField';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';

export default function Kyc({setLoading,setIsLoading}) {
  const {state} = useAuth();
  const [kycExists,setKycExists] = useState(0);
  const formRef = useRef(null);
  const {showPopup} = usePopup();
  const navigate = useNavigate();

  const profileRef = useRef(null);

  const [kycData,setKycData] = useState({
    "user":"",
    "profile_pic": "",
		"citizenship_photo_front": "",
		"citizenship_photo_back": "",
		"occupation": "",
		"citizenship_num": "",
    "mobile_num":""
  })

  const [newkycData,setnewKycData] = useState({
    "user":state?.user.user_id,
    "profile_pic": "",
		"citizenship_photo_front": "",
		"citizenship_photo_back": "",
		"occupation": ""
  })

  const updateKyc = (e) => {
    e.preventDefault();
    console.log('updating kyc',newkycData)
    setIsLoading(1);
    const formData = new FormData();
    for(let i in newkycData){
      if(newkycData[i] === ""){
        console.log(`setting ${i} as ${kycData[i]}`)
        newkycData[i] = kycData[i]
        formData.append(i,newkycData[i])
      }else{
        if(
          i === 'profile_pic' || 
          i === 'citizenship_photo_front' ||
          i === 'citizenship_photo_back'
        ){
          formData.append(i,decodeURI(newkycData[i]))
        }else{
          formData.append(i,newkycData[i])
        }
      }
    }
    // console.log(formData.get('profile_pic'))
    async function update(){
      const data = {...kycData};
      delete data.citizenship_num;
      delete data.mobile_num;
      delete data.status
      console.log('final data',data)
      try{
        const res = await axios.patch(axoisLinks.updateKyc,
          formData,
          {
          headers : {
            'Authorization' : `Bearer ${state.access_token}`
            // 'Content-Type' : 'multipart/form-data'
          }
        })
        console.log(res)
        showPopup(`kyc updated successfully`)
        setIsLoading(0);
        // navigate('/');
      }catch(err){
        setIsLoading(0);
        showPopup(`error occured`,'error')
        console.log(err)
      }
    }
    update();
  }


  
  
  // Create Blob file from URL
  function decodeURI(dataURI) {
      let binary = atob(dataURI.split(',')[1]);
      const mimeType = dataURI.split(',')[0].split(":")[1].split(";")[0];

      let array = [];
      for(let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: mimeType});
  }

  const createKyc = (e) => {
    e.preventDefault();
    console.log('creating kyc')
    const formData = new FormData();
    setIsLoading(1);
    for(let i in newkycData){
      if(
        i === 'profile_pic' || 
        i === 'citizenship_photo_front' ||
        i === 'citizenship_photo_back'
      ){
        formData.append(i,decodeURI(newkycData[i]))
      }else{
        formData.append(i,newkycData[i])
      }
    }
    console.log('final data : ',newkycData)

    async function create(){
      try{
        const res = await axios.post(axoisLinks.createKyc,
          formData,
          {
          headers : {
            'Authorization' : `Bearer ${state.access_token}`
          }
        })
        console.log('submitted kyc')
        console.log(res);
        showPopup('kyc submitted successfully')
        setIsLoading(0);
      }catch(err){
        console.log(err)
      }
    }
    create();
  }

  const onChangeHandler = e => {
    setnewKycData(prev => {
      return{
        ...prev,
        [e.target.name] : e.target.value
      }
    })
    setKycData(prev => {
      return{
        ...prev,
        [e.target.name] : e.target.value
      }
    })
    console.log('new data : ',kycData)
  }
 
  useEffect(() => {
    (async function(){
      try{
        const res = await axios.get(axoisLinks.retriveUser,{
          headers : {
            Authorization : `Bearer ${state.access_token}`
          }
        })
        // console.log('required',res);
        if(res.data.kyc_status !== null){
          setKycExists(1);
          // console.log('kyc exists')
          const res = await axios.get(axoisLinks.retriveKyc,{
            headers : {
              Authorization : `Bearer ${state.access_token}`
            }
          })
          const mobile_num_arrays = res.data.contact_nums.map(item => item.mobile_num) 

          setKycData(prev => {
            return res.data;
          })
          setKycData(prev => {
            return{
              ...prev,
              mobile_num : mobile_num_arrays.toString()
            }
          })
          // console.log(res.data)
        }
      }catch(err){
        console.log('error : ',err);
      }
    })()

  },[])

  return (
    <div className="kyc">
      <h1>KYC</h1>
      <form onSubmit={kycExists ? updateKyc : createKyc}  ref = {formRef}>
        <FileField 
          className = {`profild-pic ${kycExists ? "" : "full_width" }`}
          kycData = {kycData}
          newkycData = {newkycData}
          setnewKycData = {setnewKycData}
          name = "profile_pic"
          label = "Profile pic"
        />
        <FileField 
          className = {`citizenship-back ${kycExists ? "" : "full_width" }`}
          kycData = {kycData}
          newkycData = {newkycData}
          setnewKycData = {setnewKycData}
          name = "citizenship_photo_back"
          label = "Citizenship Photo Back"
        />
         <FileField 
          className = {`citizenship-front ${kycExists ? "" : "full_width" }`}
          kycData = {kycData}
          newkycData = {newkycData}
          setnewKycData = {setnewKycData}
          name = "citizenship_photo_front"
          label = "Citizenship Photo Front"
        />
        <Input
            type = "text"
            value = {kycData.citizenship_num}
            name = "citizenship_num"
            onChange = {onChangeHandler}
            label = "Citizenship number"
        />
        <Input
            type = "text"
            name = "mobile_num"
            onChange = {onChangeHandler}
            label = "Mobile number"
            value = {kycData.mobile_num}
        />
        <Input
            type = "text"
            value = {kycData.occupation}
            name = "occupation"
            onChange = {onChangeHandler}
            label = "Occupation"
        />
        <input type="submit" />

      </form>
    </div>
  )
}
