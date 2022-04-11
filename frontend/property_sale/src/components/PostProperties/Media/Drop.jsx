import React, { useState } from 'react'
import './Drop.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import {usePopup} from '../../../Hooks/index';

export default function Drop({name,placeholder,multiple,height,onConfirmImages}) {
  
  // const [images,setImages] = useState([]);
  const [preview,setPreview] = useState([])

  const {showPopup} = usePopup();


  const onDragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add('active');
    console.log('drag enter')
  }
  const onDragOver = (e) => {
    e.preventDefault();
    console.log('drag over')
  }
  const onDragLeave = (e) => {
    e.preventDefault();
    console.log('drag leave')
    e.target.classList.remove('active');
  }


  const showImage = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', (e) => {
        setPreview(prev => {
          return[
            ...prev,
            reader.result
          ]
        })
    });
  }

  const handleImage = (files) => {
    let validImages = [...files].filter((file) =>
        ['image/jpeg', 'image/png'].includes(file.type)
    );

    validImages.forEach(showImage);

    // uploadImages(validImages);
  }

  function decodeURI(dataURI) {
      let binary = atob(dataURI.split(',')[1]);
      const mimeType = dataURI.split(',')[0].split(":")[1].split(";")[0];

      let array = [];
      for(let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: mimeType});
  }

  const onDrop = (e) => {
    e.preventDefault();
    console.log('droped')
    const files = e.dataTransfer.files;
    if(!multiple){
      if(files.length > 1 || preview.length === 1){
        console.log('multiple images tried')
        showPopup('multiples images cannot be uploaded in this field','errors')
        return;
      }
    }
    handleImage(files);
  }

  const removeImageHandler  = (e) => {
    console.log(e.target.dataset.imgurl)
    setPreview(prev => {
      return prev.filter(img => img != e.target.dataset.imgurl)
    })
  }

  const confirmImages = (e) => {
    console.log('inside confirm image')
    e.preventDefault();
    // setImages(prev => [])
    let images = []
    preview.forEach(uri => {
      // setImages(prev =>{
      //   return [
      //     ...prev,
      //     decodeURI(uri)
      //   ]
      // })
      images.push(decodeURI(uri))
    })
    onConfirmImages(images,name)
  }

  return (
    <div className = "media-dropzone-container">
         <label htmlFor={`dropInput${name}`}>
            <div className="drop-zone"
                style = {{height : `${height}`}}
                onDragEnter = {onDragEnter}
                onDragOver = {onDragOver}
                onDragLeave = {onDragLeave}
                onDrop = {onDrop}
              >
                <div className="placeholder">
                  <FontAwesomeIcon icon = {solid('cloud-arrow-up')}/>
                  <p>{placeholder}</p>
                </div>
              </div>
         </label>
          <input type="file" id = {`dropInput${name}`} multiple = {multiple}/>
        <div className="media-container" 
          
        >
          {
            preview ?
              preview.map(img => {
                return(
                  <div className="img">
                    <img src={img} alt="" />
                    <div className="utilities">
                      <span className="remove" data-imgurl = {img} onClick = {removeImageHandler}>
                        <FontAwesomeIcon icon = {solid('trash')} />
                      </span>
                    </div>
                  </div>
                )
              }):
              null
          }
          
         
        <button onClick={confirmImages} className = "confirmDataBtn">confirm</button>
        </div>
    </div>
  )
}
