import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './BasicDetails.css';
import { useState } from 'react';
import Input from '../Input/Input';
import axios from 'axios';
import {useAuth} from '../../../Hooks/index';
import axiosInstance from '../../utils/axiosInstance';


export default function BasicDetails({formDispatch,postUrl}) {
  
  const [data,setData] = useState({
    title : '',
    description : ''
  })

  const [error,setError] = useState({})

  const {state} = useAuth();

  const onDescriptionChangeHandler = (event,editor) => {
    const data = editor.getData();
    setData(prev => {
      return{
        ...prev,
        description : data
      }
    })
  }

  const onTextChangeHandler = (e) => {
    setData(prev => {
      return{
        ...prev,
        title : e.target.value
      }
    })
  }

  const confirmHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();

    for(let d in data){
      formData.append([d] , data[d]);
    }
    
    (
      async function(){
        try{
          // const res = await axios.post('http://127.0.0.1:8000/api/property/post-land/',formData,{
          //   headers : {
          //     'Content-Type' : 'multipart/form-data',
          //     'Authorization' : `Bearer ${state.access_token}` 
          //   }
          // })
          const res = await axiosInstance.post(postUrl,formData)
          console.log(res)
        }catch(err){
          console.log(err.response.data)
          // console.log(Object.keys(err.response.data).includes('title'))

          for(let i in data){
            if(Object.keys(err.response.data).includes(i)){
              setError(prev => {
                return {
                  ...prev,
                  [i] : err.response.data[i]
                }
              })
            }
          }
        }
        console.log('data to be kept in state',data)
        formDispatch({type : "set",data : data})
      }
    )()

    
  }

  return (
    <div className = "form">
        <Input 
          label = "title"
          error = {error.title}
        >
          <input type="text" name = "title"  onChange={onTextChangeHandler}/>
        </Input>

        <Input 
        label = "description"
        // error = {error.description}
        required
        >
          <div className="editor" id = "editor">
            <CKEditor 
                editor={ ClassicEditor }
                // onReady={ editor => {
                //     // You can store the "editor" and use when it is needed.
                //     console.log( 'Editor is ready to use!', editor );
                // } }
                onChange={onDescriptionChangeHandler}
                // onBlur={ ( event, editor ) => {
                //     console.log( 'Blur.', editor );
                // } }
                // onFocus={ ( event, editor ) => {
                //     console.log( 'Focus.', editor );
                // } }
            />
          </div>
        </Input>
        <button  className = "confirm" onClick = {confirmHandler}>confirm details</button>
    </div>
  )
}
