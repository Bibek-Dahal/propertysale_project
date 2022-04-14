import React,{useState} from 'react'
import Drop from './Drop';
import Input from '../Input/Input';

export default function Media({formDispatch}) {
  const [data,setData] = useState({
    
  })


  const onConfirmImages = (images,name) => {
    // console.log('confirmen images')
    // console.log(images,name)
    setData(prev => {
      return{
        ...prev,
        [name]:images
      }
    })
  }

  const clickHandler = (e) => {
    e.preventDefault();

    console.log('inside form submission of media');
    console.log(data)
    formDispatch({type : "set",data:data})
  }


  return (
        <div>
          
          <Input 
            label = "Main Image"
          >
            <Drop 
              height = "100px"
              name = "main_image"
              multiple = {false}
              placeholder = "Drop files or click to upload"
              onConfirmImages = {onConfirmImages}
            />
          </Input>
          <Input 
            label = "Property images"
          >
            <Drop
               height = "100px"
              name = "otherImages"
              multiple = {true}
              placeholder="Drop files or Click to upload"
              onConfirmImages = {onConfirmImages}
          />
          </Input>

          <Input 
            label = "Certificate images"
          >
            <Drop
               height = "100px"
              name = "certificate_image"
              multiple = {true}
              placeholder="Drop files or Click to upload"
              onConfirmImages = {onConfirmImages}
          />
          </Input>
          <button className = "confirm" onClick = {clickHandler}>confirm</button>
        </div>
  )
}
