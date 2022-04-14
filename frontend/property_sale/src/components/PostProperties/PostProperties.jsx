import React, {useState,useEffect,useContext} from 'react'
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
import { useAuth, usePopup } from '../../Hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import axios from 'axios';
import axiosLinks, { baseURL } from '../../axiosLinks';

export default function PostProperties() {
  const [choice , setChoice] = useState("");
  const [isRent,setIsRent] = useState(0);

  const [keys,setKeys] = useState({});

  const {showPopup} = usePopup();
  const {formState,formDispatch} = useContext(PpContext)
  const {state} = useAuth();

  const ChoiceHandler = (e) => {
    setChoice(e.target.dataset.value);
  }

  const getForm = (name) => {
    switch(name){
      case "Basic Details":
        return <BasicDetails formDispatch = {formDispatch}   keys = {keys} postUrl = {`${axiosLinks.post}${choice}/`} />
      
      case "Address":
        return <Address  formDispatch = {formDispatch} keys = {keys}  postUrl = {`${axiosLinks.post}${choice}/`} />
     
      case "Area and Road":
        return <AreaAndRoad formDispatch = {formDispatch}  keys = {keys} postUrl = {`${axiosLinks.post}${choice}/`} />
      
      case "Additional Details":
        return <AdditionalDetails  formDispatch = {formDispatch} setIsRent = {setIsRent} postUrl = {`${axiosLinks.post}${choice}/`} keys = {keys} choice = {choice}/>
      
      case "Media":
        return <Media formDispatch = {formDispatch}  postUrl = {`${axiosLinks.post}${choice}/`} />
       
      case "Price":
        return <Price formDispatch = {formDispatch} postUrl = {`${axiosLinks.post}${choice}/`} isRent = {isRent} />
      }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(e.target)
    // console.log('submitted');
    // console.log(formState)
    // for(let item in formState){
    //   if(formState[item] === ''){
    //     console.log(`${item} field is empty`)
    //     showPopup(`${item} field is empty`,'errors')
    //   }
    // }
    // console.log(formState)

    const temp = {...formState};
    console.log(temp)
    const certificate_image = temp["certificate_image"]
    const otherImages = temp["otherImages"];

    delete temp[certificate_image]
    delete temp[otherImages]

    let formData = new FormData();

    for(let d in temp){
      formData.append(d,temp[d]);
    }

    certificate_image.forEach(img => {
      formData.append("certificate_image",img);
    })
    
    otherImages.forEach(img => {
      formData.append(`additional_${choice}_image`,img);
    })
    formData.append('seller',state.user.user_id);
    formData.append('status','inactive');
    

    async function submit(){
      try{
        const res = await axios.post(`${axiosLinks.post}${choice}/`,formData,{
          headers : {
            Authorization : `Bearer ${state.access_token}`
          }
        });
        console.log(res);
      }catch(err){
        console.log(err);
      }
    }


    submit();
    
  }

  function getIcon(icon){
    // console.log(icon)
    // return <FontAwesomeIcon icon = {solid(i)} />
  }

  useEffect(() => {
    (
      async function(){
        try{
          const res = await axios.get(axiosLinks.foreignKeys,{
            headers : {
              Authorization : `Bearer ${state.access_token}`
            }
          })
          console.log(res)
          setKeys(prev => {
            return res.data
          })
        }catch(err){
          console.log(err)
        }
      }
    )()
  },[])

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
                    // console.log(section.icon)
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
