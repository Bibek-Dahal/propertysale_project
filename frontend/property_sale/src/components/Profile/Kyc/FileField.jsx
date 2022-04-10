import React from 'react'
import DropZone from '../DropZone'
import getImage from '../../../impLinks'
import './FileField.css';

export default function FileField({label,name,className,kycData,newkycData,setnewKycData}) {

    const onChangeHandler = (e) => {
        console.log(e);
        const reader = new FileReader();
        reader.onloadend = () => {
            setnewKycData(prev => {
            return{
                ...prev,
                [name] : reader.result
            }
            })
        }
        reader.readAsDataURL(e.target.files[0]);
        console.log(newkycData)
    }

    const onDropHandler = (e) => {
        console.log(e.dataTransfer.files[0]);
        console.log(name)
        const reader = new FileReader();
        reader.onloadend = () => {
            setnewKycData(prev => {
            return{
                ...prev,
                [name] : reader.result
            }
            })
        }
        reader.readAsDataURL(e.dataTransfer.files[0]);
        console.log(newkycData)
    }

    const removeImageHandler = (e) => {
        console.log('removing',e.target.dataset.name)
        setnewKycData(prev => {
          return{
            ...prev,
            [e.target.dataset.name] : ""
          }
        })
      }
    
    return (
        <div className={className}>
            <label>{label}</label>
                {kycData[name] && 
                    <div className="old">
                        <div className="profileImage">
                            <div className="image">
                            <a target = '_blank' href={`${getImage}${kycData[name]}`}>
                                <img src = {`${getImage}${kycData[name]}`} />
                            </a>
                            </div>
                        </div>
                    </div>
                }
           <label htmlFor={`upload${name}`}>
                <div className={`new ${kycData[name] ? "" : "full_width"}`}>
                    {
                        !newkycData[name]  ?
                            <DropZone name = {name} placeholder = "Drop or click to upload" onDropHandler={onDropHandler}/>:
                            <div data-name = {name} className="img" onClick = {removeImageHandler}>
                                <img src={newkycData[name]} alt="" />
                            </div>
                    }
                </div>
           </label>
           <input id = {`upload${name}`} type="file" name = {name} onChange = {onChangeHandler} style = {{display:"none"}}/>
            </div>
    )
}
