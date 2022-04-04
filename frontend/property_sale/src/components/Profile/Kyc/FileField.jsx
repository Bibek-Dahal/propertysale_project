import React from 'react'
import DropZone from '../DropZone'
import getImage from '../../../impLinks'

export default function FileField({label,name,className,kycData,newkycData,setnewKycData}) {

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
            {
                console.log(kycData)
            }
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
            <div className={`new ${kycData[name] ? "" : "full_width"}`}>
                {
                    !newkycData[name]  ?
                        <DropZone name = {name} onDropHandler={onDropHandler}/>:
                        <div data-name = {name} className="img" onClick = {removeImageHandler}>
                            <img src={newkycData[name]} alt="" />
                        </div>
                }
            </div>
            </div>
    )
}
