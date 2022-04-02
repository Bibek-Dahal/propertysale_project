import React from 'react'
import './Kyc.css';

export default function Kyc() {
  return (
    <div className="kyc">
      <h1>KYC</h1>
      <form>
        <label>Profile image</label>
        <input type="file" name = "profile_image" />
        <label>Citizenship front</label>
        <input type="file" name = "citizenship_front" />
        <label>citizenship back</label>
        <input type="file" name = "citizenship_back" />
      </form>
    </div>
  )
}
