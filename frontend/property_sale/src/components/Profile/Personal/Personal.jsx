import React,{useState,useEffect} from 'react'
import Image from '../image.png';
import './Personal.css';
import  InputField  from '../Input/Input';
import axios from 'axios';
import axiosLinks from '../../../axiosLinks';
import { useAuth } from '../../../Hooks';
import Input from '../Input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Personal() {
    const {state} = useAuth();
    const [info,setInfo] = useState({
        username:"",
        first_name:"",
        last_name:"",
        date_of_birth:"",
        gender:""
    })
    const verified = 0;
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
                 <img src="https://picsum.photos/200" alt="" />
                 <div className={`icon ${!verified ? "not-verified" : "verified"}`}>
                     {
                         !verified ? 
                            <FontAwesomeIcon icon = {solid('exclamation')} />:
                            <FontAwesomeIcon icon = {solid('check')} />
                     }
                     {
                         !verified ? 
                            (
                                <div className="tooltip-info">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aperiam.
                                </div>
                            ):
                            (
                                <div className="tooltip-info">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aperiam.
                                </div>
                            )
                     }
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
