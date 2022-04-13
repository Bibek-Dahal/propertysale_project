import React from 'react'
import { useState } from 'react';
import info from '../jsons/address.json';
import Select from '../Select/Select';

export default function Address({formDispatch}) {

  const [data,setData] = useState({})


  const clickHandler = (e) => {
    e.preventDefault();
    console.log('final data',data)
    formDispatch({type : "set",data:data})
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
          name = "district"
          options = {info.provinces}
          onChange = {onChangeHandler}
        />
        <Select 
          name = "zone"
          options = {info.provinces}
          onChange = {onChangeHandler}
        />
        <div>
          <label>zip</label>
          <input type="text" name = "zip"onChange = {onChangeHandler}/>
        </div>
        <div>
          <label>landmark</label>
          <input type="text" name = "landmark" onChange = {onChangeHandler} />
        </div>
        <button onClick = {clickHandler}>confirm address details</button>
    </div>
  )
}
