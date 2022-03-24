import React from 'react'
import Input from '../Input/Input'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Kyc() {
  return (
    <div className="kyc-conatiner">
      <h1>KYC</h1>
      <div className="profile-image profile-image-changable">
        <img src="" alt="" />
        <div className="change-camera-svg">
          <FontAwesomeIcon icon = {solid('camera')} />
        </div>
      </div>
      <Input 
        type = "text"
        label = "Citizenship number"
        name = "citizenship_number"
      />
      <input type="submit" 
        value = "Update Kyc"
      />
    </div>
  )
}
