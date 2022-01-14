import React from 'react';
import './Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import Login from './Login/Login.jsx'
import Register from './Register/Register.jsx';
import SocialAuth from './SocialAuth/SocialAuth.jsx';

const Form = () => {
    return (
        <div className="form-wrapper">
            <div className="form-container">
                <Routes>
                    <Route path="signin/" element={<Login />} />
                    <Route path="signup/" element={<Register />} />
                </Routes>
                {/* look about this later */}
                <SocialAuth />
            </div>
        </div>
    )
}

export default Form;