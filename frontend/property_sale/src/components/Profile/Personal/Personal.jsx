import React,{useState} from 'react'
import { useWindowSize } from '../../../Hooks';
import Input from '../Input/Input';
import './Personal.css';

export default function Personal({setKycHandler}) {
    const [formData,setFormData] = useState({
        first_name : '',
        last_name : '',
        dob : '',
        gender : ''
    })

    const size = useWindowSize();

    function onClickHandler(){
        setKycHandler(1);
    }

    function formHandler(e){
        e.preventDefault();
        console.log('submitted',formData);

    }
    
    function fieldHandler(e){
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

  return (
    <form className = "personal_details" onSubmit = {formHandler}>
        <h1>Personal details</h1>
        <div className="profile-image">
            <img src="" alt="" />
        </div>
        <Input 
            name = "first_name"
            label = "First name"
            type = "text"
            fieldHandler = {fieldHandler}
        />
        <Input 
            name = "last_name"
            label = "Last name"
            type = "text"
        />
        <Input 
            name = "dob"
            label = "Date of Birth"
            type = "date"
        />
        <Input 
            name = "gender"
            label = "Gender"
            type = "select"
        >
            <option value = "male">Male</option>
            <option value = "female">female</option>
            <option value = "other">Other</option>
        </Input>
        <button type="submit" >
            Update details
        </button>
       {
           size.width < 800 &&
            <span className="kyc small-links">
                Haven't updated kyc? <span className="link" onClick = {onClickHandler}>
                    Update kyc
                </span>
            </span>
        }
    </form>
  )
}
