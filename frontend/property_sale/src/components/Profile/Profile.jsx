import React from 'react'
import Personal from './Personal/Personal'
import Kyc from './Kyc/Kyc';
import './Profile.css';

export default function Profile() {
  return (
    <div className="profile-container">
        <Personal />
        <Kyc />
    </div>
  )
}
