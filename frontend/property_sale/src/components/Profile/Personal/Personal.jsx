import React,{useState,useEffect} from 'react'
// import Image from '../image.png';
import './Personal.css';
import  InputField  from '../Input/Input';
import axios from 'axios';
import axiosLinks from '../../../axiosLinks';
import { useAuth, usePopup } from '../../../Hooks';
import Input from '../Input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import getImage from '../../../impLinks';

export default function Personal() {
    const {state} = useAuth();
    const {showPopup} = usePopup();

    const [info,setInfo] = useState({
        username:"",
        first_name:"",
        last_name:"",
        date_of_birth:"",
        gender:""
    })
    const [profile_image , setProfileImage] = useState("");

    const [kyc_status,setKycStatus] = useState(null);
    function fieldChangeHandler(e){
        setInfo(prev => {
            return{
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }
    function onSubmitHandler(e){
        e.preventDefault();
        console.log(info)
        
        async function update(){
            try{
                const res = await axios.patch(axiosLinks.updateUser,
                    info,
                    {
                        headers : {
                            Authorization : `Bearer ${state.access_token}`
                    }
                })
                console.log(res);
                showPopup('Profile Updated successfully')
                window.scroll(0,0);
            }catch(err){
                console.log(err);
            }
        }
        update();
    }

    useEffect(() => {
        console.log(localStorage.getItem('access_token'))
        async function getUserDetail(){
            try{
                const res = await axios.get(axiosLinks.retriveUser,{
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                console.log(res);
                const data = res.data;
                for(let i in data){
                    setInfo(prev => {
                        return{
                            ...prev,
                            [i] : data[i] ? data[i] : ""  
                        }
                    })
                }
                if(res.data.kyc_status === 'verified' ){
                    setKycStatus("verified");
                }else if(res.data.kyc_status === 'pending'){
                    setKycStatus("pending");
                }

                if(res.data.kyc_status !== null){
                    console.log('insdide')
                        axios.get(axiosLinks.retriveKyc,{
                            headers : {
                              Authorization : `Bearer ${state.access_token}`
                            }
                          })
                          .then(res => {
                              setProfileImage(res.data.profile_pic)
                          })
                          .catch(err => console.log(err))
                }
            }catch(err){
                console.log(err);
            }
        }

        getUserDetail();

        // async function isKycVerified(){
        //     try{
        //         const res = await axios.get(`${axiosLinks.retriveKyc}`,{
        //             headers
        //         })
        //     }
        // }

        // isKycVerified();
    
      return () => {
      }
    }, [])
    


  return (
    <div className="personal">
        <h1>Personal Details</h1>
        <div className="profile-image large">
            <div className="image">
                {
                    profile_image ? 
                        <img src={`${getImage}${profile_image}`} alt="" />:
                        "no profile image set"
                }
                 <div className={`icon ${kyc_status}`}>
                    {kyc_status === null &&  <FontAwesomeIcon icon = {solid('exclamation')} />}
                    {kyc_status === "pending" &&   <FontAwesomeIcon icon = {solid('question')} />}
                    {kyc_status === "verified" &&   <FontAwesomeIcon icon = {solid('check')} />}
                    {kyc_status === "pending" &&   <div className = "tooltip-info">kyc verification in progress</div>}
                    {kyc_status === null &&   <div className = "tooltip-info">kyc is not verified</div>}
                    {kyc_status === "verified" &&   <div className = "tooltip-info">kyc is verified</div>}
                 </div>
            </div>
            <h2>@{info.username}</h2>
        </div>
        <form onSubmit = {onSubmitHandler}>
            <Input
                type = "text"
                value = {info.first_name}
                name = "first_name"
                onChange = {fieldChangeHandler}
                label = "First name"
            />
              <Input
                type = "text"
                value = {info.last_name}
                name = "last_name"
                onChange = {fieldChangeHandler}
                label = "Last name"
            />
             <Input
                type = "text"
                value = {info.username}
                name = "username"
                onChange = {fieldChangeHandler}
                label = "Username"
            />
            <Input
                type = "date"
                value = {info.date_of_birth}
                name = "date_of_birth"
                onChange = {fieldChangeHandler}
                label = "Date of Birth"
            />
            <Input 
                type = "select"
                value = {info.gender}
                name = "gender"
                onChange = {fieldChangeHandler}
                label = "Gender"
            >
                <option value="select">----------</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Other</option>
            </Input>
            <input type="submit" />
        </form>
    </div>
  )
}
