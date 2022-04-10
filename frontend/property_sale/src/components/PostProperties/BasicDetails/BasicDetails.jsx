import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './BasicDetails.css';
import { useState } from 'react';
import Input from '../Input/Input';


export default function BasicDetails({formDispatch}) {

  const [data,setData] = useState({
    title : '',
    description : ''
  })

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
    console.log('data to be kept in state',data)
    formDispatch({type : "set",data : data})
  }

  return (
    <div className = "form">
        <Input 
          label = "title"
        >
          <input type="text" name = "title"  onChange={onTextChangeHandler}/>
        </Input>

        <Input 
        label = "description"
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
        <button onClick = {confirmHandler}>confirm details</button>
    </div>
  )
}
