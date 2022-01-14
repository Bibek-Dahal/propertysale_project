import React from 'react';
import './SocialAuth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialAuth = () => {
    return (
        <div className="social-auth-container">
            {/* <a href="" className="github">
                <FontAwesomeIcon icon={['fab', 'github']} />
                github
            </a> */}
            <a href="" className="google">
                <FontAwesomeIcon icon={['fab', 'google']} />

            </a>
            <a href="" className="fb">
                <FontAwesomeIcon icon={['fab', 'facebook']} />
            </a>
        </div>
    )
}

export default SocialAuth;