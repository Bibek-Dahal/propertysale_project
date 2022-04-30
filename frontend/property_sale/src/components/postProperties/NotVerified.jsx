import React from 'react'
import Sad from './sad'
import './NotVerified.css';
import { Link } from 'react-router-dom';

export default function NotVerified() {
  return (
    <div className = "NotVerified">
        <div className="illustration">
            <Sad />
        </div>
       <div className='text'>
        <h3>
                Sorry, kyc not verified yet
            </h3>
            <p>
                You cannot post properties till your kyc is verified from our side. Please wait for some time.
            </p>
       </div>
        {/* <Link to = "/user/profile">
            <button>verify now</button>
        </Link> */}
    </div>
  )
}
