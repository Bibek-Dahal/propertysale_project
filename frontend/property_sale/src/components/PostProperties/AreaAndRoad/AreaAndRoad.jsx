import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Select from '../Select/Select'
import axiosLinks from '../../../axiosLinks';
import { useAuth } from '../../../Hooks';
import { baseURL } from '../../../axiosLinks';
import Input from '../Input/Input';

export default function AreaAndRoad({formDispatch,keys}) {

  const {state} = useAuth();

  const [data,setData] = useState({
    "area":"",
    "face_towards":"",
    "ropani":"",
    "aana":"",
    "paisa":"",
    "daam":"",
    "road_to_property":"",
    "access_road":""
  })

  // const areaOptions = [
  //   "Ropani",
  //   "Sq.ft",
  //   "Dhur",
  //   "Kattha",
  //   "Hath",
  //   "Bigha"
  // ]

  // const face_towards_options = [
  //   "south",
  //   "west",
  //   "north",
  //   "east",
  //   "south-west",
  //   "south-east",
  //   "north-east",
  //   "north-west"
  // ]

  const changeHandler = (e) => {
    setData(prev => {
      return{
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const clickHandler = (e) => {
    e.preventDefault();
    console.log(data);
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


    useEffect(() => {
      console.log('inside area dna troad',keys)
    },[])

  return (
    <div>
      
      <Select
        name = "face_towards"
        onChange = {changeHandler}
        options = {keys?.face_towards}
      />
      <div className="area">
        <Select 
          name = "area"
          onChange = {changeHandler}
          options = {keys?.area_type}
        />
        <Input
          label = "ropani"
        >
          <input name = "ropani" onChange = {changeHandler}/>
        </Input>
       <Input
          label = "aana"
        >
          <input name = "aana" onChange = {changeHandler}/>
        </Input>
        <Input
          label = "Paisa"
        >
          <input name = "paisa" onChange = {changeHandler}/>
        </Input>
        <Input
          label = "daam"
        >
          <input name = "daam" onChange = {changeHandler}/>
        </Input>
      </div>
      <Input
          label = "road to property"
        >
          <input name = "road_to_property" onChange = {changeHandler}/>
        </Input>
        <Input
          label = "access road"
        >
          <input name = "access_road" onChange = {changeHandler}/>
        </Input>
      <button className = "confirm" onClick={clickHandler}>Confirm Area and road</button>
    </div>
  )
}
