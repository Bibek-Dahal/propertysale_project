import React, { useState } from 'react'
import Select from '../Select/Select'

export default function AreaAndRoad({formDispatch}) {

  const [data,setData] = useState({})
  const areaOptions = [
    "Ropani",
    "Sq.ft",
    "Dhur",
    "Kattha",
    "Hath",
    "Bigha"
  ]
  const face_towards_options = [
    "south",
    "west",
    "north",
    "east",
    "south-west",
    "south-east",
    "north-east",
    "north-west"
  ]
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
    formDispatch({type : "set",data:data})
  }

  return (
    <div>
      <Select 
        name = "area"
        onChange = {changeHandler}
        options = {areaOptions}
      />
      <Select
        name = "face_towards"
        onChange = {changeHandler}
        options = {face_towards_options}
      />
      <div className="area">
        <div>
          <label>Ropani</label>
          <input name = "ropani" onChange = {changeHandler}/>
        </div>
        <div>
          <label>Aana</label>
          <input name = "aana" onChange = {changeHandler}/>
        </div>
        <div>
          <label>Paisa</label>
          <input name = "paisa" onChange = {changeHandler}/>
        </div>
        <div>
          <label>Daam</label>
          <input name = "daam" onChange = {changeHandler}/>
        </div>
      </div>
      <div>
        <label>Road to property</label>
        <input name = "road_to_property" onChange = {changeHandler}/>
      </div>
      <div>
        <label>Access road</label>
        <input name = "access_road" onChange = {changeHandler}/>
      </div>
      <button onClick={clickHandler}>Confirm Area and road</button>
    </div>
  )
}
