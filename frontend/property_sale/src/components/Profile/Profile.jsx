import React,{useState} from 'react'
import Kyc from './Kyc/Kyc';
import Personal from './Personal/Personal';
import { Nav } from '..';
import { useWindowSize } from '../../Hooks';
import './Profile.css';
import { useEffect } from 'react';

export default function Profile() {
    
    const [kyc,setKyc] = useState(0);
    const size = useWindowSize();

    function setKycHandler(setTo){
        setKyc(setTo);
    }

    useEffect(() => {
        return () => {
            setKyc(0);
        }
    },[])


    return (
        <React.Fragment>
            <Nav />
                <div className="profile-container wrapper">
                    {   
                        size.width < 800 && kyc === 1 && <Kyc />
                    }
                    {
                        size.width < 800 && kyc === 0 && <Personal setKycHandler={setKycHandler} />
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
