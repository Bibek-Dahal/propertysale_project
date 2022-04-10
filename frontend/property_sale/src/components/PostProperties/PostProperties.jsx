import React, {useState,useContext} from 'react'
import { 
  AdditionalDetails,
  Address ,
  AreaAndRoad,
  BasicDetails ,
  Media ,
  Price 
} from './index';

import './PostProperties.css';
import Section  from './Section/Section';
import formInfo from './formInfo.json';
import { PpContext } from '../../context/PpContext';
import { usePopup } from '../../Hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'

export default function PostProperties() {
  const [choice , setChoice] = useState("");
  const [formData,setFormData] = useState({
    title: "",
    description : "",
  })
  const {showPopup} = usePopup();
  const {formState,formDispatch} = useContext(PpContext)

  const ChoiceHandler = (e) => {
    setChoice(e.target.dataset.value);
  }

  const getForm = (name) => {
    switch(name){
      case "Basic Details":
        return <BasicDetails formDispatch = {formDispatch}  />
      
      case "Address":
        return <Address  formDispatch = {formDispatch} />
     
      case "Area and Road":
        return <AreaAndRoad formDispatch = {formDispatch} />
      
      case "Additional Details":
        return <AdditionalDetails  formDispatch = {formDispatch} choice = {choice}/>
      
      case "Media":
        return <Media formDispatch = {formDispatch}/>
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target)
    console.log('submitted');
    console.log(formState)
    // for(let item in formState){
    //   if(formState[item] === ''){
    //     console.log(`${item} field is empty`)
    //     showPopup(`${item} field is empty`,'errors')
    //   }
    // }
  }

  function getIcon(icon){
    // console.log(icon)
    // return <FontAwesomeIcon icon = {solid(i)} />
  }

  return (
    <div className='post-properties'>
      {
        choice === "" &&
            <div className="title">
                What property do you want to post?
            </div>
      }
      {
        choice === "" &&
            <div className="choices">
                <button className="btn land-btn" data-value = "land" onClick = {ChoiceHandler}>
                  Land
                </button>
                <button className="btn house-btn" data-value = "house" onClick = {ChoiceHandler}>
                  House
                </button>
            </div>
      }

      {/* basic details */}
      {/* address */}
      {/* area and road */}
      {/* additional details */}
      {/* media */}
      {/* price */}
      {
        choice && 
            <form onSubmit = {submitHandler} id = "propertyForm">
              <div className="title">
                <div className="go-back" onClick = {() => setChoice("")}>
                  <FontAwesomeIcon icon = {solid('arrow-left')} />
                </div>
                <p>{choice}</p>
              </div>
              <div className="sections">
                {
                  formInfo.sections.map(section => {
                    console.log(section.icon)
                      return (
                        <Section  
                          className = "section" 
                          key = {section.name} 
                          i = {section.icon}
                          title = {section.name}>
                          {getForm(section.name)}
                        </Section>
                      )
                  })
                }
              </div>
              <input type="submit" />
            </form>
      }

    </div>
    
  )
}
