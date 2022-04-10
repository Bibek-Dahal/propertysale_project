import React,{useState} from 'react'
import Section from '../Section/Section'
import Select from '../Select/Select'

export default function AdditionalDetails({formDispatch,choice}) {
  const [data,setData] = useState({})
  const listingOptions = [
    "top_listing",
    "premium_listing"
  ]

  const propertyTypeOptions = [
    "House for rent",
    "House for sale"
  ]


  const listingConditionOptions = [
      "Brand new",
      "Used"
  ]

  const clickHandler = (e) => {
    e.preventDefault();
    console.log(data);
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
                    options = {propertyTypeOptions}
                    onChange = {changeHandler}
                  />

                </div>
              )
            }
            <Select 
              name = "listing_type"
              options = {listingOptions}
              onChange = {changeHandler}
            />
             <Select 
              name = "House condition"
              options = {listingConditionOptions}
              onChange = {changeHandler}
            />
            <div>
              <label>youtube video url</label>
              <input type="text" name = "url" onChange={changeHandler}/>
            </div>
            {
              choice === "house" &&
              <div className="facilities">
                  asda
              </div>
            }

            <button onClick={clickHandler}>confirm additional details</button>
        </div>
    )
}
