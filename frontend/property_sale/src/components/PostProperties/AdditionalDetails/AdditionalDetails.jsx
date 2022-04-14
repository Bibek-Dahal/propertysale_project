import axios from 'axios'
import React,{useState,useContext} from 'react'
import { useEffect } from 'react'
import Section from '../Section/Section'
import Select from '../Select/Select'
import axiosLinks from '../../../axiosLinks';
// import { ForeignKeyContext } from '../../../context/ForeignKeyContext'
import CustomChooseInput from '../CustomChooseInput/CustomChooseInput'
import Input from '../Input/Input'

export default function AdditionalDetails({formDispatch,choice,keys,setIsRent}) {

  const [data,setData] = useState({})
  const [facilityItems,setFacilityItems] = useState([])

  useEffect(() => {
    console.log('inside additional',keys)
  },[])

  const clickHandler = (e) => {
    e.preventDefault();
    // console.log(data);
    console.log('facilitied : ',facilityItems)
    setData(prev => {
      return {
        ...prev,
        facilityItems
      }
    })
    formDispatch({type : "set",data:data})
  }
  
  const changeHandler = (e) => {
    setData(prev => {
      return{
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  // useEffect(() => {
  //   console.log('inside useeffect')
  //   if(Object.keys(keys).length === 0){
  //     // console.log('not set keys so doing it now')
  //     (
  //       async function(){
  //         try{
  //           const res = await axios.get(axiosLinks.foreignKeys);
  //           // console.log(res);
  //           console.log('setting foreign keys')
  //           setKeys(prev => {
  //               res.data
  //           });
  //           console.log(res.data);
  //         }catch(err){
  //           console.log(err);
  //         }
  //       }
  //     )()
  //   }else{
  //     console.log('already set foreign key')
  //   }
  // },[])


  return (
        <div>
         
            {
              choice === "land" && (
                <div>

                </div>
              )
            }
             {
              choice === "house" && (
                <div>
                  <Select 
                    name = "property_type"
                    options = {keys?.property_type }
                    onChange = {changeHandler}
                  />

                </div>
              )
            }
             <Select 
              name = "listing_type"
              options = {keys?.listing_type}
              onChange = {changeHandler}
            />
             <Select 
              name = "listing_condition"
              options = {keys?.listing_condition}
              onChange = {changeHandler}
            /> 
            <Input
              label = "youtube url"
            >
              <input type="text" name = "url" onChange={changeHandler}/>
            </Input>
            {
              choice === "house" &&
              <CustomChooseInput 
                label = "Facility"
                name = "facility"
                options = {keys?.facility}
                setFacilityItems={setFacilityItems}
              />
            }
            <button className = "confirm" onClick={clickHandler}>confirm additional details</button>
        </div>
    )
}
