import React from 'react'
import { useState } from 'react';
import info from '../jsons/address.json';
import Select from '../Select/Select';
import axios from 'axios';
import { useAuth } from '../../../Hooks';
import { baseURL } from '../../../axiosLinks';
import Input from '../Input/Input';


export default function Address({formDispatch}) {

  const [data,setData] = useState({
    district : "",
    zone : "",
    zip : "",
    landmark : ""
  })
  const {state} = useAuth();

  const clickHandler = (e) => {
    e.preventDefault();
    console.log('final data',data);
    const formData = new FormData();

    for(let d in data){
      formData.append([d] , data[d]);
    }

    (
      async function (){
        try{
          const res = await axios.post(`${baseURL}/api/property/post-land/`,formData,{
            headers : {
              Authorization : `Bearer ${state.access_token}`
            }
          });
          console.log(res)
        }catch(err){
          console.log(err.response.data)
        }
        formDispatch({type : "set",data:data})
      }

    )()
  }

  const onChangeHandler = (e) => {
    console.log(e);
    console.log(`${[e.target.name]} = ${e.target.value}`)
    setData(prev => {
      return{
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }




  return (
    <div>
       <Select 
          name = "province"
          options = {info.provinces}
          onChange = {onChangeHandler}
        />
        <Select 
          name = "district"
          options = {info.provinces}
          onChange = {onChangeHandler}
        />
        <Select 
          name = "zone"
          options = {info.provinces}
          onChange = {onChangeHandler}
        />
        <Input
          label = "zip"
        >
          <input type="text" name = "zip"onChange = {onChangeHandler}/>
        </Input>
        <Input
          label = "landmark"
        >
          <input type="text" name = "landmark" onChange = {onChangeHandler} />
        </Input>
        <button className = "confirm" onClick = {clickHandler}>confirm address details</button>
    </div>
  )
}
