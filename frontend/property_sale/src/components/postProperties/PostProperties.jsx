import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axiosLinks from '../../axiosLinks';
import axiosInstance from '../utils/axiosInstance';
import './PostProperties.css';
import NotVerified from './NotVerified';

export default function PostProperties() {

  const [keys,setKeys] = useState({})
  const [isVerified,setIsVerfied] = useState(0);


  useEffect(() => {
    (
      async function(){
        try{
          const res = await axiosInstance.get(axiosLinks.retriveKyc);
          console.log(res);
          if(res.data.status.toLowerCase() === "verified") setIsVerfied(1);
        }catch(err){
          console.log(err)
        }
      }
    )()
  },[])

  return (
         isVerified ? 
            <div className="post-properties">
              <Link className = "link-btn" to = "post-land">Post Land</Link>
              <Link className = "link-btn" to = "post-house">Post House</Link>
            </div> : 
            <NotVerified />

  )
}
