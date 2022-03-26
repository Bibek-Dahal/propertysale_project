import React,{useState} from 'react'
import Kyc from './Kyc/Kyc';
import Personal from './Personal/Personal';
import { Nav } from '..';
import { useWindowSize } from '../../Hooks';
import './Profile.css';
import { useEffect } from 'react';
import { FullScreenLoading } from '../shared';

export default function Profile() {
    const [kyc,setKyc] = useState(0);
    const size = useWindowSize();

    function setKycHandler(setTo){
        setKyc(setTo);
    }

    return (
        <React.Fragment>
                <Nav />
                <div className="profile-container wrapper">
                    {   
                        size.width < 800 && kyc === 1 && <Kyc />
                    }
                    {
                        size.width < 800 && kyc === 0 && <Personal setKycHandler={setKycHandler} setIsLoading = {setIsLoading}/>
                    }  
                    {
                        size.width > 800 && <Personal kyc = {kyc}/>
                    }  
                    {   
                        size.width > 800 && <Kyc />
                    }
                </div>
        </React.Fragment>
    )
}
