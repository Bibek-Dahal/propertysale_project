import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Icon from '../Icons/Icon';
import './SocialAuth.css';

export default function SocialAuth() {
  return(
      <div className='socialAuthContainer'>
          <p className="continue-with">
              or continue with
          </p>
          <div className="auth-icons">
                <a href="">
                    <FontAwesomeIcon icon = {["fab","facebook"]} />
                </a>
                <a href="">
                    <Icon icon="google" height = "23"/>
                </a>
          </div>
      </div>
  );
}
